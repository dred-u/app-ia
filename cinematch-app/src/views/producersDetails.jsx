import { React, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';
import Movies_page from '../components/movies-pages/movies-page';
let screenWidth = 180;
let screenHeight = 180;

export default function ProducersDetails({ route }) {
  const { object } = route.params;
  const { user } = useAuth();
  const { getProdMovies, favoriteProducers, addFavProducer, delFavProducer, producerLike, setProducerLike } = useMovies();
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favoriteID, setFavoriteID] = useState(null);

  const toggleLike = () => {
    if (isLiked) {
      delFavProducer(favoriteID);
    } else {
      const data = {
        productora: object.id_productora,
        usuario: user.id
      };
      addFavProducer(data);
    }
    setProducerLike(!producerLike)
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      res = await getProdMovies(object.id_productora)
      const moviesArray = res.map(item => item.pelicula);
      setMovies(moviesArray);
    };

    if (favoriteProducers) {
      for (let i = 0; i < favoriteProducers.length; i++) {
        if (favoriteProducers[i].productora.id_productora === object.id_productora) {
          setIsLiked(true);
          setFavoriteID(favoriteProducers[i].id_fProductoras);
          break;
        }
      }
    }

    fetchData();
  }, [object.id_productora]);

  return (
    <SafeAreaView style={styles.content}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name='chevron-left' size={35} color='white' />
      </Pressable>

      <View style={styles.top}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ width: screenWidth, height: screenHeight, padding:10, backgroundColor:'#fff', borderRadius: 8,}}>
            <Image source={{ uri: object.logo ? `https://image.tmdb.org/t/p/original${object.logo}` : 'https://i.imgur.com/ItcIhaa.jpeg' }}
              style={styles.image}
            />
          </View>
          <View>
          </View>

          <Pressable onPress={toggleLike} style={styles.icon}>
            <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color={isLiked ? 'white' : 'white'} />
          </Pressable>
        </View>
      </View>
      <Movies_page list={movies} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#2E2E2E',
    height: '100%',
  },
  top: {
    paddingBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2'
  },
  backButton: {
    borderRadius: 10,
    marginRight: 'auto',
    marginTop: 30,
    marginLeft: 10,
  },
  icon: {
    paddingTop: 10
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    backgroundColor: '#FFFF',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

