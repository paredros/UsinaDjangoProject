from django.db import models
import uuid
import os

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    #print(instance.slug)
    #filename = "%s.%s" % (uuid.uuid4(), ext)
    filename = "%s.%s" % (instance.slug, ext)
    return os.path.join('images/proyectos', filename)

def get_file_path2(instance, filename):
    ext = filename.split('.')[-1]
    #print(instance.proyecto.slug)
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('images/proyectos/archivos/'+instance.proyecto.slug, filename)


# Create your models here.

class Scrollytelling(models.Model):
    ready = models.BooleanField(default=False)
    name_key = models.CharField(max_length=10, default="")
    data = models.TextField(default="")

    def __str__(self):
        return self.name_key

class Tags(models.Model):
    tag = models.CharField(max_length=120)

    def __str__(self):
        return self.tag

class Proyecto(models.Model):
    titulo = models.CharField(max_length=120)
    slide_text = models.CharField(max_length=200)
    subtitulo = models.CharField(max_length=200)
    slug = models.CharField(max_length=120, unique=True)
    copete = models.TextField()
    texto = models.TextField()
    imagen_principal = models.ImageField(upload_to=get_file_path)
    tags = models.ManyToManyField(Tags)
    anio = models.IntegerField(null=True, blank=True)
    fecha = models.DateField(null=True, blank=True)
    locacion = models.CharField(max_length=250, default="", null=True, blank=True)
    locacion_ampliada = models.CharField(max_length=250, default="", null=True, blank=True)
    entes = models.TextField(default="", null=True, blank=True)
    artistas = models.TextField(default="", null=True, blank=True)
    marcas = models.TextField(default="", null=True, blank=True)
    links = models.TextField(default="", null=True, blank=True)
    videos = models.TextField(default="", null=True, blank=True)
    es_servicio = models.BooleanField(default=False)
    publicado = models.BooleanField(default=False)
    orden_portada = models.IntegerField(default=-1)

    def __str__(self):
        return self.slug



class ProyectoImagenArchivo(models.Model):
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to=get_file_path2)

