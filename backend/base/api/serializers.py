from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import (Community, Post, Comment, Feedback)
from django.contrib.auth.models import User
from django.db.models import Count

class CommunitySerializer(ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'


class PostSerializer(ModelSerializer):

    username = SerializerMethodField('get_username')
    community_name = SerializerMethodField('get_community')
   
    def get_username(self, obj):
        return getattr(obj, 'get_username')
    
    def get_community(self, obj):
        return getattr(obj, 'get_community')

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'date_created', 
                  'votes', 'user_id', 'community_id', 'likes', 'dislikes', 'username', 'community_name']
        


class PublishPostSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = ['title','description','user_id','community_id']

    def create(self, validated_data):
        post = Post(
            title=validated_data['title'],
            description=validated_data['description'],
            user_id=validated_data['user_id'],
            community_id=validated_data['community_id']
        )
        post.save()
        return post


class CommentSerializer(ModelSerializer):

    username = SerializerMethodField('get_username')

    def get_username(self, obj):
        return getattr(obj, 'get_username')

    class Meta:
        model = Comment
        fields = ['id', 'description', 'date_created', 'user_id', 'post_id', 'parent_comment', 
                  'votes', 'likes', 'dislikes', 'username']

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
    