from website.models import *


def preprocess_general(tipo):
    data = {}
    if tipo == "proyectos-selected":
        data = preprocess_proyectos_selected()
    elif tipo == "servicios-selected":
        data = preprocess_servicios_selected()
    elif tipo == "endpage":
        data = preprocess_endpage()
    return data

def preprocess_proyectos_selected():
    data = {}
    proyectos = Proyecto.objects.all().filter(orden_portada__gt=0, es_servicio=False).order_by("orden_portada")
    data = proyectos
    return data

def preprocess_servicios_selected():
    data = {}
    servicios = Proyecto.objects.all().filter(orden_portada__gt=0, es_servicio=True).order_by("orden_portada")
    data = servicios
    return data

def preprocess_endpage():
    data = {}
    tags = Tags.objects.all().order_by("tag")
    data["tags"] = tags
    servicios = Proyecto.objects.all().filter(orden_portada__gt=0, es_servicio=True).order_by("orden_portada")
    data["servicios"] = servicios
    notas = Nota.objects.all().filter(orden_portada__gt=0).order_by("orden_portada")
    data["notas"] = notas
    return data