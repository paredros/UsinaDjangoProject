# Generated by Django 5.1.7 on 2025-03-09 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='scrollytelling',
            name='data',
            field=models.TextField(default=''),
        ),
    ]
