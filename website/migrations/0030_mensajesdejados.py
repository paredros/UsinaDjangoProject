# Generated by Django 5.1.7 on 2025-04-06 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0029_persona_es_externo'),
    ]

    operations = [
        migrations.CreateModel(
            name='MensajesDejados',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('titulo', models.CharField(blank=True, max_length=255, null=True)),
                ('msg', models.TextField()),
            ],
        ),
    ]
