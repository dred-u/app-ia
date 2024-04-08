import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Dimensions, ScrollView, StyleSheet, View, Text, Platform } from "react-native";

import Carousel from '../components/carousel'; 
import Movie_list from '../components/movie-list'; 

import { items2, items3 } from '../components/carousel-elements';

const PAGE_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container_body}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={styles.fy_space}>
          <Text style={styles.title}>
            Para ti
          </Text>

          <View style={styles.carousel_container}>
            <Carousel list={items2} />
            <Movie_list list={items3} title={"Recomendadas"} />
            <Movie_list list={items2} title={"De tus generos favoritos"} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    height:'100%',
    width: '100%',
  },

  fy_space: {
    marginTop: 20,
    marginLeft: 40,
    height: Platform.select({
      android: PAGE_HEIGHT,
      web: '100%'
    })
  },

  title: {
    color: '#ffffff',
    fontSize: Platform.select({
      web: 40,
      android: 30
    }),
    fontWeight: 'bold',
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width: '100%',
  },
});