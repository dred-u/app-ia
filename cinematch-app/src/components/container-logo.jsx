import {React, useCallback } from "react";
import { Platform, StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function ContainerLogo() {

  const [fontsLoaded, fontError] = useFonts({
    'Bungee': require('../../assets/fonts/Bungee-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container_logo} onLayout={onLayoutRootView}>
      <ImageBackground source={require('../../assets/lines-bg.webp')} style={styles.background_logo}>
        <Image source={require('../../assets/cinematch-logo.png')} style={styles.logo} ></Image>
        <Text style={styles.title}>CINEMATCH</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container_logo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9A0315',
    height: 300,
    padding: 0
  },
  background_logo: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'relative',
  },
  logo: {
    top: 30,
    transform: [{ rotate: '-5.9deg' }],
    width: 150,
    height: 150,
    position:'relative',
  },
  title: {
    top: -15,
    fontSize: 45,
    color: '#ffffff',
    fontFamily: Platform.select({
      android: 'Bungee',
      web: 'Bungee'
    }),
  },
})