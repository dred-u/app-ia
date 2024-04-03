import { React } from 'react'
import { Dimensions, ScrollView, StyleSheet, View, Text, Platform } from "react-native";

import Carousel from '../components/carousel'; 
import Movie_list from '../components/movie-list'; 

import { items, items2, items3 } from '../components/carousel-elements';

const PAGE_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {

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
  )
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
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
});