from django.db import models


# Create your models here.

class Scrollytelling(models.Model):
    ready = models.BooleanField(default=False)
    name_key = models.CharField(max_length=10, default="")
    data = models.TextField(default="")

    def __str__(self):
        return self.name_key
