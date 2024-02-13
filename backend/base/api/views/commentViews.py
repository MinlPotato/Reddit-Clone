from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import filters

from ..serializers import (CommentSerializer)
from base.models import Comment
from rest_framework import status

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


@api_view(['POST'])
def publishComment(request):
    
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getCommentsByUser(request, pk):
    comments = Comment.objects.filter(user_id=pk)

    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)
