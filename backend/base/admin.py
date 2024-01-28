from django.contrib import admin

# Register your models here.

from .models import (Community, Post, Comment, Feedback)
admin.site.register(Community)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Feedback)
