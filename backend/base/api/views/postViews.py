from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import filters

from ..serializers import (PostSerializer)
from base.models import Post
from rest_framework import status
import random
from random import shuffle
from django.utils import timezone
from datetime import timedelta



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
        print(request.data)
        serializer = PostSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            if 'image' in request.data:
                serializer.save(
                    image=request.data.get('image')
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DateFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):

        date = request.query_params.get('date', None)

        if date == "all":
            return queryset

        if date == "year":
            one_year_ago = timezone.now() - timedelta(days=365)
            queryset = queryset.filter(date_created__gte=one_year_ago)

            return queryset

        if date == "month":
            one_month_ago = timezone.now() - timedelta(days=30)
            queryset = queryset.filter(date_created__gte=one_month_ago)

            return queryset
        
        if date == "week":
            one_week_ago = timezone.now() - timedelta(days=7)
            queryset = queryset.filter(date_created__gte=one_week_ago)

            return queryset
        
        if date == "day":
            one_day_ago = timezone.now() - timedelta(days=1)
            queryset = queryset.filter(date_created__gte=one_day_ago)

            return queryset
        
        if date == "hour":
            one_hour_ago = timezone.now() - timedelta(hours=1)
            queryset = queryset.filter(date_created__gte=one_hour_ago)

            return queryset

        return queryset

class PostList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):

        seed = self.request.query_params.get('seed', None)

        random.seed(seed)
        queryset = Post.objects.order_by('?')
           
        limit = self.request.query_params.get('limit', None)
        start = self.request.query_params.get('start', None)

        if limit is not None:
            queryset = queryset[int(start):int(limit)]

        return queryset
     
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DateFilter]
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



