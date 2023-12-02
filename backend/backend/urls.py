"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from . import views
#from rest_framework import routers

#router = routers.DefaultRouter()
#router.register(r"test", views.Test.as_view(), basename="Api")

#urlpatterns = router.urls

urlpatterns = [
    path('api/test', views.Test.as_view()),
    path('api/validateLogin/<str:cedula>/<str:passw>', views.ValidateLogin.as_view()),
    path("api/tipoUsuario/<str:cedula>",views.TipoUsuario.as_view()),
    path("api/informacionUsuario/<str:cedula>", views.CargarInfoUsuario.as_view()),
    path("api/cargarTablaAdmin/<str:cedula>/<str:mes>/<str:year>", views.CargarDatosTablaAdmin.as_view()),
    path("api/cargarSolicitudes/<str:cedula>",views.CargarSolicitudes.as_view()),
    path("api/enviarSolicitud",views.EnviarSolicitud.as_view()),
    path("api/newPassword/<str:cedula>", views.NewPassword.as_view()),
    path("api/cambiosHorarios/<str:cedula>",views.GuardarCambioHoras.as_view()),
    path("api/cargarSolicitudesAdmin", views.CargarSolicitudesAdmin.as_view()),
    path("api/cargarHistoricoAdmin", views.HistoricoSolicitudesAdmin.as_view()),
    path('api/cargarWorkers',views.CargarWorkers.as_view()),
    path("api/cargarHistorico/<str:cedula>",views.HistoricoSolicitudes.as_view()),
    path("api/cargarTabla/<str:cedula>/<str:mes>/<str:year>", views.CargarDatosTabla.as_view()),
    path("api/publicar", views.Publicar.as_view()),
    path("api/ManejarSolicitud", views.ManejarSolicitud.as_view()),
    path("api/registrar", views.Registrar.as_view()),
    path("api/marcarIndividual",views.MarcacionIndividual.as_view()),
]