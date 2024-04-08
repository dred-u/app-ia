import { React, useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';
import Movies_page from '../components/movies-pages/movies-page';

export default function GenreDetails ({ route }) {
  const navigation = useNavigation(); 
  const { object } = route.params;
  const { getGenMovies, favoriteGenres, addFavGenre, delFavGenre } = useMovies(); 
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [movies, setMovies] = useState([]);

  const toggleLike = () => {
    if (isLiked) {
      delFavGenre(object.id_genero);
    } else {
      const data = {
        id_genero: object.id_genero,
        id_usuario: user.id
      };
      addFavGenre(data);
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchData = async () => { 
      res = await getGenMovies(object.id_genero)
      const moviesArray = res.map(item => item.pelicula);
      setMovies(moviesArray);
    };

    for (let i = 0; i < favoriteGenres.length; i++) {
      if (favoriteGenres[i].id_genero === object.id_genero) {
        setIsLiked(true);
        break; 
      }
    }

    fetchData();
  }, [object.id_genero]);

  return (
    <View style={styles.content}>

      <View style={styles.top}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name='chevron-left' size={30} color='white' />
        </Pressable>
        <Text style={styles.title}>{object.nombre}</Text>
        <Pressable onPress={toggleLike} style={styles.icon}>
          <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color={isLiked ? 'white' : 'white'} />
        </Pressable>
      </View>
        <Movies_page list={movies} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#2E2E2E',
    height: '100%',
  },
  top:{
    marginTop: 40,
    paddingBottom:10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2'
  },
  icon:{
    marginLeft:'auto',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 6,
    borderRadius: 10,
  },
});
