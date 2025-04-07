import { React, useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator } from "react-native";
import Carousel from '../components/carousel';
import Movie_list from '../components/movie-list';
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';

const PAGE_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const { movieGenreRecomendations, movieRecomendations, movieProvidersRecomendations, 
          getMovieGenreRecomendations, getMovieRecomendations, getMovieProvidersRecomendations, 
          favoriteGenres, favoriteProviders, favoriteMovies } = useMovies();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [nameProv, setNameProv] = useState('');

  useEffect(() => {
    if (favoriteMovies && user) {
      getMovieRecomendations(user.id)
    }
    if (favoriteGenres && user) {
      const randomIndex = Math.floor(Math.random() * favoriteGenres.length);
      const randomGenre = favoriteGenres[randomIndex];
      const randomGenreId = randomGenre.genero.id_genero;
      const nameG = randomGenre.genero.nombre;
      getMovieGenreRecomendations(user.id, randomGenreId);
      setName(nameG);
    }
    if (favoriteProviders && user) {
      const randomIndex = Math.floor(Math.random() * favoriteProviders.length);
      const randomProv = favoriteProviders[randomIndex];
      const randomProvId = randomProv.provedor.id_provedor;
      const nameP = randomProv.provedor.nombre;
      getMovieProvidersRecomendations(user.id, randomProvId);
      setNameProv(nameP);
    }

  }, [favoriteGenres, favoriteMovies, favoriteProviders]);

  return (
    <ScrollView contentContainerStyle={styles.container_body} removeClippedSubviews={true}>
        <View style={styles.fy_space}>
          {movieRecomendations && movieRecomendations.length > 0 ? (
            <View>
              <Text style={styles.title}>
                Para ti
              </Text>
              <Carousel list={movieRecomendations} />
            </View>
          ) : <View>
            <Text style={styles.none}>
              Aun no tienes recomendaciones, ¡sigue explorando películas!
            </Text>
          </View>}
          {movieProvidersRecomendations && movieProvidersRecomendations.length > 0 ? (
            <Movie_list list={movieProvidersRecomendations} title={nameProv} />
          ) : <View>
            <Text style={styles.none}>
              Aun no tienes recomendaciones, ¡sigue explorando Servicios!
            </Text>
          </View>}
          {movieGenreRecomendations && movieGenreRecomendations.length > 0 ? (
            <Movie_list list={movieGenreRecomendations} title={name} />
          ) : <View>
            <Text style={styles.none}>
              Aun no tienes recomendaciones, ¡sigue explorando generos!
            </Text></View>}
          {(favoriteGenres && favoriteMovies && favoriteProviders) && (
            favoriteGenres.length === 0
              && favoriteMovies.length === 0
              && favoriteProviders.length === 0 ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, padding: 20 }}>
                <Text style={styles.none}>
                  Aun no tienes recomendaciones, ¡sigue explorando películas!
                </Text>
              </View>
            ) : <View></View>
          )}
        </View>
        <View style={{height:80}}>

        </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
  },
  fy_space: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  carousel_container: {
    paddingBottom: 200,
  },
  title: {
    color: '#ffffff',
    fontSize: Platform.select({
      web: 40,
      android: 30
    }),
    fontWeight: 'bold',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  none: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  }
});
