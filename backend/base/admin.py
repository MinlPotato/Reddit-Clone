from django.contrib import admin

# Register your models here.

from .models import (Community, Post, Comment, Feedback, Saved)
admin.site.register(Community)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Feedback)
admin.site.register(Saved)
