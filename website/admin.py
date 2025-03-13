from django.contrib import admin
from django.contrib.auth.models import User

from .models import *

# Register your models here.
@admin.register(Scrollytelling)
class ScrollytellingAdmin(admin.ModelAdmin):
    list_display = ["name_key", "ready"]

class ProyectoImagenInline(admin.StackedInline):
    model = ProyectoImagenArchivo

@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ["titulo"]
    inlines = [ProyectoImagenInline]
    class Meta:
        model = Proyecto

@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    class Meta:
        model = Tags