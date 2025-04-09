from django import template

register = template.Library()

@register.filter
def nombre_tag(tag, idioma):
    r = getattr(tag, f'name_{idioma}', tag.tag)
    if r is None:
        r = tag.tag
    return r

@register.filter
def proyecto_titulo(proyecto, idioma):
    r = getattr(proyecto, f'titulo_{idioma}', proyecto.titulo)
    if r is None:
        r = proyecto.titulo
    return r
    #return getattr(proyecto, f'titulo_{idioma}', proyecto.titulo)

@register.filter
def proyecto_slidetext(proyecto, idioma):
    r = getattr(proyecto, f'slide_text_{idioma}', proyecto.slide_text)
    if r is None:
        r = proyecto.slide_text
    return r

@register.filter
def proyecto_subtitulo(proyecto, idioma):
    r = getattr(proyecto, f'subtitulo_{idioma}', proyecto.subtitulo)
    if r is None:
        r = proyecto.subtitulo
    return r

@register.filter
def proyecto_copete(proyecto, idioma):
    r = getattr(proyecto, f'copete_{idioma}', proyecto.copete)
    if r is None:
        r = proyecto.copete
    return r

@register.filter
def proyecto_texto(proyecto, idioma):
    r = getattr(proyecto, f'texto_{idioma}', proyecto.texto)
    if r is None:
        r = proyecto.texto
    return r

@register.filter
def persona_resume(persona, idioma):
    r = getattr(persona, f'resume_{idioma}', persona.resume)
    if r is None or r is "":
        r = persona.resume
    return r

@register.filter
def nota_titulo(nota, idioma):
    r = getattr(nota, f'titulo_{idioma}', nota.titulo)
    if r is None or r is "":
        r = nota.titulo
    return r
    #return getattr(proyecto, f'titulo_{idioma}', proyecto.titulo)

@register.filter
def nota_slidetext(nota, idioma):
    r = getattr(nota, f'slide_text_{idioma}', nota.slide_text)
    if r is None or r is "":
        r = nota.slide_text
    return r

@register.filter
def nota_subtitulo(nota, idioma):
    r = getattr(nota, f'subtitulo_{idioma}', nota.subtitulo)
    if r is None:
        r = nota.subtitulo
    return r

@register.filter
def nota_copete(nota, idioma):
    r = getattr(nota, f'copete_{idioma}', nota.copete)
    if r is None or r is "":
        r = nota.copete
    return r

@register.filter
def nota_texto(nota, idioma):
    r = getattr(nota, f'texto_{idioma}', nota.texto)
    if r is None or r is "":
        r = nota.texto
    return r