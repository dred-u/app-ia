import {React, useCallback, useEffect} from 'react'
import { Platform, View, StyleSheet, Image, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Logo() {
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
    <View style={styles.content} onLayout={onLayoutRootView}>
        <Image source={require('../../assets/cinematch-logo.png')} style={styles.logo} ></Image>
        <Text style={styles.title}>CINEMATCH</Text>        
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
      },
    logo: {
        top: 30,
        transform: [{ rotate: '-5.9deg' }],
        width: 100,
        height: 100,
        position:'relative',
      },
      title: {
        top: 5,
        fontSize: 30,
        color: '#ffffff',
        fontFamily: Platform.select({
          android: 'Bungee',
          web: 'Bungee'
        }),
      }
  })