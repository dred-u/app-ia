import { React, useEffect, useState } from 'react'
import { Dimensions, View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width * 0.39;

export default function Producer_page({ list }) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const handlePress = (object) => {
        navigation.navigate('ProducersDetails', { object });
    };

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
                <Text style={styles.errorText}>Aun no hay productoras disponibles</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.producer_list} removeClippedSubviews={true}>
            {list.map((producer, index) => (
                <Pressable onPress={() => handlePress(producer)} key={index}>
                <View key={index} style={styles.container}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/original${producer.logo}` }} style={styles.image} />

                </View>
                </Pressable >
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
        paddingBottom: 75,
        justifyContent: 'center',
    },
    container: {
        width: PAGE_WIDTH,
        height: 150,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        justifyContent: 'flex-end',
        resizeMode: 'contain',
        width: '100%',
        height: '95%',
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