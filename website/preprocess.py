from website.models import Proyecto


def preprocess_general(tipo):
    data = {}
    if tipo == "proyectos-selected":
        data = preprocess_proyectos_selected()
    return data

def preprocess_proyectos_selected():
    data = {}
    proyectos = Proyecto.objects.all().filter(orden_portada__gt=0)
    print(proyectos[0].tags.all())
    print(proyectos[1].tags.all())
    data = proyectos
    return data