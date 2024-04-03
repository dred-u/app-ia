from rest_framework.response import Response
from rest_framework.views import APIView
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import pandas as pd
from sqlalchemy import create_engine

class RecomendacionesView(APIView):
    def get(self, request, user_id):
        # Conecta a la base de datos
        engine = create_engine('mysql://root:123456789@localhost:3306/dbpelis')

        # Carga los datos de películas, calificaciones y usuarios
        pelis = pd.read_sql("SELECT id_pelicula, titulo FROM api_peliculas", engine)
        rating = pd.read_sql("SELECT id_pelicula, id_usuario, rating FROM api_rating", engine)
        user = pd.read_sql("SELECT id_pelicula, id_usuario, rating FROM api_rating WHERE id_usuario = %s" % user_id, engine)

        # Procesamiento de recomendación
        movies_users = rating.pivot(index='id_pelicula', columns='id_usuario', values='rating').fillna(0)
        user_sorted = user.sort_values(by='rating', ascending=False)
        user_sorted = user_sorted['id_pelicula'].tolist()

        movie_names = []
        for movie_id in user_sorted:
            rating = user.loc[user['id_pelicula'] == movie_id, 'rating'].iloc[0]
            if rating > 5:
                movie_name = pelis.loc[pelis['id_pelicula'] == movie_id, 'titulo'].iloc[0]
                movie_names.append(movie_name)

        mat_movies = csr_matrix(movies_users.values)
        model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20)
        model.fit(mat_movies)

        def recommender(movie_names, data, n):
            unique_recommendations = set()
            for movie_name in movie_names:
                movie_id = pelis.loc[pelis['titulo'] == movie_name, 'id_pelicula'].iloc[0]
                idx = movies_users.index.get_loc(movie_id)
                distance, indices = model.kneighbors(data[idx], n_neighbors=n)
                for index, i in enumerate(indices[0]):
                    if i != idx:
                        unique_recommendations.add(movies_users.index[i])
            return list(unique_recommendations)[:10]

        recommended_movies = recommender(movie_names, mat_movies, 10)

        # Devuelve las recomendaciones como una respuesta JSON
        return Response({'recomendaciones': recommended_movies})