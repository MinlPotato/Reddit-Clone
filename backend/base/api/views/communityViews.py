from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import filters

from ..serializers import (CommunitySerializer, MemberSerializer)
from base.models import Community
from rest_framework import status


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


@api_view(['POST'])
def publishCommunity(request):
    serializer = CommunitySerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def getCommunityMembers(request, pk):
    community = Community.objects.get(pk=pk)

    if request.method == 'GET':
        members = community.member.all()
        serializer = MemberSerializer(members, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'DELETE'])
def getMember(request, pk, user_id):
    community = Community.objects.get(pk=pk)

    if request.method == 'GET':
        member = community.member.filter(user_id=user_id).first()
        if member == None:
            return Response(False)
        else:
            serializer = MemberSerializer(member)
            return Response(serializer.data)

    if request.method == 'DELETE':
        member = community.member.get(user_id=user_id)
        member.delete()
        return Response({'message': 'saved deleted correctly'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getCommunitiesJoinedByUser(request, pk):
    communities = Community.objects.filter(member__user_id=pk)
    serializer = CommunitySerializer(communities, many=True)

    return Response(serializer.data)