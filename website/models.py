
from django.db import models
import uuid
import os

from django.utils.timezone import now


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

def get_file_path_nota(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.slug, ext)
    return os.path.join('images/notas', filename)

def get_file_path_nota2(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('images/notas/archivos/'+instance.nota.slug, filename)

def get_file_path_persona(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('images/personas', filename)

def get_file_path_vivo(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.slug, ext)
    return os.path.join('images/vivousina', filename)




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
    ciudad = models.CharField(max_length=250, default="", null=True, blank=True)
    pais = models.CharField(max_length=250, default="", null=True, blank=True)
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


class Nota(models.Model):
    titulo = models.CharField(max_length=255)
    slug = models.CharField(max_length=120, unique=True)
    slide_text = models.CharField(max_length=255, null=True, blank=True)
    subtitulo = models.CharField(max_length=255, null=True, blank=True)
    copete = models.TextField(null=True, blank=True)
    texto = models.TextField()
    imagen_principal = models.ImageField(upload_to=get_file_path_nota)
    orden_portada = models.IntegerField(default=-1)
    fecha = models.DateField(null=True, blank=True, auto_now_add=True)
    publicar = models.BooleanField(default=True)
    source=models.CharField(max_length=255,null=True, blank=True, default='NOTA ORIGINAL')
    external_autor=models.CharField(max_length=255,null=True, blank=True, default='')

    def __str__(self):
        return self.slug + " - " + str(self.orden_portada)


class NotaImagenArchivo(models.Model):
    nota = models.ForeignKey(Nota, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to=get_file_path_nota2)




class Direcciones(models.Model):
    ciudad = models.CharField(max_length=120)
    pais = models.CharField(max_length=120)
    calle = models.CharField(max_length=250)
    correo = models.CharField(max_length=120)
    telefono = models.CharField(max_length=120)
    publicado = models.BooleanField(default=True)
    geolink=models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.ciudad

class Bloques(models.Model):
    titulo = models.CharField(max_length=120)
    json = models.TextField(default="")
    TYPE_LIST = [('esp', 'ESPAÑOL'),
                 ('por', 'PORTUGUESE'),
                 ('eng', 'ENGLISH'),
                 ]
    lenguaje = models.CharField(max_length=30, choices=TYPE_LIST, default='esp')
    def __str__(self):
        return self.titulo

class Alianza(models.Model):
    nombre = models.CharField(max_length=255)
    links = models.TextField(default="", blank=True, null=True)

    def __str__(self):
        return self.nombre

class Persona(models.Model):
    nombre = models.CharField(max_length=255)
    posicion = models.CharField(max_length=255)
    resume = models.TextField(default="",blank=True, null=True)
    foto = models.ImageField(upload_to=get_file_path_persona)
    orden_portada = models.IntegerField(default=-1)
    es_externo = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class NotaAutor(models.Model):
    nota = models.ForeignKey(Nota, on_delete=models.CASCADE)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)

class MensajesDejados(models.Model):
    nombre = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    titulo = models.CharField(max_length=255, null=True, blank=True)
    msg = models.TextField()

    def __str__(self):
        return self.nombre