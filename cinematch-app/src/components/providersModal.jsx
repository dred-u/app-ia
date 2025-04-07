import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import { useAuth } from '../authContext';
import { useMovies } from '../moviesContext';

const ProviderModal = ({ isVisible, onClose }) => {
    const { user } = useAuth();
    const { providers, addFavProvider, delFavProvider, setProvidersLike, favoriteProviders } = useMovies();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [unselectedOptions, setUnselectedOptions] = useState([]);
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (favoriteProviders) {
            const selectedProviderIds = favoriteProviders.map(provider => provider.provedor.id_provedor);
            setSelectedOptions(selectedProviderIds);
        }
    }, [favoriteProviders]);

    const handleCheckBoxToggle = (id_provedor) => {
        const isSelected = selectedOptions.includes(id_provedor);
        const isProviderInFavorite = favoriteProviders && favoriteProviders.some(provider => provider.provedor.id_provedor === id_provedor);

        if (!isSelected && !isProviderInFavorite) {
            setSelectedOptions([...selectedOptions, id_provedor]);
        } else if (isSelected) {
            const providerToRemoveId = favoriteProviders && favoriteProviders.find(provider => provider.provedor.id_provedor === id_provedor).id_fProvedores;
            setUnselectedOptions([...unselectedOptions, providerToRemoveId]);
            setSelectedOptions(selectedOptions.filter(providerId => providerId !== id_provedor));
        }
    };

    const sendList = () => {
        setIsLoading(true);
        const selectedProvidersToSend = selectedOptions.filter(providerId => !favoriteProviders || !favoriteProviders.some(provider => provider.provedor.id_provedor === providerId));
        const unselectedProvidersToSend = unselectedOptions;
        const promises = [];

        selectedProvidersToSend.forEach(providerId => {
            const data = {
                provedor: providerId,
                usuario: user.id
            };
            promises.push(addFavProvider(data));
        });

        unselectedProvidersToSend.forEach(providerId => {
            promises.push(delFavProvider(providerId));
        });

        Promise.all(promises)
            .then(() => {
                setIsSent(true);
                setProvidersLike(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!isVisible) {
            setSelectedOptions([]);
            setUnselectedOptions([]);
            setIsSent(false);
            setIsLoading(false);
        } else if (favoriteProviders) {
            const selectedProviderIds = favoriteProviders.map(provider => provider.provedor.id_provedor);
            setSelectedOptions(selectedProviderIds);
        }
    }, [isVisible, favoriteProviders]);

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
                        <Text style={styles.title}>Mis servicios</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Icon name="close" size={25} color="white" />
                        </Pressable>
                    </View>
                    {!isSent ? (
                        <ScrollView style={styles.scrollView}>
                            {providers.map(provider => (
                                <CheckBox
                                    key={provider.id_provedor}
                                    title={provider.nombre}
                                    checked={selectedOptions.includes(provider.id_provedor)}
                                    onPress={() => handleCheckBoxToggle(provider.id_provedor)}
                                    containerStyle={styles.checkBoxContainer}
                                    textStyle={styles.checkBoxText}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.thankYouContainer}>
                            <Text style={styles.thankYouText}>¡Gracias por tu calificación!</Text>
                        </View>
                    )}
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#FEBC14" style={{ padding: 10 }} />
                    ) : (
                        <Pressable onPress={sendList} style={styles.sendButton}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </Pressable>
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
        maxHeight: '80%',
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FEBC14'
    },
    closeButton: {
        marginLeft: 'auto',
        borderColor: '#FFFF',
        borderWidth: 2,
        borderRadius: 4,
    },
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
    },
    checkBoxText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    sendButton: {
        backgroundColor: '#FEBC14',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',

    },
    thankYouText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginVertical: 40,
    }
});

export default ProviderModal;
