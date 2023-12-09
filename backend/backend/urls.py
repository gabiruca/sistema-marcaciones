from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

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
    path("api/subirImg",views.SubirImg.as_view()),
    path("api/cargarImg/<str:cedula>",views.ObtenerImg.as_view()),
    path("api/publishedStatus/<str:cedula>/<str:mes>/<str:year>", views.IsPublicado.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)