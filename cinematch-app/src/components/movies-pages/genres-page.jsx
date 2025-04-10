import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions, Text, ScrollView, StyleSheet, ActivityIndicator, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width * 0.39;

export default function GenrePage({ list }) {
  const navigation = useNavigation();
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGenres, setFilteredGenres] = useState([]);

  useEffect(() => {
    generateColors();
  }, []);

  const generateColors = () => {
    const generatedColors = list.map((genre, index) => {
      const color1 = getRandomColor();
      let color2;
      do {
        color2 = getRandomColor();
      } while (color1 === color2); // Asegura que color1 y color2 sean diferentes
      return [color1, color2];
    });
    setColors(generatedColors);
  };

  // Función para generar un color aleatorio en formato RGB
  const getRandomColor = () => {
    const option = Math.random() < 0.5 ? 1 : 2;
    let r, g, b;

    if (option === 1) {
      r = Math.floor(Math.random() * (235 - 200)) + 200;
      g = 0;
      b = Math.floor(Math.random() * 100);
    } else {
      r = Math.floor(Math.random() * (255 - 220)) + 220;
      g = Math.floor(Math.random() * 255);
      b = 0;
    }

    return `rgb(${r},${g},${b})`;
  };

  const handlePress = (object) => {
    navigation.navigate('GenreDetails', { object });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!list) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setFilteredGenres(list);
    }
  }, [list]);

  // Filtrar películas cuando el término de búsqueda cambia
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostramos todas las películas
      setFilteredGenres(list);
    } else {
      // Filtramos las películas según el término de búsqueda
      const filtered = list.filter(genre =>
        genre.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGenres(filtered);
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
        <Text style={styles.errorText}>Aun no hay generos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar generos..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView contentContainerStyle={styles.genre_list} removeClippedSubviews={true}>
        {filteredGenres.map((genre, index) => (
          <TouchableOpacity onPress={() => handlePress(genre)} key={index}>
            <LinearGradient
              colors={colors[index]}
              style={[styles.genreContainer]}
            >
              <Text style={styles.title}>{genre.nombre}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genre_list: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 75,

  },
  searchInput: {
    padding: 8,
    margin: 8,
    marginHorizontal:20,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  genreContainer: {
    width: PAGE_WIDTH,
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
