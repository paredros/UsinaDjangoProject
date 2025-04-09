from django.core.validators import validate_email
from django.db.models import F
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from website.models import Scrollytelling, Bloques, Tags, Proyecto, Direcciones, Alianza, Nota, Persona, MensajesDejados
from website.preprocess import preprocess_general, check_lenguaje, get_menuover, get_bloque

from django.core import serializers

from django.views.decorators.csrf import csrf_protect


# Create your views here.
def index(request):


    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)


    scrollytelling = Scrollytelling.objects.filter(ready=True, lenguaje=lenguaje).first()
    if scrollytelling is None:
        scrollytelling = Scrollytelling.objects.filter(ready=True, lenguaje="esp").first()
    test = json.loads(scrollytelling.data)
    for bloque in test["bloques"]:
        if "preprocess" in bloque:

            bloque["data"] = preprocess_general(bloque["preprocess"], lenguaje)

    #info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    info = get_menuover(lenguaje)

    test["menuover"] = json.loads(info.json)

    response = render(request, "index_es.html", {"data":test, 'idioma':lenguaje})
    response.set_cookie('lenguaje', lenguaje)
    request.session["lenguaje"] = lenguaje

    return response

def proyectos(request, slug=None):
    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)
    data = {}
    #info = Bloques.objects.all().filter(titulo="proyectoshome", lenguaje="esp").first()
    info = get_bloque("proyectoshome",lenguaje)
    data["base"] = json.loads(info.json)
    #tags = Tags.objects.all().order_by("tag")
    campo = f'name_{lenguaje}'
    if lenguaje == "esp":
        campo = "tag"
    tags = Tags.objects.filter(proyecto__es_servicio=False).distinct().annotate(name=F(campo)).order_by("tag")
    data["tags"] = tags
    proyectos = Proyecto.objects.filter(publicado=True, es_servicio=False).all()
    data["proyectos"] = proyectos

    #info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    info = get_menuover(lenguaje)

    data["menuover"] = json.loads(info.json)
    data["idioma"]=lenguaje

    return render(request, "proyectos.html", data)


def servicios(request, slug=None):
    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)
    data = {}
    #info = Bloques.objects.all().filter(titulo="servicioshome", lenguaje="esp").first()
    info = get_bloque("servicioshome", lenguaje)
    data["base"] = json.loads(info.json)
    #tags = Tags.objects.all().order_by("tag")
    campo = f'name_{lenguaje}'
    if lenguaje == "esp":
        campo = "tag"
    tags = Tags.objects.filter(proyecto__es_servicio=True).distinct().annotate(name=F(campo)).order_by("tag")
    data["tags"] = tags
    proyectos = Proyecto.objects.filter(publicado=True, es_servicio=True).all()
    data["proyectos"] = proyectos

    #info = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    info = get_menuover(lenguaje)

    data["menuover"] = json.loads(info.json)
    data["idioma"]=lenguaje

    return render(request, "proyectos.html", data)

def nosotros(request):
    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)

    data={}
    #menu = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    menu = get_menuover(lenguaje)
    #contact = Bloques.objects.all().filter(titulo="contactformdata", lenguaje="esp").first()
    contact = get_bloque("contactformdata", lenguaje)
    #nosotros = Bloques.objects.all().filter(titulo="nosotroshome", lenguaje="esp").first()
    nosotros = get_bloque("nosotroshome", lenguaje)
    personas = Persona.objects.all().filter(es_externo=False).order_by("orden_portada")

    data["personas"] = personas
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

    data["idioma"]=lenguaje

    return render(request, "nosotros.html", data)

def vivousina(request, slug=None):
    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)

    data = {}
    #menu = Bloques.objects.all().filter(titulo="menuover", lenguaje="esp").first()
    menu = get_menuover(lenguaje)
    #vivohome = Bloques.objects.all().filter(titulo="vivohome", lenguaje="esp").first()
    vivohome = get_bloque("vivohome", lenguaje)
    data["menuover"] = json.loads(menu.json)
    data["vivohome"] = json.loads(vivohome.json)
    if slug==None:
        notas = Nota.objects.all().filter(publicar=True)
        data["notas"] = notas
    else:
        if Nota.objects.all().filter(slug=slug).exists():
            nota = Nota.objects.get(slug=slug)
            data["nota"] = nota

    data["idioma"]=lenguaje

    return render(request, "vivousina.html", data)

def get_ajax_data(request, slug=None):
    idioma = request.LANGUAGE_CODE[:2]
    lenguaje = check_lenguaje(idioma)
    data = {}

    info = Proyecto.objects.filter(publicado=True, slug=slug).first()
    info.titulo = info.get_titulo(lenguaje)
    info.slide_text=info.get_slide(lenguaje)
    info.subtitulo=info.get_subtitulo(lenguaje)
    info.copete=info.get_copete(lenguaje)
    info.texto=info.get_texto(lenguaje)

    if not info:
        return JsonResponse({"status": "bad"})

    imagenes = info.proyectoimagenarchivo_set.all()
    info = serializers.serialize('json', [info])

    info = json.loads(info)

    img = []
    for imagen in imagenes:
        img.append(imagen.imagen.url)

    return JsonResponse({"data":info[0]["fields"], "imagenes":img, "status":"ok"})


def contactajx(request):
    if request.method == "POST":
        form = request.POST
        firstname = form.get("firstname")
        email = form.get("email")
        titulo = form.get("titulo")
        msg = form.get("msg")
        r={}
        r["message_type"] = "error"
        r["error_list"] = []
        e=True
        if(firstname is None or firstname==""):
            e=False
            r["error_list"].append("firstname")

        if(email is None or email==""):
            e=False
            r["error_list"].append("email")

        if (msg is None or msg == ""):
            e = False
            r["error_list"].append("msg")

        if e:
            record = MensajesDejados.objects.create(nombre=firstname, email=email, titulo=titulo, msg=msg)
            record.save()
            r["message_type"] = "success"

    return JsonResponse(r)

