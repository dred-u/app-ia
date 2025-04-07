import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm from 'react-native-simple-radio-button';
import { useAuth } from '../authContext';
import { useMovies } from '../moviesContext';

const RatingModal = ({ isVisible, onClose, id }) => {
    const { user } = useAuth();
    const { AddMovieReview } = useMovies();
    const [selectedOption, setSelectedOption] = useState(1);
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar el estado de carga

    var radio_props = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
    ];

    const handlePress = (value) => {
        setSelectedOption(value);
    };
    
    const sendRating = () => {
        setIsLoading(true); // Activar estado de carga
        const data = {
            pelicula: id,
            usuario: user.id,
            rating: selectedOption
          };
          AddMovieReview(data)
          .then(() => {
            setIsSent(true);
          })
          .catch((error) => {
            console.error('Error al enviar la calificación:', error);
          })
          .finally(() => {
            setIsLoading(false); // Desactivar estado de carga después de completar la acción
          });
    };

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.top}>
                    <Text style={styles.title}>Calificar</Text>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Icon name="close" size={25} color="white" />
                    </Pressable>
                </View>
                {!isSent ? (
                    <View style={styles.RadialButtons}>
                        <Text style={styles.textLabel}>¿Te gustó la película? ¡Califícala!</Text>
                        <RadioForm
                            style={{ justifyContent: 'center', marginVertical: 20 }}
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={false}
                            labelStyle={{ color: '#FFFFFF' }}
                            buttonColor={'#FFF0C9'}
                            selectedButtonColor={'#FEBC14'}
                            buttonSize={14}
                            animation={true}
                            onPress={(value) => { handlePress(value) }}
                        />
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#FEBC14" style={{padding: 10}} />
                        ) : (
                            <Pressable onPress={sendRating} style={styles.sendButton}>
                                <Text style={styles.buttonText}>Enviar</Text>
                            </Pressable>
                        )}
                    </View>
                ) : (
                    <View style={styles.thankYouContainer}>
                        <Text style={styles.thankYouText}>¡Gracias por tu calificación!</Text>
                    </View>
                )}
            </View>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
    },
    title:{
        fontSize: 20,
        fontWeight:'500',
        color:'#FEBC14'
    },
    closeButton: {
        marginLeft: 'auto',
        borderColor: '#FFFF',
        borderWidth: 2,
        borderRadius: 4,
    },
    RadialButtons:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLabel:{
        fontSize: 18,
        fontWeight:'400',
        color:'#FFFFFF',
        paddingBottom: 15,
    },
    sendButton: {
        backgroundColor: '#FEBC14',
        borderRadius: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#000000',
        padding: 10,
    },
    thankYouText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginVertical: 40,
    }
});

export default RatingModal;
