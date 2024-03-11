import React from 'react'
import { Platform, ScrollView ,View, Text, StyleSheet } from 'react-native'
import MoviePoster from '../components/poster-cover';

export default function Favourites() {
  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Favoritas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.movie_list}>
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
      </ScrollView>

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
  },

  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
  },

  movie_list: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: Platform.select({
      web: 'flex-start',

    }),

  }
});