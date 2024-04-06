import {React, useEffect} from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../authContext';

export default function Profile({navigation}) {
  const { isAuthenticated, logout, user} = useAuth(); 

  useEffect(() => {
      navigation.navigate('Login')
  },[isAuthenticated])

  const onSubmit = async () => {
    logout();

  };

  return (
    <View style={styles.container_body}>
      <View style={styles.fy_space}>
        <Text style={styles.title}>Perfil</Text>
        <Icon name='pencil' color='#FEBC14' size={30} style={styles.edit_pencil}></Icon>
      </View>

      <View style={styles.profile_content}>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.logoutButton}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.textLogout}>Cerrar sesión </Text>
        </Pressable>
        <Icon name='logout' color='#ffffff' size={30} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
  },

  fy_space: {
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: '#A2A9B2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
  },

  edit_pencil: {
    marginLeft: 'auto',
    marginRight: 5
  },

  profile_content: {
    paddingVertical: 30,
    marginHorizontal: 20,
    justifyContent:'center',
    alignItems: 'center',
    borderColor: '#A2A9B2',
    borderBottomWidth: 1,
  },
  username:{
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  email: {
    marginTop: 5,
    fontSize: 20,
    color: '#ffffff'
  },
  logoutButton: {
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textLogout: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});