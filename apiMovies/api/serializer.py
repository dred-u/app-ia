from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directores
        fields = '__all__'

class ActoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actores
        fields = '__all__'

class GenerosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'

class ProvedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provedores
        fields = '__all__'

class ProductoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productoras
        fields = '__all__'

class PeliculaSerializer(serializers.ModelSerializer):
    director = DirectorSerializer()
    productora = ProductoraSerializer()

    class Meta:
        model = Peliculas
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_pelicula': representation['id_pelicula'],
            'titulo': representation['titulo'],
            'anno_estreno': representation['anno_estreno'],
            'duracion_minutos': representation['duracion_minutos'],
            'descripcion': representation['descripcion'],
            'director':  representation['director']['nombre'],
            'productora': representation['productora']['nombre'],
            'poster': representation['poster'],
            'bg_imagen': representation['bg_imagen'], 
        }
    
class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email', 'password']

class DirectoresFavoritosSerializer(serializers.ModelSerializer):
    director = DirectorSerializer()
    usuario = UsuariosSerializer()
    class Meta:
        model = DirectoresFavoritos
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_fDirectores': representation['id_fDirectores'],
            'director':  {
                'id_director': representation['director']['id_director'],
                'nombre': representation['director']['nombre'],
                'nacionalidad': representation['director']['nacionalidad'],
                'fecha_nacimiento': representation['director']['fecha_nacimiento'],
                'biografia': representation['director']['biografia'],
                'foto': representation['director']['foto'],
                },
            'usuario': {
                'id': representation['usuario']['id'],
                'username': representation['usuario']['username'],
                'email': representation['usuario']['email'],
            },
        }

class GenerosFavoritosSerializer(serializers.ModelSerializer):
    genero = GenerosSerializer()
    usuario = UsuariosSerializer() 
   
    class Meta:
        model = GenerosFavoritos
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_fGeneros': representation['id_fGeneros'],
            'genero':  {
                'id_genero': representation['genero']['id_genero'],
                'nombre': representation['genero']['nombre'],
                },
            'usuario': {
                'id': representation['usuario']['id'],
                'username': representation['usuario']['username'],
                'email': representation['usuario']['email'],
            },
        }
    
class PeliculasFavoritasSerializer(serializers.ModelSerializer):
    usuario = UsuariosSerializer()
    pelicula = PeliculaSerializer()

    class Meta:
        model = PeliculasFavoritas
        fields = '__all__'
   
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_fPelicula': representation['id_fPelicula'],
            'pelicula': {
                'id_pelicula': representation['pelicula']['id_pelicula'],
                'titulo': representation['pelicula']['titulo'],
                'anno_estreno': representation['pelicula']['anno_estreno'],
                'duracion_minutos': representation['pelicula']['duracion_minutos'],
                'descripcion': representation['pelicula']['descripcion'],
                'director':  representation['pelicula']['director'],
                'productora': representation['pelicula']['productora'],
                'poster': representation['pelicula']['poster'],
                'bg_imagen': representation['pelicula']['bg_imagen'],
            },
            'usuario': {
                'id': representation['usuario']['id'],
                'username': representation['usuario']['username'],
                'email': representation['usuario']['email'],
            },
            'resena': representation['resena']         
        }     

class ProductorasFavoritasSerializer(serializers.ModelSerializer):
    usuario = UsuariosSerializer()
    productora = ProductoraSerializer()

    class Meta:
        model = ProductorasFavoritas
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_fProductoras': representation['id_fProductoras'],
            'productora': {
                'id_productora': representation['productora']['id_productora'],
                'nombre': representation['productora']['nombre'],
                'pais': representation['productora']['pais'],
                'logo': representation['productora']['logo'],
            },
            'usuario': {
                'id': representation['usuario']['id'],
                'username': representation['usuario']['username'],
                'email': representation['usuario']['email'],
            },      
        }   

class PeliculasActoresSerializer(serializers.ModelSerializer):
    actores = ActoresSerializer()
    Peliculas = PeliculaSerializer()
    class Meta:
        model = PeliculasActores
        fields = '__all__'

    def to_representation(self, instance):
            representation = super().to_representation(instance)
            return {
                'id_pActores': representation['id_pActores'],
                'pelicula': {
                    'id_pelicula': representation['pelicula']['id_pelicula'],
                    'titulo': representation['pelicula']['titulo'],
                },
                'actores': {
                    'id_actor': representation['actores']['id_actor'],
                    'nombre': representation['actores']['nombre'],
                    'nacionalidad': representation['actores']['nacionalidad'],
                    'fecha_nacimiento': representation['actores']['fecha_nacimiento'],
                    'biografia': representation['actores']['biografia'],
                    'foto': representation['actores']['foto'],
                },       
            }     

class PeliculasGenerosSerializer(serializers.ModelSerializer):
    pelicula = PeliculaSerializer()
    genero = GenerosSerializer()

    class Meta:
        model = PeliculasGeneros
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_pGeneros': representation['id_pGeneros'],
            'pelicula': {
                'id_pelicula': representation['pelicula']['id_pelicula'],
                'titulo': representation['pelicula']['titulo'],
            },
            'genero': {
                'id_genero': representation['genero']['id_genero'],
                'nombre': representation['genero']['nombre'],
            },       
        }     
    
class PeliculasProvedoresSerializer(serializers.ModelSerializer):
    pelicula = PeliculaSerializer()
    provedor = ProvedoresSerializer()

    class Meta:
        model = PeliculasProvedores
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_pProvedores': representation['id_pProvedores'],
            'pelicula': {
                'id_pelicula': representation['pelicula']['id_pelicula'],
                'titulo': representation['pelicula']['titulo'],
            },
            'provedor': {
                'id_provedor': representation['provedor']['id_provedor'],
                'nombre': representation['provedor']['nombre'],
                'foto': representation['provedor']['foto'],
            },       
        }    

class RatingSerializer(serializers.ModelSerializer):
    usuario = UsuariosSerializer()
    pelicula = PeliculaSerializer()
    class Meta:
        model = Rating
        fields = '__all__'
   
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            'id_rating': representation['id_rating'],
            'pelicula': {
                'id_pelicula': representation['pelicula']['id_pelicula'],
                'titulo': representation['pelicula']['titulo'],
                'anno_estreno': representation['pelicula']['anno_estreno'],
                'duracion_minutos': representation['pelicula']['duracion_minutos'],
                'descripcion': representation['pelicula']['descripcion'],
                'director':  representation['pelicula']['director'],
                'productora': representation['pelicula']['productora'],
                'poster': representation['pelicula']['poster'],
                'bg_imagen': representation['pelicula']['bg_imagen'],
            },
            'usuario': {
                'id': representation['usuario']['id'],
                'username': representation['usuario']['username'],
                'email': representation['usuario']['email'],
            },
            'rating': representation['rating'],           
        }     