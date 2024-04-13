from rest_framework import viewsets
from .serializer import *
from .models import *
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

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

#METODOS PARA POSTEAR DATOS
@api_view(['POST'])
def AgregarPeliculaFavorita(request):
    serializer = AgregarPeliculaFavoritaSerializer(data=request.data)

    if serializer.is_valid():
        id_pelicula = serializer.validated_data['id_pelicula']
        id_usuario = serializer.validated_data['id_usuario']

        if not PeliculasFavoritas.objects.filter(usuario_id=id_usuario, pelicula_id=id_pelicula).exists():
            # Si no existe, la agregamos a favoritos
            PeliculasFavoritas.objects.create(usuario_id=id_usuario, pelicula_id=id_pelicula)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response({'message': 'El dato ya existe'})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def AgregarGeneroFavorito(request):
    serializer = AgregarGeneroFavoritoSerializer(data=request.data)

    if serializer.is_valid():
        id_genero = serializer.validated_data['id_genero']
        id_usuario = serializer.validated_data['id_usuario']

        if not GenerosFavoritos.objects.filter(usuario_id=id_usuario, genero_id=id_genero).exists():
            # Si no existe, la agregamos a favoritos
            GenerosFavoritos.objects.create(usuario_id=id_usuario, genero_id=id_genero)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response({'message': 'El dato ya existe'})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def AgregarDirectorFavorito(request):
    serializer = AgregarDirectorFavoritoSerializer(data=request.data)

    if serializer.is_valid():
        id_director = serializer.validated_data['id_director']
        id_usuario = serializer.validated_data['id_usuario']

        if not DirectoresFavoritos.objects.filter(usuario_id=id_usuario, director_id=id_director).exists():
            # Si no existe, la agregamos a favoritos
            DirectoresFavoritos.objects.create(usuario_id=id_usuario, director_id=id_director)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response({'message': 'El dato ya existe'})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#METODOS PARA BORRAR DATOS
@api_view(['DELETE'])
def EliminarPeliculaFavorita(request, pelicula_id):
    try:
        pelicula_favorita = PeliculasFavoritas.objects.get(pelicula=pelicula_id)
        pelicula_favorita.delete()
        return Response({'message': 'Película favorita eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except PeliculasFavoritas.DoesNotExist:
        return Response({'error': 'La película favorita no existe'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def EliminarGeneroFavorito(request, genero_id):
    try:
        genero_favorito = GenerosFavoritos.objects.get(genero=genero_id)
        genero_favorito.delete()
        return Response({'message': 'Genero eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except GenerosFavoritos.DoesNotExist:
        return Response({'error': 'El genero favorito no existe'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def EliminarDirectorFavorito(request, director_id):
    try:
        director_favorito = DirectoresFavoritos.objects.get(director=director_id)
        director_favorito.delete()
        return Response({'message': 'Director eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except DirectoresFavoritos.DoesNotExist:
        return Response({'error': 'El director no existe'}, status=status.HTTP_404_NOT_FOUND)