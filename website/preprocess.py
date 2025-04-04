from website.models import *
import json


def preprocess_general(tipo):

    data = {}
    if tipo == "proyectos-selected":
        data = preprocess_proyectos_selected()
    elif tipo == "servicios-selected":
        data = preprocess_servicios_selected()
    elif tipo == "endpage":
        data = preprocess_endpage()
    elif tipo == "contactformdata":
        data = preprocess_contactformdata()
    return data

def preprocess_proyectos_selected():
    data = {}
    proyectos = Proyecto.objects.all().filter(publicado=True, orden_portada__gt=0, es_servicio=False).order_by("orden_portada")
    data = proyectos
    return data

def preprocess_servicios_selected():
    data = {}
    servicios = Proyecto.objects.all().filter(publicado=True, orden_portada__gt=0, es_servicio=True).order_by("orden_portada")
    data = servicios
    return data

def preprocess_endpage():
    data = {}
    tags = Tags.objects.all().order_by("tag")
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
