# Generated by Django 5.0.1 on 2024-01-20 23:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='comment_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.comment'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='post_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.post'),
        ),
    ]
