from website.models import Proyecto


def preprocess_general(tipo):
    data = {}
    if tipo == "proyectos-selected":
        data = preprocess_proyectos_selected()
    if tipo == "servicios-selected":
        data = preprocess_servicios_selected()
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