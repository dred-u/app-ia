import React from 'react'
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>
          Para ti
        </Text>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
  },

  fy_space:{
    marginTop:40,
    marginLeft:40,

  },

  title:{
    color: '#ffffff',
    fontSize:40,
    fontWeight:'bold',
  },
});