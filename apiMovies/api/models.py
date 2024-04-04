from django.db import models

# Create your models here.
class Directores(models.Model):
    id_director = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)
    fecha_nacimiento = models.CharField(max_length=100)
    biografia = models.CharField(max_length=3500)
    foto = models.CharField(max_length=255)

class Actores(models.Model):
    id_actores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)
    fecha_nacimiento = models.CharField(max_length=50)
    biografia = models.CharField(max_length=1500)
    foto = models.CharField(max_length=255)
 
class Genero(models.Model):
    id_genero = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

class Provedores(models.Model):
    id_provedor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

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
    director_id = models.ForeignKey(Directores, on_delete=models.CASCADE)
    productora_id = models.ForeignKey(Productoras, on_delete=models.CASCADE)
    poster = models.CharField(max_length=255)
    bg_imagen = models.CharField(max_length=255)

class Rating(models.Model):
    id_rating = models.AutoField(primary_key=True)
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    rating = models.IntegerField()

class DirectoresFavoritos(models.Model):
    id_directoresFav = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    director_id = models.ForeignKey(Directores, on_delete=models.CASCADE, db_column='id_director')

class GenerosFavoritos(models.Model):
    id_generosFav = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    genero_id = models.ForeignKey(Genero, on_delete=models.CASCADE, db_column='id_genero')

class PeliculasFavoritas(models.Model):
    id_peliculaFav = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='id_usuario')
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    resena = models.CharField(max_length=500)

class ProductorasFavoritas(models.Model):
    id_productorasFav = models.AutoField(primary_key=True)
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    provedor_id = models.ForeignKey(Provedores, on_delete=models.CASCADE, db_column='id_provedor')

class PeliculasActores(models.Model):
    id_pActores = models.AutoField(primary_key=True)
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    actores_id = models.ForeignKey(Actores, on_delete=models.CASCADE, db_column='id_actor')

class PeliculasGeneros(models.Model):
    id_pGeneros = models.AutoField(primary_key=True)
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    genero_id = models.ForeignKey(Genero, on_delete=models.CASCADE, db_column='id_genero')

class PeliculasProvedores(models.Model):
    id_pProvedores = models.AutoField(primary_key=True)
    pelicula_id = models.ForeignKey(Peliculas, on_delete=models.CASCADE, db_column='id_pelicula')
    provedor_id = models.ForeignKey(Provedores, on_delete=models.CASCADE, db_column='id_provedor')