from django.shortcuts import render
from django.http import HttpResponse
import json

from website.models import Scrollytelling


# Create your views here.
def index(request):
    scrollytelling = Scrollytelling.objects.first()
    test = json.loads(scrollytelling.data)
    print(test["bloques"][0])
    print(test["preload"])

    return render(request, "index_es.html", {"testeo":"Que onda", "data":test})