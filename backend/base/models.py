from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class Community(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = ("Community")
        verbose_name_plural = ("Communities")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})
    

class Post(models.Model):
    title = models.CharField(max_length=70)
    description = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    votes = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)

    class Meta:
        get_latest_by = ['date_created']
   
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})
    
    @property
    def update_votes(self):
        likes = self.feedback.filter(type="L").count()
        dislikes = self.feedback.filter(type="D").count()

        self.likes = likes
        self.dislikes = dislikes
        self.votes = likes - dislikes
        self.save()
    
    @property
    def get_likes(self):
        return self.feedback.filter(type="L").count()
    
    @property
    def get_dislikes(self):
        return self.feedback.filter(type="D").count()
    
    @property
    def get_username(self):
        return self.user_id.username
    
    @property
    def get_community(self):
        return self.community_id.name


#class Image(models.Model):
#   image = models.ImageField(upload_to=)

class Comment(models.Model):
    description = models.TextField(max_length=255)
    date_created = models.DateTimeField(default=timezone.now)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE)

    def __str__(self):
        return self.comment
    


class Feedback(models.Model):
    FEEDBACK_OPTIONS = (
        ('L', 'Like'),
        ('D', 'Dislike'),
    )
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='feedback')
    type = models.CharField(max_length=1, choices=FEEDBACK_OPTIONS)
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, blank=True, null=True, related_name='feedback')
    comment_id = models.ForeignKey(
        Comment, on_delete=models.CASCADE, blank=True, null=True, related_name='feedback')
    
