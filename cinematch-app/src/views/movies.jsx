import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Movies_page from '../components/movies-pages/movies-page';
import Directors_page from '../components/movies-pages/directors-page';
import Producer_page from '../components/movies-pages/producer-page';
import Genre_page from '../components/movies-pages/genres-page';

import { useMovies } from '../moviesContext';

export default function Movies() {
  const { movies, genres, directors, producers } = useMovies(); 
  const [currentPage, setCurrentPage] = useState('Movies');

  const renderPage = () => {
    if (currentPage === 'Movies') {
      return <Movies_page list={movies} />;
    } else if (currentPage === 'Directors') {
      return <Directors_page list={directors} />;
    } else if (currentPage === 'Producers') {
      return <Producer_page list={producers} />;
    } else if (currentPage === 'Genres') {
      return <Genre_page list={genres} />;
    }
  };

  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Listas</Text>
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
