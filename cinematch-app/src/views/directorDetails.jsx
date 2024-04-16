import { React, useState, useEffect } from 'react';
import { Dimensions, Platform, SafeAreaView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useMovies } from '../moviesContext';
import { useAuth } from '../authContext';
import Movies_page from '../components/movies-pages/movies-page';
const screenDim = Dimensions.get('window')
let screenWidth = null;
let screenHeight = null;

if (screenDim.width <= 898) {
  screenWidth = 120;
  screenHeight = 180;
}
else {
  screenWidth = 212;
  screenHeight = 318;
}


export default function DirectorDetails({ route }) {
  const { object } = route.params;
  const { user } = useAuth();
  const { getDirMovies, favoriteDirectors, addFavDirector, delFavDirector, directorLike, setDirectorLike } = useMovies();
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favoriteID, setFavoriteID] = useState(null);

  const toggleLike = () => {
    if (isLiked) {
      delFavDirector(favoriteID);
    } else {
      const data = {
        director: object.id_director,
        usuario: user.id
      };
      addFavDirector(data);
    }
    setDirectorLike(!directorLike);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      res = await getDirMovies(object.id_director)
      const moviesArray = res.map(item => item.pelicula);
      setMovies(moviesArray);
    };
    if (favoriteDirectors) {
      for (let i = 0; i < favoriteDirectors.length; i++) {
        if (favoriteDirectors[i].director.id_director === object.id_director) {
          setIsLiked(true);
          setFavoriteID(favoriteDirectors[i].id_fDirectores);
          break;
        }
      }
    }

    fetchData();
  }, [object.id_director]);

  return (
    <SafeAreaView style={styles.content}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name='chevron-left' size={35} color='white' />
      </Pressable>
      <View style={styles.top}>

        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image source={{ uri: object.foto ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${object.foto}` : 'https://image.jimcdn.com/app/cms/image/transf/dimension=640x1024:format=jpg/path/s5044ce942026e8f2/image/ifcd5c51461c2dc3d/version/1628532290/image.jpg'}}
            style={{
              ...styles.image,
              width: Platform.select({
                android: 85.71,
                web: screenWidth
              }),
              height: Platform.select({
                android: 128.57,
                web: screenHeight
              }),
            }}
          />

          <View>
            <Text style={styles.title}>{object.nombre}</Text>
            <Text style={styles.subtitle}>{object.nacionalidad}</Text>
            <Text style={styles.subtitle}>{object.fecha_nacimiento}</Text>
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
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
});

