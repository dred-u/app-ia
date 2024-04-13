import { React,  useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator } from "react-native";

import Carousel from '../components/carousel';
import Movie_list from '../components/movie-list';

import { items2, items3 } from '../components/carousel-elements';

const PAGE_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  // Verifica si la lista es nula o esta vacia
  if (!items2 || items2.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container_body}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    height: '100%',
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
    height: '100%',
    width: '100%',
  },
});