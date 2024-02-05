from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .serializers import (
    CommentSerializer, PostSerializer, 
    CommunitySerializer, UserSerializer, 
    RegisterSerializer, PublishPostSerializer, 
    FeedbackSerializer, SaveSerializer)
from base.models import Community, Post, Comment, Feedback, Saved
from django.contrib.auth.models import User
from rest_framework import status
from django.db import models
from django.db.models import Count

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/communities',
        '/api/posts',
        '/api/comments',
        '/api/users',
    ]
    return Response(routes)





class CommunityList(generics.ListAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['date_created']


@api_view(['GET'])
def getCommunity(request, pk):
    community = Community.objects.get(pk=pk)
    serializer = CommunitySerializer(community)
    return Response(serializer.data)









@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(pk=pk)
    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(['GET'])
def getPostByCommunity(request, pk):
    posts = Post.objects.filter(community_id=pk).order_by('-date_created')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


class getPostsByCommunityList(generics.ListAPIView):
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['date_created', 'votes']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(community_id=pk)


@api_view(['POST'])
def publishPost(request):
    if request.method == 'POST':
        serializer = PublishPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAllComments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCommentsInComment(request, pk):
    comments = Comment.objects.filter(parent_comment=pk)
    if comments == None:
        return Response(False)
    else:   
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)




class getCommentsByPostList(generics.ListAPIView):
    serializer_class = CommentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['date_created', 'votes']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Comment.objects.filter(post_id=pk, parent_comment__isnull=True)



@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class getPostsByUserList(generics.ListAPIView):
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['date_created', 'votes']
    search_fields = ['description']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(user_id=pk)


@api_view(['POST'])
def userRegister(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def publishFeedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data['post_id']:
                post = Post.objects.get(pk=request.data['post_id'])
                post.update_votes
            print(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getPostFeedbacks(request, pk):
    post = Post.objects.get(pk=pk)
    feedbacks = post.feedback.all()

    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCommentFeedbacks(request, pk):
    comment = Comment.objects.get(pk=pk)
    feedbacks = comment.feedback.all()

    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPostsLikedByUser(request, pk):
    posts = Post.objects.filter(feedback__user_id=pk, feedback__type='L')

    serializer = PostSerializer(posts,  many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPostsDislikedByUser(request, pk):
    posts = Post.objects.filter(feedback__user_id=pk, feedback__type='D')

    serializer = PostSerializer(posts,  many=True)
    return Response(serializer.data)



@api_view(['GET', 'PUT', 'DELETE'])
def getPostFeedbackByUser(request, pk, user_id):
    post = Post.objects.get(pk=pk)
        
    if request.method == 'GET':
        feedback = post.feedback.filter(user_id=user_id).first()
        if feedback == None:
            return Response(False)
        else:
            serializer = FeedbackSerializer(feedback)
            return Response(serializer.data)

    if request.method == 'PUT':
        feedback = post.feedback.get(user_id=user_id)
        serializer = FeedbackSerializer(instance=feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            post.update_votes
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        feedback = post.feedback.get(user_id=user_id)
        feedback.delete()
        post.update_votes
        return Response({'message': 'feedback deleted correctly'}, status=status.HTTP_200_OK)
    

@api_view(['GET', 'PUT', 'DELETE'])
def getCommentFeedbackByUser(request, pk, user_id):
    comment = Comment.objects.get(pk=pk)

    if request.method == 'GET':
        feedback = comment.feedback.filter(user_id=user_id).first()
        if feedback == None:
            return Response(False)
        else:
            serializer = FeedbackSerializer(feedback)
            return Response(serializer.data)

    if request.method == 'PUT':
        feedback = comment.feedback.get(user_id=user_id)
        serializer = FeedbackSerializer(instance=feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            comment.update_votes
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        feedback = comment.feedback.get(user_id=user_id)
        feedback.delete()
        comment.update_votes
        return Response({'message': 'feedback deleted correctly'}, status=status.HTTP_200_OK)


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'community_id__name', 'user_id__username']
    ordering_fields = ['date_created','votes']


@api_view(['GET'])
def getSavedPosts(request, pk):
    posts = Post.objects.filter(saved__user_id=pk)
    serializer = PostSerializer(data=posts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def SavedPost(request, pk, user_id):

    if request.method == 'GET':
        saved = Saved.objects.get(user_id=user_id, post_id=pk)
        if saved == None:
            return Response(False)
        else:
            post = Post.objects.get(pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)


    if request.method == 'DELETE':
        saved = Saved.objects.get(user_id=user_id, post_id=pk)
        saved.delete()
        return Response({'message': 'saved deleted correctly'}, status=status.HTTP_200_OK)

    
    if request.method == 'POST':
        serializer = SaveSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)