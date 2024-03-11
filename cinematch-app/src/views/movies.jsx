import React from 'react'
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native'
import MoviePoster from '../components/poster-cover';

export default function Movies() {
  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Peliculas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.movie_list}>
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
     
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />
        <MoviePoster title={'Oppenheimer'} genre={'Drama'} imageURL={'ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg'} />
        <MoviePoster title={'La La Land'} genre={'Musical'} imageURL={'uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'} />
        <MoviePoster title={'Dune: Part II'} genre={'Ciencia Ficcion'} imageURL={'6xdxVDJSr9T8TSt90Hr1VQmfWwl.jpg'} />
        <MoviePoster title={'Madame Web'} genre={'Accion'} imageURL={'8enikn5rdpsVyQd1qnpOqpACZqO.jpg'} />
        <MoviePoster title={'Poor Things'} genre={'Fantasia'} imageURL={'xbfzQ7Q7qmDUf50eZH8C57Ygx6n.jpg'} />







      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    flex:1
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
      web: 'space-between',
    }),
    paddingBottom: 75,
  }
});