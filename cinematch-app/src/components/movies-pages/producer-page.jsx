import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width * 0.39;

export default function ProducerPage({ list }) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducers, setFilteredProducers] = useState([]);

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
            setFilteredProducers(list);
        }
    }, [list]);

    // Filtrar productoras cuando el término de búsqueda cambia
    useEffect(() => {
        if (searchTerm.trim() === '') {
            // Si no hay término de búsqueda, mostramos todas las productoras
            setFilteredProducers(list);
        } else {
            // Filtramos las productoras según el término de búsqueda
            const filtered = list.filter(producer =>
                producer.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducers(filtered);
        }
    }, [searchTerm, list]);


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
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar productoras..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <ScrollView contentContainerStyle={styles.producerList} removeClippedSubviews={true}>
                {filteredProducers.map((producer, index) => (
                    <Pressable onPress={() => handlePress(producer)} key={index}>
                        <View style={styles.producerContainer} key={index}>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/original${producer.logo}` }} style={styles.image} />
                        </View>
                    </Pressable >
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    producerList: {
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 75,
        justifyContent: 'center',
    },
    searchInput: {
        padding: 8,
        margin: 8,
        marginHorizontal: 20,
        backgroundColor: '#fff',

        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
    },
    producerContainer: {
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
