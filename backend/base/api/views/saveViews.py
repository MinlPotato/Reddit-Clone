from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers import ( PostSerializer, SaveSerializer )
from base.models import Post, Saved
from rest_framework import status

@api_view(['GET', 'POST', 'DELETE'])
def SavedPost(request, pk, user_id):

    if request.method == 'GET':
        saved = Saved.objects.filter(user_id=user_id, post_id=pk).first()
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
        serializer = SaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getSavedByUser(request, pk):
    posts = Post.objects.filter(saved__user_id=pk)

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
