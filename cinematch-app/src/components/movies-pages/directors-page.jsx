import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, Text, ImageBackground, ScrollView, StyleSheet, ActivityIndicator, View, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width * 0.39;

export default function DirectorsPage({ list }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDirectors, setFilteredDirectors] = useState([]);

  const handlePress = (object) => {
    navigation.navigate('DirectorDetails', { object });
  };

  useEffect(() => {
    if (!list) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setFilteredDirectors(list);
    }
  }, [list]);

  // Filtrar películas cuando el término de búsqueda cambia
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostramos todas las películas
      setFilteredDirectors(list);
    } else {
      // Filtramos las películas según el término de búsqueda
      const filtered = list.filter(producer =>
        producer.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDirectors(filtered);
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
        <Text style={styles.errorText}>Aun no hay directores disponibles</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar directores..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView contentContainerStyle={styles.directorList} removeClippedSubviews={true}>
        {filteredDirectors.map((director, index) => (
          <TouchableOpacity onPress={() => handlePress(director)} key={index}>
            <ImageBackground source={{ uri: director.foto ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${director.foto}` : 'https://image.jimcdn.com/app/cms/image/transf/dimension=640x1024:format=jpg/path/s5044ce942026e8f2/image/ifcd5c51461c2dc3d/version/1628532290/image.jpg' }} style={{
              ...styles.image,
              width: Platform.select({
                android: 85.71,
                web: PAGE_WIDTH
              }),
              height: Platform.select({
                android: 128.57,
                web: PAGE_WIDTH * 1.5
              }),
            }}>
              <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={{ paddingTop: 10 }}>
                <Text style={styles.directorName}>{director.nombre}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity >
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  directorList: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 75,

  },
  searchInput: {
    padding: 8,
    margin: 8,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  directorName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    margin: 1,
    justifyContent: 'flex-end',
    borderRadius: 80,
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
