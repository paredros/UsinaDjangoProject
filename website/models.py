
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
    TYPE_LIST = [('esp', 'ESPAÑOL'),
                 ('por', 'PORTUGUESE'),
                 ('eng', 'ENGLISH'),
                 ]
    lenguaje = models.CharField(max_length=30, choices=TYPE_LIST, default='esp')

    def __str__(self):
        return self.name_key

class Tags(models.Model):
    tag = models.CharField(max_length=120)
    name_por = models.CharField(max_length=120, null=True, blank=True)
    name_eng = models.CharField(max_length=120, null=True, blank=True)

    def get_name(self, idioma='esp'):
        return getattr(self, f'name_{idioma}', self.tag)

    def __str__(self):
        return self.tag

class Proyecto(models.Model):
    titulo = models.CharField(max_length=120)
    titulo_por = models.CharField(max_length=120,null=True, blank=True)
    titulo_eng = models.CharField(max_length=120,null=True, blank=True)
    slide_text = models.CharField(max_length=200)
    slide_text_por = models.CharField(max_length=200,null=True, blank=True)
    slide_text_eng = models.CharField(max_length=200,null=True, blank=True)
    subtitulo = models.CharField(max_length=200)
    subtitulo_por = models.CharField(max_length=200,null=True, blank=True)
    subtitulo_eng = models.CharField(max_length=200,null=True, blank=True)
    slug = models.CharField(max_length=120, unique=True)
    copete = models.TextField()
    copete_por = models.TextField(null=True, blank=True)
    copete_eng = models.TextField(null=True, blank=True)
    texto = models.TextField()
    texto_por = models.TextField(null=True, blank=True)
    texto_eng = models.TextField(null=True, blank=True)
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

    def get_titulo(self, idioma='esp'):
        r = getattr(self, f'titulo_{idioma}', self.titulo)
        if r is None:
            r = self.titulo
        return r

    def get_slide(self, idioma='esp'):
        r = getattr(self, f'slide_text_{idioma}', self.slide_text)
        if r is None:
            r = self.slide_text
        return r

    def get_subtitulo(self, idioma='esp'):
        r = getattr(self, f'subtitulo_{idioma}', self.subtitulo)
        if r is None:
            r = self.subtitulo
        return r

    def get_copete(self, idioma='esp'):
        r = getattr(self, f'copete_{idioma}', self.copete)
        if r is None or r is "":
            r = self.copete
        return r

    def get_texto(self, idioma='esp'):
        r = getattr(self, f'texto_{idioma}', self.texto)

        if r is None or r is "":
            r = self.texto

        return r

    def __str__(self):
        return self.slug


class ProyectoImagenArchivo(models.Model):
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to=get_file_path2)


class Nota(models.Model):
    titulo = models.CharField(max_length=255)
    titulo_por = models.CharField(max_length=255, null=True, blank=True)
    titulo_eng = models.CharField(max_length=255, null=True, blank=True)
    slug = models.CharField(max_length=120, unique=True)
    slide_text = models.CharField(max_length=255, null=True, blank=True)
    slide_text_por = models.CharField(max_length=255, null=True, blank=True)
    slide_text_eng = models.CharField(max_length=255, null=True, blank=True)
    subtitulo = models.CharField(max_length=255, null=True, blank=True)
    subtitulo_por = models.CharField(max_length=255, null=True, blank=True)
    subtitulo_eng = models.CharField(max_length=255, null=True, blank=True)
    copete = models.TextField(null=True, blank=True)
    copete_por = models.TextField(null=True, blank=True)
    copete_eng = models.TextField(null=True, blank=True)
    texto = models.TextField()
    texto_por = models.TextField(null=True, blank=True)
    texto_eng = models.TextField(null=True, blank=True)
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
    resume_por = models.TextField(default="",blank=True, null=True)
    resume_eng = models.TextField(default="",blank=True, null=True)

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