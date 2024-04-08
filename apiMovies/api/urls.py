from django.urls import path, include
from rest_framework import routers
from api import views
from api import viewsAuth
from .viewsRecomendation import RecomendacionesView

router = routers.DefaultRouter()
router.register(r'peliculas', views.PeliculasView, 'peliculas')
router.register(r'directores', views.DirectoresView, 'directores')
router.register(r'actores', views.ActoresView, 'actores')
router.register(r'generos', views.GenerosView, 'generos')
router.register(r'provedores', views.ProvedoresView, 'provedores')
router.register(r'productoras', views.ProductorasView, 'productoras')
router.register(r'directores_favoritos', views.DirectoresFavoritosView, 'directores_favoritos')
router.register(r'generos_favoritos', views.GenerosFavoritosView, 'generos_favoritos')
router.register(r'peliculas_favoritas', views.PeliculasFavoritasView, 'peliculas_favoritas')
router.register(r'productoras_f', views.ProductorasFavoritasView, 'productoras_f')
router.register(r'peliculas_actores', views.PeliculasActoresView, 'peliculas_actores')
router.register(r'peliculas_generos', views.PeliculasGenerosView, 'peliculas_generos')
router.register(r'peliculas_provedores', views.PeliculasProvedoresView, 'peliculas_provedores')
router.register(r'rating', views.RatingView, 'rating')

urlpatterns = [
    path("v1/", include(router.urls)),
    path('recomendaciones/<int:user_id>/', RecomendacionesView.as_view(), name='recomendaciones'),
    path('peliculas_favoritas/<int:usuario_id>/', views.PeliculasFavoritasView.as_view({'get': 'list'}), name='peliculas_favoritas_u'),
    path('directores_favoritos/<int:usuario_id>/', views.PeliculasFavoritasView.as_view({'get': 'list'}), name='directores_favoritos_u'),
    path('generos_favoritos/<int:usuario_id>/', views.GenerosFavoritosView.as_view({'get': 'list'}), name='generos_favoritos_u'),
    path('productoras_favoritas/<int:usuario_id>/', views.ProductorasFavoritasView.as_view({'get': 'list'}), name='productoras_favoritas_u'),
    path('peliculas_generos/<int:pelicula_id>/', views.PeliculasGenerosView.as_view({'get': 'list'}), name='peliculas_generos_e'),
    path('peliculas_actores/<int:pelicula_id>/', views.PeliculasActoresView.as_view({'get': 'list'}), name='peliculas_actores_e'),
    path('peliculas_provedores/<int:pelicula_id>/', views.PeliculasProvedoresView.as_view({'get': 'list'}), name='peliculas_provedores_e'),
    path('rating/<int:usuario_id>/', views.RatingView.as_view({'get': 'list'}), name='rating_u'),
    path('login', viewsAuth.login),
    path('register', viewsAuth.register),
    path('profile', viewsAuth.profile),
]