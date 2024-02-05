from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from ..serializers import (
    CommentSerializer, PostSerializer,
    CommunitySerializer, UserSerializer,
    RegisterSerializer, PublishPostSerializer,
    FeedbackSerializer, SaveSerializer)
from base.models import Community, Post, Comment, Feedback, Saved
from django.contrib.auth.models import User
from rest_framework import status
from django.db import models
from django.db.models import Count




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
