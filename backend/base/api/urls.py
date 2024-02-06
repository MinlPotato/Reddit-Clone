from django.urls import path
from . import views
from .views import (
    MyTokenObtainPairView, PostList, 
    CommunityList, getPostsByUserList, 
    getPostsByCommunityList, getCommentsByPostList)


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('communities/', CommunityList.as_view()),
    path('communities/<int:pk>/', views.getCommunity),
    path('communities/<int:pk>/posts/', getPostsByCommunityList.as_view()),
    path('communities/<int:pk>/members/', views.getCommunityMembers),
    path('communities/<int:pk>/members/<int:user_id>/', views.getMember),
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>/', views.getPost),
    path('posts/<int:pk>/comments', getCommentsByPostList.as_view()),
    path('posts/<int:pk>/feedbacks/', views.getPostFeedbacks), 
    path('posts/<int:pk>/feedbacks/<int:user_id>/', views.getPostFeedbackByUser),
    path('posts/<int:pk>/saved/<int:user_id>/', views.SavedPost),
    path('posts/publish/', views.publishPost),
    path('comments/', views.getAllComments),
    path('comments/publish/', views.publishComment),
    path('comments/<int:pk>', views.getCommentsInComment),
    path('feedback/', views.publishFeedback),
    path('users/', views.getUsers),
    path('users/<int:pk>/', views.getUser),
    path('users/<int:pk>/posts', getPostsByUserList.as_view()),
    path('users/<int:pk>/liked', views.getPostsLikedByUser),
    path('users/<int:pk>/disliked', views.getPostsDislikedByUser),
    path('users/<int:pk>/member', views.getCommunitiesJoinedByUser),
    path('users/register/', views.userRegister),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
