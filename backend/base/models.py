from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import timedelta
# Create your models here.

class Community(models.Model):
    name = models.CharField(max_length=21)
    description = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = ("Community")
        verbose_name_plural = ("Communities")

    def __str__(self):
        return self.name
    
    @property
    def get_members(self):
        return self.member.count()
    
    @property
    def get_active_members(self):
        return self.member.filter(user_id__is_active = True).count()


    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})
    

class Post(models.Model):
    title = models.CharField(max_length=70)
    description = models.TextField(null=True, blank=True)
    link = models.URLField(null=True, blank=True, max_length=200)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    spoiler = models.BooleanField(default=False)
    nsfw = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=timezone.now)
    votes = models.IntegerField(default=0, blank=True, null=True)
    likes = models.IntegerField(default=0, blank=True, null=True)
    dislikes = models.IntegerField(default=0, blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='posts')

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
    def get_comments(self):
        return self.comments.filter(post_id=self.id).count()
    
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



class Comment(models.Model):
    description = models.TextField(max_length=1000)
    date_created = models.DateTimeField(default=timezone.now)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    parent_comment = models.ForeignKey(
        'self', on_delete=models.CASCADE, blank=True, null=True)
    votes = models.IntegerField(default=0, blank=True, null=True)
    likes = models.IntegerField(default=0, blank=True, null=True)
    dislikes = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return '%s - %s' % (self.post_id.title, self.id)
    
    @property
    def get_username(self):
        return self.user_id.username

    @property
    def update_votes(self):
        likes = self.feedback.filter(type="L").count()
        dislikes = self.feedback.filter(type="D").count()

        self.likes = likes
        self.dislikes = dislikes
        self.votes = likes - dislikes
        self.save()
 


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
    
    def __str__(self):
        return '%s - %s' % (self.user_id.username, self.type)


class Saved(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='saved')
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='saved')
    

    class Meta:
        verbose_name = ("Saved")
        verbose_name_plural = ("Saved")

    def __str__(self):
        return '%s - %s' % (self.post_id.title, self.user_id.username)


class CommunityMember(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='member')
    community_id = models.ForeignKey(
        Community, on_delete=models.CASCADE, related_name='member')
    favorited = models.BooleanField(default=False)

    def __str__(self):
        return '%s - %s' % (self.community_id.name, self.user_id.username)
