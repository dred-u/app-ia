import { React, useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../authContext';
import { useMovies } from '../moviesContext';
import ProviderModal from '../components/providersModal';

export default function Profile({ navigation }) {
  const { isAuthenticated, logout, user } = useAuth();
  const { getFavoriteProvidersList, providersLike, setProvidersLike, favoriteProviders } = useMovies();
  const [isModalVisible, setModalVisible] = useState(false);

  const providersArray = favoriteProviders ? favoriteProviders.map(item => item.provedor) : [];

  useEffect(() => {
    if (isAuthenticated == false) navigation.navigate('Login')
    getFavoriteProvidersList(user.id)
  }, [isAuthenticated]);

  useEffect(() => {

      if(providersLike == true){
        getFavoriteProvidersList(user.id)
        setProvidersLike(false)
    }
  }, [providersLike]);

  const onSubmit = async () => {
    logout();
  };

  const toggleRating = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Perfil</Text>
        <Icon name='pencil' color='#2E2E2E' size={30} style={styles.edit_pencil}></Icon>
      </View>

      <View style={styles.profile_content}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View  style={{ justifyContent: 'center', alignItems:'center'}}>
      <Pressable
        onPress={toggleRating}
        style={[styles.ratingButton, { backgroundColor: 'rgba(255, 255, 255, 0)' }]}
      >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#ffffff' }}>Mis servicios</Text>
      </Pressable>

        <ScrollView contentContainerStyle={styles.producerList} removeClippedSubviews={true}>
          {providersArray.map((provider, index) => (
            <Pressable key={index}>
              <View style={styles.producerContainer} key={index}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/original${provider.foto}` }} style={styles.image} />
              </View>
            </Pressable >
          ))}

        </ScrollView>
      </View>

      <View style={styles.logoutButton}>
        <Pressable onPress={onSubmit} style={{flexDirection: 'row'}}>
          <Text style={styles.textLogout}>Cerrar sesión </Text>
          <Icon name='logout' color='#ffffff' size={30} />
        </Pressable>
      </View>
      <ProviderModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
  },

  fy_space: {
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: '#A2A9B2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
  },

  edit_pencil: {
    marginLeft: 'auto',
    marginRight: 5
  },

  profile_content: {
    paddingVertical: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A2A9B2',
    borderBottomWidth: 1,
  },
  username: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  email: {
    marginTop: 5,
    fontSize: 20,
    color: '#ffffff'
  },
  logoutButton: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  textLogout: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  producerList: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  producerContainer: {
    width: 80,
    height: 80,
    padding: 2,
    borderRadius: 8,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  ratingButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ffffff',
    padding: 6,
    margin:10,
  },
});