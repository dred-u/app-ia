import React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import MoviePoster from '../../components/poster-cover'

export default function Movies_page({list}) {
  return (
    <ScrollView contentContainerStyle={styles.movie_list}>
    {list.map((movie, index) => (
      <MoviePoster
        key={index}
        object={movie}
      />
    ))}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    movie_list: {
      marginTop: 20,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: Platform.select({
        web: 'flex-start',
      }),
      paddingBottom: 75,
    }
  });