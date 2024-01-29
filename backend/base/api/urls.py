from django.urls import path
from . import views
from .views import MyTokenObtainPairView, PostList, CommunityList, getPostsByUserList, getPostsByCommunityList


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('communities/', CommunityList.as_view()),
    path('communities/<int:pk>/', views.getCommunity),
    path('communities/<int:pk>/posts/', getPostsByCommunityList.as_view()),
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>/', views.getPost),
    path('posts/<int:pk>/feedbacks/', views.getFeedbacks),
    path('posts/<int:pk>/feedbacks/<int:user_id>/', views.getFeedbackByUser),
    path('posts/feedback/', views.publishFeedback),
    path('posts/publish/', views.publishPost),
    path('comments/', views.getComments),
    path('users/', views.getUsers),
    path('users/<int:pk>/', views.getUser),
    path('users/<int:pk>/posts', getPostsByUserList.as_view()),
    path('users/register/', views.userRegister),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
