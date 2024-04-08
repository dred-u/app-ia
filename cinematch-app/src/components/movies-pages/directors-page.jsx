import React from 'react'
import { Platform, Dimensions, TouchableOpacity, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native'
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

  return (
    <ScrollView contentContainerStyle={styles.director_list}>
      {list.map((director, index) => (
        <TouchableOpacity onPress={() => handlePress(director)} key={index}>
          <ImageBackground source={{ uri: director.foto ? `https://image.tmdb.org/t/p/original${director.foto}` :  '../../../assets/img/user.jpg' }} style={{
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
  }

});