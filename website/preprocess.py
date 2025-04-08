from django.db.models import Count, F

from website.models import *
import json


def preprocess_general(tipo, lenguaje):

    data = {}
    if tipo == "proyectos-selected":
        data = preprocess_proyectos_selected(lenguaje)
    elif tipo == "servicios-selected":
        data = preprocess_servicios_selected()
    elif tipo == "endpage":
        data = preprocess_endpage()
    elif tipo == "landing":
        data = preprocess_landing(lenguaje)
    elif tipo == "contactformdata":
        data = preprocess_contactformdata()
    return data


def preprocess_landing(lenguaje):
    data = {}
    campo = f'name_{lenguaje}'
    if lenguaje == "esp":
        campo = "tag"

    tags = Tags.objects.all().exclude(tag="Proyecto").filter(proyecto__es_servicio=False).annotate(
        count=Count('proyecto__slug'), name=F(campo)).order_by('-count', 'tag')
    data["tags"] = tags
    return data


def preprocess_proyectos_selected(lenguaje):
    data = {}

    proyectos = Proyecto.objects.all().filter(publicado=True, orden_portada__gt=0, es_servicio=False).order_by("orden_portada")
    for proyecto in proyectos:
        for tag in proyecto.tags.all():
            tag.name = getattr(tag, f'name_{lenguaje}', tag.tag)

    data = proyectos
    return data

def preprocess_servicios_selected():
    data = {}
    servicios = Proyecto.objects.all().filter(publicado=True, orden_portada__gt=0, es_servicio=True).order_by("orden_portada")
    data = servicios
    return data

def preprocess_endpage():
    data = {}
    tags = Tags.objects.all().exclude(tag="Proyecto").filter(proyecto__es_servicio=False).annotate(count = Count('proyecto__slug')).order_by('-count','tag')
    data["tags"] = tags
    servicios = Proyecto.objects.all().filter(publicado=True, orden_portada__gt=0, es_servicio=True).order_by("orden_portada")
    data["servicios"] = servicios
    notas = Nota.objects.all().filter(orden_portada__gt=0,publicar=True).order_by("orden_portada")
    data["notas"] = notas
    return data

def preprocess_contactformdata():
    data = {}
    direcciones = Direcciones.objects.all().filter(publicado=True).order_by("pais")
    data["direcciones"] = direcciones
    info = Bloques.objects.all().filter(titulo="contactformdata").first()

    data["info"] = json.loads(info.json)

    return data

def check_lenguaje(leng):
    lenguaje="esp"
    if leng == "es":
        lenguaje = "esp"
    elif leng == "por":
        lenguaje = "por"
    elif leng == "esp":
        lenguaje = "esp"
    elif leng == "po":
        lenguaje = "por"
    elif leng == "eng":
        lenguaje = "eng"
    elif leng == "en":
        lenguaje = "eng"
    return lenguaje