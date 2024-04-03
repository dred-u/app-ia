from rest_framework import serializers
from .models import Peliculas, Directores, Usuarios, Rating

class PeliculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peliculas
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directores
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'