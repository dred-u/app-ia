import { React, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../authContext';
import Logo from '../components/logo';

export default function Welcome({ navigation }) {
  const { isAuthenticated } = useAuth();

  const onSubmit = async () => {
    navigation.navigate('Login')
  };

  useEffect(() => {
    // Si isAuthenticated es true, redirige a la pantalla de navegación
    if (isAuthenticated) {
      navigation.replace('Navigation'); // Reemplaza la pantalla actual por la pantalla de navegación
    }
  }, [isAuthenticated, navigation]);

  return (
    <ImageBackground source={require('../../assets/lines-bg.webp')} style={styles.background_logo}>
      <Logo />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.textButt}>Comenzar</Text>
        <Icon name="arrow-right" color='white' size={30} />
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background_logo: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#9A0315',
    color: '#ffffff',
    borderRadius: 10,
    width: 180,
    height: 55,
    marginTop: 20,
    padding: 15,

  },
  textButt: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 10
  },
})