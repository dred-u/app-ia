import { React, useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator } from "react-native";
import Carousel from '../components/carousel';
import Movie_list from '../components/movie-list';
import { useMovies } from '../moviesContext';

const PAGE_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const { movieGenreRecomendations, movieRecomendations, name, movieProvidersRecomendations } = useMovies();
  const [isLoading, setIsLoading] = useState(true);

  // UseEffect para cambiar el estado de carga una vez que los datos estén listos
  useEffect(() => {
    if (movieRecomendations && movieRecomendations.length > 0) {
      setIsLoading(false);
    }
  }, [movieRecomendations]);

  return (
    <ScrollView contentContainerStyle={styles.container_body} removeClippedSubviews={true}>
      {isLoading ? (
        // Muestra un indicador de carga mientras los datos están siendo cargados
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        // Una vez que los datos estén listos, renderiza el contenido normal
        <View style={styles.fy_space}>
          <Text style={styles.title}>
            Para ti
          </Text>

          <View style={styles.carousel_container}>
            <Carousel list={movieRecomendations} />
            {movieProvidersRecomendations && movieProvidersRecomendations.length > 0 ? (
              <Movie_list list={movieProvidersRecomendations} title={"Lo mas popular"} />
            ) : (
              <View></View>
            )}
            {movieGenreRecomendations && movieGenreRecomendations.length > 0 ? (
              <Movie_list list={movieGenreRecomendations} title={name} />
            ) : (
              <View></View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    height: '100%',
    width: '100%',
  },
  fy_space: {
    marginTop: 20,
    marginLeft: 40,
    height: Platform.select({
      android: PAGE_HEIGHT,
      web: '100%'
    })
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
    textAlign:'center' 
  }
});
