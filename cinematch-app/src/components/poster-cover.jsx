import React from 'react'
import { Platform, TouchableOpacity, ImageBackground, Text, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function MoviePoster({ object }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('MovieDetails', { object });
      };

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


    return (
        <TouchableOpacity onPress={handlePress}>
            <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original${object.img}` }} style={{
                ...styles.poster,
                width: Platform.select({
                    android: 85.71,
                    web: screenWidth
                }),
                height: Platform.select({
                    android: 128.57,
                    web: screenHeight
                }),
            }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={{ paddingTop: 15 }}>
                    <Text style={styles.title} numberOfLines={2}>{object.title}</Text>
                    <Text style={styles.subtitle}>{object.genre}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    poster: {
        margin: 1,
        justifyContent: 'flex-end',
    },

    text_container: {
        backgroundColor: '#000000',
    },

    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: Platform.select({
            android: 12
        })
    },

    subtitle: {
        color: '#FEBC14',
        fontWeight: 'bold',
        fontSize: Platform.select({
            android: 11
        })
    }
});