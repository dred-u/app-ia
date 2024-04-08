import React from 'react';
import { TouchableOpacity, Platform, Dimensions, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width * 0.4;

export default function Genre_page({ list }) {
    const navigation = useNavigation();
    
    // Función para generar un color aleatorio en formato RGB
    const getRandomColor = () => {
        // Elegir aleatoriamente entre las dos opciones
        const option = Math.random() < 0.5 ? 1 : 2;
    
        let r, g, b;
    
        if (option === 1) {
            // Opción 1: Verde siempre es 0, azul puede variar hasta 255
            r = Math.floor(Math.random() * (235 - 200)) + 200;
            g = 0;
            b = Math.floor(Math.random() * 100);
        } else {
            // Opción 2: Azul siempre es 0, verde puede variar hasta 255
            r = Math.floor(Math.random() * (255 - 220)) + 220;
            g = Math.floor(Math.random() * 255);
            b = 0;
        }
    
        return `rgb(${r},${g},${b})`;
    };

    const handlePress = (object) => {
        navigation.navigate('GenreDetails', { object });
      };

    return (
        <ScrollView contentContainerStyle={styles.genre_list}>
            {list.map((genre, index) => {
                const color1 = getRandomColor();
                let color2;
                do {
                    color2 = getRandomColor();
                } while (color1 === color2); // Asegura que color1 y color2 sean diferentes
                return (
                    <TouchableOpacity onPress={() => handlePress(genre)} key={index}>
                    <LinearGradient
                        colors={[color1, color2]}
                        style={[styles.container]}
                    >
                        <Text style={styles.title}>{genre.nombre}</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    genre_list: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: Platform.select({ web: 'center' }),
        paddingBottom: 75,
    },
    container: {
        width: PAGE_WIDTH,
        height: 100,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
});
