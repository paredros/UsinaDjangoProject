# Generated by Django 5.1.7 on 2025-04-01 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0023_persona'),
    ]

    operations = [
        migrations.AddField(
            model_name='direcciones',
            name='geolink',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
