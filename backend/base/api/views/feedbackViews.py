from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers import (FeedbackSerializer)
from base.models import Post, Comment
from rest_framework import status


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
