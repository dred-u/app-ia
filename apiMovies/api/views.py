from rest_framework import viewsets
from .serializer import *
from .models import *
from django.http import Http404

class PeliculasView(viewsets.ModelViewSet):
    serializer_class = PeliculaSerializer
    queryset = Peliculas.objects.all()

class DirectoresView(viewsets.ModelViewSet):
    serializer_class = DirectorSerializer
    queryset = Directores.objects.all()

class ActoresView(viewsets.ModelViewSet):
    serializer_class = ActoresSerializer
    queryset = Actores.objects.all()

class GenerosView(viewsets.ModelViewSet):
    serializer_class = GenerosSerializer
    queryset = Genero.objects.all()

class ProvedoresView(viewsets.ModelViewSet):
    serializer_class = ProvedoresSerializer
    queryset = Provedores.objects.all()

class ProductorasView(viewsets.ModelViewSet):
    serializer_class = ProductoraSerializer
    queryset = Productoras.objects.all()

class DirectoresFavoritosView(viewsets.ModelViewSet):
    serializer_class = DirectoresFavoritosSerializer

    def get_queryset(self):
            usuario_id = self.kwargs.get('usuario_id')
            if usuario_id is not None:
                try:
                    usuario = User.objects.get(pk=usuario_id)
                    queryset = DirectoresFavoritos.objects.filter(usuario=usuario)
                    return queryset
                except User.DoesNotExist:
                    raise Http404("El usuario no existe")
            else:
                return DirectoresFavoritos.objects.all()

class GenerosFavoritosView(viewsets.ModelViewSet):
    serializer_class = GenerosFavoritosSerializer

    def get_queryset(self):
            usuario_id = self.kwargs.get('usuario_id')
            if usuario_id is not None:
                try:
                    # Obtener el usuario
                    usuario = User.objects.get(pk=usuario_id)
                    # Filtrar los registros por el usuario
                    queryset = GenerosFavoritos.objects.filter(usuario=usuario)
                    return queryset
                except User.DoesNotExist:
                    raise Http404("El usuario no existe")
            else:
                return GenerosFavoritos.objects.all()   

class PeliculasFavoritasView(viewsets.ModelViewSet):
    serializer_class = PeliculasFavoritasSerializer

    def get_queryset(self):
        usuario_id = self.kwargs.get('usuario_id')
        if usuario_id is not None:
            try:
                # Obtener el usuario
                usuario = User.objects.get(pk=usuario_id)
                # Filtrar los registros por el usuario
                queryset = PeliculasFavoritas.objects.filter(usuario=usuario)
                return queryset
            except User.DoesNotExist:
                raise Http404("El usuario no existe")
        else:
            return PeliculasFavoritas.objects.all()

class ProductorasFavoritasView(viewsets.ModelViewSet):
    serializer_class = ProductorasFavoritasSerializer

    def get_queryset(self):
        usuario_id = self.kwargs.get('usuario_id')
        if usuario_id is not None:
            try:
                # Obtener el usuario
                usuario = User.objects.get(pk=usuario_id)
                # Filtrar los registros por el usuario
                queryset = ProductorasFavoritas.objects.filter(usuario=usuario)
                return queryset
            except User.DoesNotExist:
                raise Http404("El usuario no existe")
        else:
            return ProductorasFavoritas.objects.all()
    
class PeliculasActoresView(viewsets.ModelViewSet):
    serializer_class = PeliculasActoresSerializer

    def get_queryset(self):
        pelicula_id = self.kwargs.get('pelicula_id')
        if pelicula_id is not None:
            try:
                # Obtener el usuario
                pelicula = Peliculas.objects.get(pk=pelicula_id)
                # Filtrar los registros por el pelicula
                queryset = PeliculasActores.objects.filter(pelicula=pelicula)
                return queryset
            except Peliculas.DoesNotExist:
                raise Http404("La pelicula no existe")
        else:
            return PeliculasActores.objects.all()  

class PeliculasGenerosView(viewsets.ModelViewSet):
    serializer_class = PeliculasGenerosSerializer

    def get_queryset(self):
        pelicula_id = self.kwargs.get('pelicula_id')
        if pelicula_id is not None:
            try:
                # Obtener el usuario
                pelicula = Peliculas.objects.get(pk=pelicula_id)
                # Filtrar los registros por el pelicula
                queryset = PeliculasGeneros.objects.filter(pelicula=pelicula)
                return queryset
            except Peliculas.DoesNotExist:
                raise Http404("La pelicula no existe")
        else:
            return PeliculasGeneros.objects.all()    

class PeliculasProvedoresView(viewsets.ModelViewSet):
    serializer_class = PeliculasProvedoresSerializer

    def get_queryset(self):
        pelicula_id = self.kwargs.get('pelicula_id')
        if pelicula_id is not None:
            try:
                # Obtener el usuario
                pelicula = Peliculas.objects.get(pk=pelicula_id)
                # Filtrar los registros por el pelicula
                queryset = PeliculasProvedores.objects.filter(pelicula=pelicula)[:5]
                return queryset
            except Peliculas.DoesNotExist:
                raise Http404("La pelicula no existe")
        else:
            return PeliculasProvedores.objects.all()  

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer

    def get_queryset(self):
        usuario_id = self.kwargs.get('usuario_id')
        if usuario_id is not None:
            try:
                # Obtener el usuario
                usuario = User.objects.get(pk=usuario_id)
                # Filtrar los registros por el usuario
                queryset = Rating.objects.filter(usuario=usuario)
                return queryset
            except User.DoesNotExist:
                raise Http404("El usuario no existe")
        else:
            return Rating.objects.all()
        
class GenerosPeliculasView(viewsets.ModelViewSet):
    serializer_class = PeliculasGenerosSerializer

    def get_queryset(self):
        genero_id = self.kwargs.get('genero_id')
        if genero_id is not None:
            try:
                # Obtener el género
                genero = Genero.objects.get(pk=genero_id)
                # Filtrar los registros por el género
                queryset = PeliculasGeneros.objects.filter(genero=genero)
                return queryset
            except Genero.DoesNotExist:
                raise Http404("El género no existe")
        else:
            return PeliculasGeneros.objects.all()


class DirectoresPeliculasView(viewsets.ModelViewSet):
    serializer_class = PeliculaSerializer

    def get_queryset(self):
        director_id = self.kwargs.get('director_id')
        if director_id is not None:
            try:
                # Obtener el género
                director = Directores.objects.get(pk=director_id)
                # Filtrar los registros por el género
                queryset = Peliculas.objects.filter(director=director)
                return queryset
            except Directores.DoesNotExist:
                raise Http404("El director no existe")
        else:
            return Peliculas.objects.all()



