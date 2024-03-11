import React from 'react'
import {Platform, View, ImageBackground, Text, StyleSheet, Link, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function MoviePoster({ imageURL, title, genre }) {

    const screenDim = Dimensions.get('window')
    let screenWidth = null;
    let screenHeight = null;

    if (screenDim.width <= 898){
        screenWidth = 120;
        screenHeight = 180;
    }
    else {
        screenWidth = 212;
        screenHeight =318;
    }


    return (
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original/${imageURL}` }} style={{...styles.poster,
            width: Platform.select({
                android: 85.71,
                web: screenWidth
            }), 
            height: Platform.select({
                android: 128.57,
                web: screenHeight
            }),
        }}>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={{paddingTop:15}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{genre}</Text>
            </LinearGradient>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    poster: {
        margin: 1,
        justifyContent: 'flex-end',
    },

    text_container: {
        backgroundColor:'#000000', 
    },

    title: {
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize: Platform.select({
            android:12
        })
    },

    subtitle: {
        color: '#FEBC14',
        fontWeight: 'bold',
        fontSize: Platform.select({
            android:11
        })
    }
});