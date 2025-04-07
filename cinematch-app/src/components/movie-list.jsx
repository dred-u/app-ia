import React from 'react';
import { Platform, FlatList, Text, View, StyleSheet } from 'react-native';
import MoviePoster from './poster-cover';

export default function MovieList({ list, title }) {
  return (
    <View style={styles.list_body}>
    <Text style={styles.title}>
        {title}
    </Text>
    <FlatList 
      horizontal // Configuración para hacer la lista horizontal
      data={list}
      renderItem={({ item }) => (
        <MoviePoster  object={item} title={item.title} genre={item.genre} imageURL={item.img} />
      )}
      keyExtractor={(item, index) => index.toString()}
      removeClippedSubviews={true}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    list_body: {

    },

    title:{
        color: '#ffffff',
        fontSize: Platform.select({
          web: 30,
          android:20
        }),
        fontWeight:'bold',
        marginTop:20,
        marginBottom:10
      },

});
