import React, { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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


export default DirectorDetails = ({ route }) => {
  const { object } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView style={styles.content}>

      <View style={styles.top}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/original${object.foto}` }}
            style={{
              ...styles.image,
              width: Platform.select({
                android: 85.71,
                web: screenWidth
              }),
              height: Platform.select({
                android: 128.57,
                web: screenHeight
              }),
            }}
          />

          <Text style={styles.title}>{object.nombre}</Text>      
          <TouchableOpacity onPress={toggleLike} style={styles.icon}>
            <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color={isLiked ? 'white' : 'white'} />
          </TouchableOpacity>
        </View>
        <Text>{object.nacionalidad}</Text>
        <Text>{object.fecha_nacimiento}</Text>
        <Text>{object.biografia}</Text>

      </View>

      <View style={styles.details}>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
    padding: 40,
  },
  top: {
    marginTop: 40,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2'
  },
  icon: {
    marginLeft: 'auto',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  image: {
    margin: 1,
    justifyContent: 'flex-end',
    borderRadius: 8,
  },

  details: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

