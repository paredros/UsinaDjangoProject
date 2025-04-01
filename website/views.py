from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from website.models import Scrollytelling, Bloques, Tags, Proyecto, Direcciones, Alianza
from website.preprocess import preprocess_general

from django.core import serializers


# Create your views here.
def index(request):
    scrollytelling = Scrollytelling.objects.first()
    test = json.loads(scrollytelling.data)
    for bloque in test["bloques"]:
        if "preprocess" in bloque:
            bloque["data"] = preprocess_general(bloque["preprocess"])

    info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()

    test["menuover"] = json.loads(info.json)

    print(test["bloques"][0])
    print(test["preload"])

    return render(request, "index_es.html", {"testeo":"Que onda", "data":test})

def proyectos(request, slug=None):
    data = {}
    info = Bloques.objects.all().filter(titulo="proyectoshome", lenguaje="esp").first()
    data["base"] = json.loads(info.json)
    #tags = Tags.objects.all().order_by("tag")
    tags = Tags.objects.filter(proyecto__es_servicio=False).distinct().order_by("tag")
    data["tags"] = tags
    proyectos = Proyecto.objects.filter(publicado=True, es_servicio=False).all()
    data["proyectos"] = proyectos

    info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()

    data["menuover"] = json.loads(info.json)

    return render(request, "proyectos.html", data)


def servicios(request, slug=None):
    data = {}
    info = Bloques.objects.all().filter(titulo="servicioshome", lenguaje="esp").first()
    data["base"] = json.loads(info.json)
    #tags = Tags.objects.all().order_by("tag")
    tags = Tags.objects.filter(proyecto__es_servicio=True).distinct().order_by("tag")
    data["tags"] = tags
    proyectos = Proyecto.objects.filter(publicado=True, es_servicio=True).all()
    data["proyectos"] = proyectos

    info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()

    data["menuover"] = json.loads(info.json)

    return render(request, "proyectos.html", data)

def nosotros(request):
    data={}
    menu = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    contact = Bloques.objects.all().filter(titulo="contactformdata", lenguaje="esp").first()
    nosotros = Bloques.objects.all().filter(titulo="nosotroshome", lenguaje="esp").first()

    data["menuover"] = json.loads(menu.json)
    data["nosotrosdata"] = json.loads(nosotros.json)
    data["contact"] = {}
    data["contact"]["data"]={}
    data["contact"]["data"]["info"]=json.loads(contact.json)
    direcciones = Direcciones.objects.all().filter(publicado=True).order_by("pais")
    data["contact"]["data"]["direcciones"] = direcciones

    alianzas = Alianza.objects.all()
    data["alianzas"] = []
    for alianza in alianzas:
        data["alianzas"].append({"titulo":alianza.nombre,"links":alianza.links.split(",")})


    return render(request, "nosotros.html", data)

def get_ajax_data(request, slug=None):
    data = {}

    info = Proyecto.objects.filter(publicado=True, slug=slug).first()

    if not info:
        return JsonResponse({"status": "bad"})

    imagenes = info.proyectoimagenarchivo_set.all()
    info = serializers.serialize('json', [info])

    info = json.loads(info)

    img = []
    for imagen in imagenes:
        img.append(imagen.imagen.url)

    return JsonResponse({"data":info[0]["fields"], "imagenes":img, "status":"ok"})