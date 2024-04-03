from rest_framework import viewsets
from .serializer import PeliculaSerializer, UsuariosSerializer, RatingSerializer
from .models import Peliculas, Usuarios, Rating

# Create your views here.
class PeliculasView(viewsets.ModelViewSet):
    serializer_class = PeliculaSerializer
    queryset = Peliculas.objects.all()

class DirectoresView(viewsets.ModelViewSet):
    serializer_class = PeliculaSerializer
    queryset = Peliculas.objects.all()

class UsuariosView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()