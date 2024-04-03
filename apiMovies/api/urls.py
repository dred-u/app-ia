from django.urls import path, include
from rest_framework import routers
from api import views
from .viewsRecomendation import RecomendacionesView

router = routers.DefaultRouter()
router.register(r'peliculas', views.PeliculasView, 'peliculas')
router.register(r'directores', views.DirectoresView, 'directores')
router.register(r'usuarios', views.UsuariosView, 'usuarios')
router.register(r'rating', views.RatingView, 'rating')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('recomendaciones/<int:user_id>/', RecomendacionesView.as_view(), name='recomendaciones'),
]