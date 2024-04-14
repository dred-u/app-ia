import { React, useEffect, useState } from 'react'
import { Platform, Dimensions, TouchableOpacity, Text, ImageBackground, ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenDim = Dimensions.get('window')
let screenWidth = null;
let screenHeight = null;

if (screenDim.width <= 898) {
  screenWidth = 120;
  screenHeight = 180;
}
else {
  screenWidth = 212;
  screenHeight = 318;
}

export default function Directors_page({ list }) {
  const navigation = useNavigation();

  const handlePress = (object) => {
    navigation.navigate('DirectorDetails', { object });
  };

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
        <Text style={styles.errorText}>Aun no hay directores disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.director_list} removeClippedSubviews={true}>
      {list.map((director, index) => (
        <TouchableOpacity onPress={() => handlePress(director)} key={index}>
          <ImageBackground source={{ uri: director.foto ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${director.foto}` : 'https://image.jimcdn.com/app/cms/image/transf/dimension=640x1024:format=jpg/path/s5044ce942026e8f2/image/ifcd5c51461c2dc3d/version/1628532290/image.jpg' }} style={{
            ...styles.image,
            width: Platform.select({
              android: 85.71,
              web: screenWidth
            }),
            height: Platform.select({
              android: 128.57,
              web: screenHeight
            }),
          }}>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={{ paddingTop: 10 }}>
              <Text style={styles.director_name}>{director.nombre}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity >
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  director_list: {
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

  director_name: {
    color: 'white',
    fontSize: Platform.select({
      android: 12
    }),
    fontWeight: 'bold'
  },

  image: {
    margin: 1,
    justifyContent: 'flex-end',
    borderRadius: 80,
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