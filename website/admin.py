from django.contrib import admin
from django.contrib.auth.models import User

from .models import *

# Register your models here.
@admin.register(Scrollytelling)
class ScrollytellingAdmin(admin.ModelAdmin):
    list_display = ["name_key", "ready"]