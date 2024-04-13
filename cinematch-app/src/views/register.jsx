import { React, useEffect, useState } from 'react'
import { Platform, StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import ContainerLogo from '../components/container-logo';
import { useAuth } from "../authContext"

export default function Register({ navigation }) {

  //MANEJO DE PETICION DE REGISTRO
  const { register, isAuthenticated, errors } = useAuth(); 
  const [formErrors, setFormErrors] = useState({}); // Guardar errores
  const [showErrors, setShowErrors] = useState(false);

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    //validar los campos antes de enviarlos
    const isValidForm = () => {
      const errors = {};
    
      if (!formValues.username) {
        errors.username = '¡El nombre de usuario es requerido!';
      }
    
      if (!formValues.email) {
        errors.email = '¡El correo es requerido!';
      }
    
      if (!formValues.password) {
        errors.password = '¡La contraseña es requerida!';
      } else if (formValues.password.length < 6) {
        errors.password = '¡La contraseña debe ser mayor a 6 caracteres!';
      }
    
      setFormErrors(errors);
    
      if (Object.keys(errors).length > 0) {
        setShowErrors(true);
        setTimeout(() => {
          setShowErrors(false);
        }, 2500);
      }
    
      return Object.keys(errors).length === 0;
    };

    useEffect(() => {
      if (isAuthenticated) navigation.navigate('Navigation') //Aqui se viaja a la pantalla de Inicio
      setFormValues({
        username: "",
        email: "",
        password: "",
      });
    },[isAuthenticated])
  
    const onSubmit = async () => {
      if(isValidForm()){
        register(formValues)
      }
    };

  return (
    <View style={styles.container_body}>
      <ContainerLogo />
      <View style={styles.content}>
        {
          errors.map((error,i) => (<Text style = {styles.error_message} key={i}>
            {error}    
          </Text>))
        }
        <View style={styles.text_subtitles}>
        <Text style={{ fontSize: 40, color: '#ffffff', fontWeight: '800'}}>
          Registrarse
        </Text>

        <Text style={{ top: 5, fontSize: 15, color: '#ffffff'}}>
          Por favor registrate para continuar
        </Text>
        </View>

        <View style={styles.text_inputs}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder={showErrors ? formErrors.username:''} 
            value={formValues.username}
            onChangeText={(text) => handleInputChange('username', text)}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder={showErrors ? formErrors.email:''} 
            value={formValues.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />       

          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder={showErrors ? formErrors.password:''} 
            secureTextEntry
            value={formValues.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
        </View>

        <Pressable onPress={onSubmit}>
          <Text style={styles.button}>Registrarse</Text>
        </Pressable>

      </View>
        <Pressable style={{marginTop:10, flexDirection: 'row', justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text_register}>¿Ya tienes una cuenta? </Text>
          <Text style={styles.link}>¡Inicia sesion!</Text>
        </Pressable>  
    </View>
  );
}

const styles = StyleSheet.create({
  container_body: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    height: '100%',
  },

  content: {
    marginTop: 20,
    alignItems: 'center',
  },

  text_subtitles: {
    width:'80%'
  },

  text_inputs: {
    marginTop: 20,
    width:'80%'
  },

  label: {
    marginTop: 10,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize:18,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  button:{
    backgroundColor: '#9A0315',
    color: '#ffffff',
    borderRadius: 10,
    width: 180,
    height: 60,
    marginTop: 20,
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text_register:{
    fontSize:15,
    color: '#ffffff',
    textDecorationLine: 'none',
    marginTop: 10,
  },

  link:{
    fontSize:15,
    color: '#FEBC14',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  validations:{
    color:'red', 
    fontSize:16, 
    display: "flex",
    flexDirection: "row", // Establece la dirección a "row"
    flexWrap: "wrap",
},

})