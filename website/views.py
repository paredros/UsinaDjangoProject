from django.shortcuts import render
from django.http import HttpResponse
import json

from website.models import Scrollytelling, Bloques, Tags, Proyecto
from website.preprocess import preprocess_general


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
    print(slug)
    data = {}
    info = Bloques.objects.all().filter(titulo="proyectoshome", lenguaje="esp").first()
    data["base"] = json.loads(info.json)
    tags = Tags.objects.all().order_by("tag")
    data["tags"] = tags
    proyectos = Proyecto.objects.filter(publicado=True).all()
    data["proyectos"] = proyectos

    return render(request, "proyectos.html", data)