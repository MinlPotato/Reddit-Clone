from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import filters

from ..serializers import (PostSerializer,PublishPostSerializer)
from base.models import Post
from rest_framework import status


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


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description',
                     'community_id__name', 'user_id__username']
    ordering_fields = ['date_created', 'votes']


class getPostsByUserList(generics.ListAPIView):
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['date_created', 'votes']
    search_fields = ['description']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(user_id=pk)


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
