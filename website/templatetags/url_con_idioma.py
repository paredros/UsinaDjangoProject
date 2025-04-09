from django import template
from django.urls import resolve
from django.urls import reverse
from django.utils.translation import override

register = template.Library()

@register.simple_tag(takes_context=True)
def cambiar_idioma_url(context, idioma):
    request = context['request']
    path = request.path
    resolver_match = resolve(path)

    # reconstruye la URL con el nuevo idioma
    with override(idioma):
        nueva_url = reverse(resolver_match.view_name, args=resolver_match.args, kwargs=resolver_match.kwargs)

    # conserva los query params
    if request.GET:
        querystring = request.META['QUERY_STRING']
        nueva_url = f'{nueva_url}?{querystring}'

    return nueva_url