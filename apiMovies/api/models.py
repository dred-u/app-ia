from django.db import models

# Create your models here.
class Directores(models.Model):
    id_director = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)
    fecha_nacimiento = models.CharField(max_length=100)
    biografia = models.CharField(max_length=3500)
    foto = models.CharField(max_length=255)

class Productoras(models.Model):
    id_productora = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    pais = models.CharField(max_length=50)
    logo = models.CharField(max_length=250)

class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=255)

class Peliculas(models.Model):
    id_pelicula = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    anno_estreno = models.IntegerField()
    duracion_minutos = models.IntegerField()
    titulo = models.CharField(max_length=3500)
    director = models.ForeignKey(Directores, on_delete=models.CASCADE)
    productora = models.ForeignKey(Productoras, on_delete=models.CASCADE)
    poster = models.CharField(max_length=255)
    bg_imagen = models.CharField(max_length=255)

class Rating(models.Model):
    id_rating = models.AutoField(primary_key=True)
    id_pelicula = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    id_usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    rating = models.IntegerField()

