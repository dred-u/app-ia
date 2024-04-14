import React, { useState, useEffect } from 'react'
import { Platform, Pressable ,View, Text, StyleSheet } from 'react-native'
import Movies_page from '../components/movies-pages/movies-page';
import Directors_page from '../components/movies-pages/directors-page';
import Producer_page from '../components/movies-pages/producer-page';
import Genre_page from '../components/movies-pages/genres-page';

import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';

export default function Movies() {
  const { favoriteMovies, favoriteGenres, favoriteDirectors, favoriteProducers,
          getFavoriteMovieList, movieLike, setMovieLike} = useMovies(); 
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('Movies');

 // Verificar si los arrays de favoritos son nulos antes de mapearlos
 const moviesArray = favoriteMovies ? favoriteMovies.map(item => item.pelicula) : [];
 const genresArray = favoriteGenres ? favoriteGenres.map(item => item.genero) : [];
 const directorsArray = favoriteDirectors ? favoriteDirectors.map(item => item.director) : [];
 const producersArray = favoriteProducers ? favoriteProducers.map(item => item.productora) : [];
 

  useEffect(() => {
    if(movieLike == true){
      getFavoriteMovieList(user.id)
      setMovieLike(false)
  }
  },[movieLike])


  const renderPage = () => {
    if (currentPage === 'Movies') {
      return <Movies_page list={moviesArray} />;
    } else if (currentPage === 'Directors') {
      return <Directors_page list={directorsArray} />;
    } else if (currentPage === 'Producers') {
      return <Producer_page list={producersArray} />;
    } else if (currentPage === 'Genres') {
      return <Genre_page list={genresArray} />;
    }
  };

  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Favoritos</Text>
      </View>

      <View style={styles.button_container}>
        <Pressable
          style={[styles.button, currentPage === 'Movies' && styles.active_button]}
          onPress={() => setCurrentPage('Movies')}>
          <Text style={styles.button_text}>Películas</Text>
        </Pressable>

        <Pressable
          style={[styles.button, currentPage === 'Genres' && styles.active_button]}
          onPress={() => setCurrentPage('Genres')}>
          <Text style={styles.button_text}>Generos</Text>
        </Pressable>

        <Pressable
          style={[styles.button, currentPage === 'Directors' && styles.active_button]}
          onPress={() => setCurrentPage('Directors')}>
          <Text style={styles.button_text}>Directores</Text>
        </Pressable>

        <Pressable
          style={[styles.button, currentPage === 'Producers' && styles.active_button]}
          onPress={() => setCurrentPage('Producers')}>
          <Text style={styles.button_text}>Productoras</Text>
        </Pressable>
      </View>

      {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    flex: 1
  },

  fy_space: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderColor: '#A2A9B2',
    borderBottomWidth: 1,

  },

  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
  },

  button_container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  active_button: {
    backgroundColor: '#9A0315',
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
  },

});