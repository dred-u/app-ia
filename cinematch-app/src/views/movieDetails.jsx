import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';
import { useNavigation } from '@react-navigation/native';

export default function MovieDetails({ route }) {
  const navigation = useNavigation();
  const { object } = route.params;
  const { getGenres, getProviders, favoriteMovies, addFavMovie, delFavMovie } = useMovies();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [genre, setGenre] = useState([]);
  const [providers, setProviders] = useState([]);

  const toggleLike = () => {
    if (isLiked) {
      delFavMovie(object.id_pelicula);
    } else {
      const data = {
        id_pelicula: object.id_pelicula,
        id_usuario: user.id
      };
      addFavMovie(data);
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      gen = await getGenres(object.id_pelicula)
      prov = await getProviders(object.id_pelicula)
      setGenre(gen);
      setProviders(prov);
    };

      for (let i = 0; i < favoriteMovies.length; i++) {
        if (favoriteMovies[i].id_pelicula === object.id_pelicula) {
          setIsLiked(true);
          break; 
        }
      }

    fetchData();
  }, [object.id_pelicula]);


  return (
    <ImageBackground style={styles.container} source={{ uri: `https://image.tmdb.org/t/p/original${object.bg_imagen}` }} imageStyle={{ opacity: 0.7 }} blurRadius={3} >
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name='chevron-left' size={30} color='white' />
      </Pressable>
      <View style={styles.content}>
        <View style={styles.principal}>
          <View style={styles.bar} />
          <View style={styles.top_container}>
            <View style={styles.text_elements}>
              <Text style={styles.title}>{object.titulo}</Text>
              <Text style={styles.date}>{object.anno_estreno} • {object.duracion_minutos} minutos</Text>
              <Text style={styles.director}>Dirección:</Text>
              <Text style={styles.director_name}>{object.director}</Text>
              <Pressable onPress={toggleLike} style={{ marginTop: 20 }}>
              <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color='white' />
              </Pressable>
            </View>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original${object.poster}` }} style={styles.poster} />
          </View>
          <Text style={styles.description}>{object.descripcion} </Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16 }}>DETALLES</Text>
          <Text style={styles.label}>Genero</Text>
          <Text style={styles.details_label}>{object.genero}</Text>
          {genre && genre.map(item => (
            <Text key={item.id_pGeneros} style={styles.details_label}>{item.genero.nombre}</Text>
          ))}

          <Text style={styles.label}>Productora</Text>
          <Text style={styles.details_label}>Lorem Ipsum</Text>
          <Text style={styles.label}>Disponible en:</Text>
          <View style={{ flexDirection: 'row' }}>
            {providers && providers.map(item => (
              <Image key={item.id_pProvedores} source={{ uri: `https://image.tmdb.org/t/p/original${item.provedor.foto}` }} style={styles.distribuitor} />
            ))}
          </View>
        </View>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  content: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  principal: {
    marginHorizontal: 20,
  },
  top_container: {
    marginTop: 20,
    flexDirection: 'row',
  },
  text_elements: {
    marginRight: 20,
    width: '65%',
  },
  bar: {
    alignSelf: 'center',
    marginTop: 10,
    borderColor: '#1E1E1E',
    borderWidth: 6,
    width: 140,
    borderRadius: 10,
  },
  poster: {
    width: 120,
    height: 180,
    marginLeft: 10,
    resizeMode: 'cover',
    marginLeft: 'auto',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: '#AEAEAE',
  },
  director: {
    marginTop: 20,
    fontSize: 15,
    color: '#AEAEAE',
  },
  director_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    color: '#AEAEAE',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2'
  },
  details: {
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  label: {
    marginTop: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  details_label: {
    color: '#AEAEAE',
    fontSize: 15,
  },
  distribuitor: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginRight: 5,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
});
