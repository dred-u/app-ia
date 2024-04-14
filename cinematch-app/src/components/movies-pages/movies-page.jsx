import { React, useEffect, useState } from 'react'
import { Platform, ScrollView, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import MoviePoster from '../../components/poster-cover'

export default function Movies_page({ list }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!list) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [list]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!list || list.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aun no hay películas disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.movie_list} removeClippedSubviews={true}>
      {list.map((movie, index) => (
        <MoviePoster
          key={index}
          object={movie}
        />
      ))}
    </ScrollView>
  );
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
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ffffff',
  },
});