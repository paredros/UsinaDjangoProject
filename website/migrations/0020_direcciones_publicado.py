# Generated by Django 5.1.7 on 2025-03-19 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0019_bloques_direcciones'),
    ]

    operations = [
        migrations.AddField(
            model_name='direcciones',
            name='publicado',
            field=models.BooleanField(default=True),
        ),
    ]
