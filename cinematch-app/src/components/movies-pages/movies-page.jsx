import { React, useEffect, useState } from 'react'
import { Platform, ScrollView, View, ActivityIndicator, StyleSheet, Text, TextInput } from 'react-native'
import MoviePoster from '../../components/poster-cover'

export default function Movies_page({ list }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!list) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setFilteredMovies(list); 
    }
  }, [list]);

  // Filtrar películas cuando el término de búsqueda cambia
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostramos todas las películas
      setFilteredMovies(list);
    } else {
      // Filtramos las películas según el término de búsqueda
      const filtered = list.filter(movie =>
        movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, list]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!list || list.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aun no hay películas disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar películas..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView contentContainerStyle={styles.movie_list} removeClippedSubviews={true}>
        {filteredMovies.map((movie, index) => (
          <MoviePoster
            key={index}
            object={movie}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  movie_list: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 75,

  },
  searchInput: {
    padding: 8,
    margin: 8,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ffffff',
  },
});