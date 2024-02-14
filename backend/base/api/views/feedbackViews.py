from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers import (FeedbackSerializer)
from base.models import Post, Comment, Feedback
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
            if request.data['comment_id']:
                comment = Comment.objects.get(pk=request.data['comment_id'])
                comment.update_votes
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
def getFeedbackByUser(request, pk):
    post_id = request.query_params.get('post_id', None)
    comment_id = request.query_params.get('comment_id', None)

    if request.method == 'GET':
        if post_id:
            feedback = Feedback.objects.filter(user_id=pk, post_id=post_id).first()
            if feedback:
                serializer = FeedbackSerializer(feedback)
                return Response(serializer.data)
            return Response(False)

        elif comment_id:
            feedback = Feedback.objects.filter(user_id=pk, comment_id=comment_id).first()
            if feedback:
                serializer = FeedbackSerializer(feedback)
                return Response(serializer.data)
            return Response(False)
        else:
            feedbacks = Feedback.objects.all()
            serializer = FeedbackSerializer(feedbacks, many=True)
            return Response(serializer.data)
        

    if request.method == 'PUT':
        if post_id:
            feedback = Feedback.objects.get(user_id=pk, post_id=post_id)
            post = Post.objects.get(pk=post_id)
            serializer = FeedbackSerializer(
                instance=feedback, data=request.data)
            if serializer.is_valid():
                serializer.save()
                post.update_votes
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            feedback = Feedback.objects.get(user_id=pk, comment_id=comment_id)
            comment = Comment.objects.get(pk=comment_id)
            serializer = FeedbackSerializer(
                instance=feedback, data=request.data)
            if serializer.is_valid():
                serializer.save()
                comment.update_votes
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    if request.method == 'DELETE':
        if post_id:
            feedback = Feedback.objects.get(user_id=pk, post_id=post_id)
            post = Post.objects.get(pk=post_id)
            feedback.delete()
            post.update_votes
            return Response({'message': 'feedback deleted correctly'}, status=status.HTTP_200_OK)
        else:
            feedback = Feedback.objects.get(user_id=pk, comment_id=comment_id)
            comment = Comment.objects.get(pk=comment_id)
            feedback.delete()
            comment.update_votes
            return Response({'message': 'feedback deleted correctly'}, status=status.HTTP_200_OK)




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
