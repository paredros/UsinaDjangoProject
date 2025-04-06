"""
URL configuration for DjangoProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from website import views
from django.conf import settings

import django

def custom_page_not_found(request):
    return django.views.defaults.page_not_found(request, None)

def custom_server_error(request):
    return django.views.defaults.server_error(request)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('proyectos/<slug:slug>', views.proyectos),
    path('servicios/<slug:slug>', views.servicios),
    path('soluciones/<slug:slug>', views.servicios),
    path('get_ajax_data/<slug:slug>', views.get_ajax_data),
    path('proyectos/', views.proyectos, name='proyectos'),
    path('servicios/', views.servicios, name='servicios'),
    path('soluciones/', views.servicios, name='soluciones'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('vivo/<slug:slug>', views.vivousina),
    path('vivo/', views.vivousina, name="vivo"),
    path('contactajx/', views.contactajx, name="contactajx"),
    path("404/", custom_page_not_found),
    path("500/", custom_server_error),

]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
