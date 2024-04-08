import React, { useState } from 'react'
import { Platform, TouchableOpacity ,View, Text, StyleSheet } from 'react-native'
import Movies_page from '../components/movies-pages/movies-page';
import Directors_page from '../components/movies-pages/directors-page';
import Producer_page from '../components/movies-pages/producer-page';
import Genre_page from '../components/movies-pages/genres-page';

import { useMovies } from '../moviesContext';

import { producersItems } from '../components/carousel-elements';

export default function Movies() {
  const { favoriteMovies, favoriteGenres, favoriteDirectors} = useMovies(); 
  const [currentPage, setCurrentPage] = useState('Movies');


  const renderPage = () => {
    if (currentPage === 'Movies') {
      return <Movies_page list={favoriteMovies} />;
    } else if (currentPage === 'Directors') {
      return <Directors_page list={favoriteDirectors} />;
    } else if (currentPage === 'Producers') {
      return <Producer_page list={producersItems} />;
    } else if (currentPage === 'Genres') {
      return <Genre_page list={favoriteGenres} />;
    }
  };

  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Favoritos</Text>
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity
          style={[styles.button, currentPage === 'Movies' && styles.active_button]}
          onPress={() => setCurrentPage('Movies')}>
          <Text style={styles.button_text}>Películas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, currentPage === 'Genres' && styles.active_button]}
          onPress={() => setCurrentPage('Genres')}>
          <Text style={styles.button_text}>Generos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, currentPage === 'Directors' && styles.active_button]}
          onPress={() => setCurrentPage('Directors')}>
          <Text style={styles.button_text}>Directores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, currentPage === 'Producers' && styles.active_button]}
          onPress={() => setCurrentPage('Producers')}>
          <Text style={styles.button_text}>Productoras</Text>
        </TouchableOpacity>
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