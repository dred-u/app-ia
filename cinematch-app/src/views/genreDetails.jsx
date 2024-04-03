import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GenreDetails = ({ route }) => {
  const { object } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView style={styles.content}>

      <View style={styles.top}>
        <Text style={styles.title}>{object.nombre}</Text>

        <TouchableOpacity onPress={toggleLike} style={styles.icon}>
          <Icon name={isLiked ? 'heart' : 'heart-outline'} size={30} color={isLiked ? 'white' : 'white'} />
        </TouchableOpacity>
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
  top:{
    marginTop: 40,
    paddingBottom:10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2'
  },
  icon:{
    marginLeft:'auto',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  details: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default GenreDetails;
