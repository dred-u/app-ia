import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest, updateUser } from "./services/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    // Función para guardar el token y la información del usuario en AsyncStorage
    const saveUserDataToStorage = async (token, userData) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
            console.error('Error al guardar datos en AsyncStorage:', error);
        }
    };

    // MANEJO DE PETICIONES DE AUTENTIFICACION DE USUARIO
    const register = async (data) => {
        try {
            const res = await registerRequest(data);
            setUser(res.data.user);
            setIsAuthenticated(true);
            await saveUserDataToStorage(res.data.token, res.data.user);
        }catch (error) {
            if(Array.isArray(error.response)){
                return setErrors(error.response);
            }
            setErrors([error.response.message]);
        }
    };

    const login = async (data) => {
        try {
            const res = await loginRequest(data);
            setUser(res.data.user);
            setIsAuthenticated(true);
            await saveUserDataToStorage(res.data.token, res.data.user);
        }catch (error) {
            if(Array.isArray(error.response)){
                return setErrors(error.response);
            }
            setErrors([error.response.message]);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userData');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Cargar datos de usuario al iniciar la aplicación
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const userDataString = await AsyncStorage.getItem('userData');
                if (token && userDataString) {
                    const userData = JSON.parse(userDataString);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error al cargar datos de usuario:', error);
            }
        };
        loadUserData();
    }, []);

    const updateProfile = async (id, data) => {
        try {
            const res = await updateUser(id, data);
            setUser(res.data);
        } catch (error) {      
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
      }

    useEffect(() => {
        if(errors.length > 0){
            const timer =setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer) 
        }
    },[errors])

    return (
     <AuthContext.Provider value={{
        register,
        login,
        logout,
        updateProfile,
        setIsAuthenticated,
        user,
        isAuthenticated,
        errors,

     }}>
        {children}
     </AuthContext.Provider>   
    )
}