import { React, useCallback } from 'react';
import { Platform, StyleSheet, View, Image, Text } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Pages_header() {

    const [fontsLoaded, fontError] = useFonts({
        'Bungee': require('../../assets/fonts/Bungee-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.background_logo} onLayout={onLayoutRootView}>
            <Image source={require('../../assets/cinematch-logo.png')} style={styles.logo} ></Image>
            <Text style={styles.title}>CINEMATCH</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    background_logo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        transform: [{ rotate: '-5.9deg' }],
        width: 40,
        height: 40,
        marginRight: 10
    },
    title: {
        fontSize: 25,
        color: '#ffffff',
        fontFamily: Platform.select({
            android: 'Bungee',
            web: 'Bungee'
        }),
    },
})
