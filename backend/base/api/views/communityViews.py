from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import filters

from ..serializers import (CommunitySerializer)
from base.models import Community


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
