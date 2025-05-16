from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import (Community, Post, Comment, Feedback, Saved, CommunityMember)
from django.contrib.auth.models import User
from django.db.models import Count

class CommunitySerializer(ModelSerializer):

    members = SerializerMethodField('get_members')
    active_members = SerializerMethodField('get_active_members')

    def get_members(self, obj):
        return getattr(obj, 'get_members')
    
    def get_active_members(self, obj):
        return getattr(obj, 'get_active_members')

    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'date_created', 'members', 'active_members']


    def create(self, validated_data):
        community = Community(**validated_data)
        community.save()
        return community


class PostSerializer(ModelSerializer):

    username = SerializerMethodField('get_username')
    community_name = SerializerMethodField('get_community')
    comments = SerializerMethodField('get_comments')
   
    def get_username(self, obj):
        return getattr(obj, 'get_username')
    
    def get_community(self, obj):
        return getattr(obj, 'get_community')
    
    def get_comments(self, obj):
        return getattr(obj, 'get_comments')

    class Meta:
        model = Post
        fields = ['id', 'title', 'link', 'image', 'description', 'date_created', 'spoiler', 'nsfw',
                  'votes', 'user_id', 'community_id', 'likes', 'dislikes', 'username', 'community_name', 'comments']
        
    
    def create(self, validated_data):
        post = Post(**validated_data)
        post.save()
        return post
        

class CommentSerializer(ModelSerializer):

    username = SerializerMethodField('get_username')
    post_details = serializers.SerializerMethodField()

    def get_username(self, obj):
        return getattr(obj, 'get_username')

    def get_post_details(self, obj):
        return PostSerializer(obj.post_id).data


    class Meta:
        model = Comment
        fields = ['id', 'description', 'date_created', 'user_id', 'post_id', 'parent_comment', 
                  'votes', 'likes', 'dislikes', 'username', 'post_details']
        
    def create(self, validated_data):
        return Comment.objects.create(
            description=validated_data['description'],
            user_id=validated_data['user_id'],
            post_id=validated_data['post_id'],  # already a Post instance
            parent_comment=validated_data.get('parent_comment')
        )

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class FeedbackSerializer(ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
    
    def create(self, validated_data):
        feedback = Feedback(**validated_data)
        feedback.save()
        return feedback
    
    def update(self, instance, validated_data):
        instance.type = validated_data.get('type', instance.type)
        instance.save()
        return instance
    

class SaveSerializer(ModelSerializer):
    class Meta:
        model = Saved
        fields = '__all__'


    def create(self, validated_data):
        saved = Saved(**validated_data)
        saved.save()
        return saved
    

class MemberSerializer(ModelSerializer):
    class Meta:
        model = CommunityMember
        fields = '__all__'

    
    def create(self, validated_data):
        member = CommunityMember(**validated_data)
        member.save()
        return member
    
