import { React, useEffect, useCallback } from 'react'
import { useFonts } from 'expo-font';
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import ContainerLogo from '../components/container-logo';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Login({ navigation }) {

  const [fontsLoaded, fontError] = useFonts({
    'OpenSans': require('../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onSubmit = async () => {
    navigation.navigate('Navigation')
  };

  return (

    <View style={styles.container_body}>
      <ContainerLogo />
      <View style={styles.content}>

        <View style={styles.text_subtitles}>

        <Text style={{
          fontSize: 40,
          color: '#ffffff',
          fontFamily: Platform.select({
            android: 'OpenSans',
            web: 'OpenSans'
          }),
          fontWeight: '800'
        }}>
          Iniciar Sesión
        </Text>

        <Text style={{
          top: 5,
          fontSize: 15,
          color: '#ffffff',
          fontFamily: Platform.select({
            android: 'OpenSans',
            web: 'OpenSans'
          }),
        }}
        >Por favor inicia sesion para continuar
        </Text>

        </View>

        <View style={styles.text_inputs} >

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.button}>Iniciar sesión</Text>
        </TouchableOpacity>

      </View>


        <TouchableOpacity style={{marginTop:10, flexDirection: 'row', justifyContent:'center'}} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text_register}>¿No tienes una cuenta? </Text>
          <Text style={styles.link}>¡Regístrate!</Text>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
  },

  content: {
    marginTop: 20,
    alignItems: 'center',
  },

  text_subtitles: {
    width:'80%'
  },

  text_inputs: {
    marginTop: 20,
    width:'80%'
  },

  label: {
    marginTop: 10,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize:18,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },

  button:{
    backgroundColor: '#9A0315',
    color: '#ffffff',
    borderRadius: 10,
    width: 180,
    height: 60,
    marginTop: 20,
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text_register:{
    fontSize:15,
    color: '#ffffff',
    textDecorationLine: 'none',
    marginTop: 10,
  },

  link:{
    fontSize:15,
    color: '#FEBC14',
    textDecorationLine: 'underline',
    marginTop: 10,
  },

})