from django.db import models


# Create your models here.

class Scrollytelling(models.Model):
    ready = models.BooleanField(default=False)
    name_key = models.CharField(max_length=10, default="")
    data = models.TextField(default="")

    def __str__(self):
        return self.name_key

class Proyecto(models.Model):
    titulo = models.CharField(max_length=120)
    slide_text = models.CharField(max_length=200)
    subtitulo = models.CharField(max_length=200)
    slug = models.CharField(max_length=120, unique=True)
    copete = models.TextField()
    texto = models.TextField()

