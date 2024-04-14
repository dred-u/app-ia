import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';
import { useNavigation } from '@react-navigation/native';
import RatingModal from '../components/movies-pages/ratingModal';

export default function MovieDetails({ route }) {
  const navigation = useNavigation();
  const { object } = route.params;
  const { getGenres, getProviders, getDirectors, movieRatings,
          getProducers, favoriteMovies, addFavMovie, delFavMovie, setMovieLike, movieLike } = useMovies();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [genre, setGenre] = useState([]);
  const [providers, setProviders] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteID, setFavoriteID] = useState(null);
  const [rate, setRate] = useState(null);

  const data = {
    pelicula: object.id_pelicula,
    usuario: user.id
  };
  
  const toggleLike = async () => {
    if (isLiked) {
      delFavMovie(favoriteID);
    } else {
      addFavMovie(data);
    }
    setIsLiked(!isLiked);
    setMovieLike(!movieLike);
  };

  const toggleRating = () => {
    setModalVisible(!isModalVisible);
    setIsRated(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      gen = await getGenres(object.id_pelicula);
      prov = await getProviders(object.id_pelicula);
      dir = await getDirectors(object.id_pelicula);
      prod = await getProducers(object.id_pelicula);

      setGenre(gen.slice(0, 2));
      setProviders(prov);
      setDirectors(dir);
      setProducers(prod.slice(0, 2));
      setLoading(false);
    };
    
    if (favoriteMovies) {
      let favoriteMovie = favoriteMovies.find(item => item.pelicula.id_pelicula === object.id_pelicula);
        if (favoriteMovie) {
          setIsLiked(true);
          setFavoriteID(favoriteMovie.id_fPelicula);
      }
    }

    const fetchMovieRatings = async () => {
      if (movieRatings) {
        let ratedMovie = movieRatings.find(item => item.pelicula.id_pelicula === object.id_pelicula);
        if (ratedMovie) {
          setIsRated(true);
          setRate(ratedMovie.rating);
        }
      }
    };

    fetchData();
    fetchMovieRatings();
  }, []);


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ImageBackground style={styles.container} source={{ uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${object.bg_imagen}` }} imageStyle={{ opacity: 0.7 }} blurRadius={3} >
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
              {directors && directors.map(item => (
                <Text key={item.id_pDirectores} style={styles.director_name}>{item.director.nombre}</Text>
              ))}
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Pressable onPress={toggleLike}>
                  <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color='white' />
                </Pressable>
                <Pressable
                  onPress={toggleRating}
                  style={[styles.ratingButton, { backgroundColor: isRated ? '#ffffff' : 'rgba(255, 255, 255, 0)' }]}
                >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: isRated ? '#000000' : '#ffffff' }}>{isRated? rate:'Calificar'} </Text>
                  <Icon name={isRated ? 'star' : 'star-outline'} size={30} color={isRated ? '#000000' : '#ffffff'} />
                </Pressable>
              </View>

            </View>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original${object.poster}` }} style={styles.poster} />
          </View>
          <Text style={styles.description}>{object.descripcion} </Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16 }}>DETALLES</Text>
          <Text style={styles.label}>Genero</Text>
          {genre && genre.map(item => (
            <Text key={item.id_pGeneros} style={styles.details_label}>{item.genero.nombre}</Text>
          ))}

          <Text style={styles.label}>Productora</Text>
          {producers && producers.map(item => (
            <Text key={item.id_pProductoras} style={styles.details_label}>{item.productora.nombre}</Text>
          ))}
          <Text style={styles.label}>Disponible en:</Text>
          <View style={{ flexDirection: 'row' }}>
            {providers ? (
              providers.map(item => (
                <React.Fragment key={item.id_pProvedores}>
                  {item.provedor.foto ? (
                    <Image source={{ uri: `https://image.tmdb.org/t/p/original${item.provedor.foto}` }} style={styles.distribuitor} />
                  ) : (
                    <Text>No hay imagen disponible</Text>
                  )}
                </React.Fragment>
              ))
            ) : (
              <Text style={styles.details_label}>No disponible aun en algun servicio</Text>
            )}
          </View>
        </View>
      </View>
      <RatingModal id={object.id_pelicula} isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
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
  ratingButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ffffff',
    marginLeft: 10,
    padding: 2,
    paddingLeft: 10,
    alignItems: 'center'
  },
});