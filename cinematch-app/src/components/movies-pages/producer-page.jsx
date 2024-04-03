import React from 'react'
import { Platform, Dimensions, View, Text, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const PAGE_WIDTH = Dimensions.get('window').width * 0.9;

export default function Producer_page({ list }) {
    const directores = list[0].rows;

    return (
        <ScrollView contentContainerStyle={styles.producer_list}>
            {directores.map((producer, index) => (
               
                    <View key={index} style={styles.container}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/original${producer.logo}` }} style={styles.image} />
                        <Text style={{color:'white'}}>{producer.nombre}</Text>
                    </View>
               
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    producer_list: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: Platform.select({web:'center'}),
        paddingBottom: 75,
    },

    container: {
        width: PAGE_WIDTH,
        height: 200,
        padding: 10,
        marginVertical: 10,
        borderRadius:8,
        backgroundColor: '#FFFFFF',
    },

    image: {
        justifyContent: 'flex-end',
        resizeMode: 'contain',
        width: '100%',
        height: '95%',
    }

});