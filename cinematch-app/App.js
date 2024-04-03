import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageBackground } from 'react-native';

import Login from './src/views/login';
import HomeScreen from './src/views/home';
import Register from './src/views/register';
import Movies from './src/views/movies';
import Favourites from './src/views/favourites';
import Profile from './src/views/profile';
import MovieDetails from './src/views/movieDetails';
import GenreDetails from './src/views/genreDetails';
import DirectorDetails from './src/views/directorDetails';

import Pages_header from './src/components/pages-header';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Movies" component={Movies} options={{ headerShown: false }} />
      <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }} />
      <Stack.Screen name="GenreDetails" component={GenreDetails} options={{ headerShown: false }} />
      <Stack.Screen name="DirectorDetails" component={DirectorDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Pantallas de pestañas
function Navigation() {

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      backBehavior='history'
      screenOptions={{
        title: 'CINEMATCH',
        headerTitleAlign: 'center',
        headerBackground: () => (
          <ImageBackground source={require('./assets/lines-bot.webp')} style={{ backgroundColor: '#9A0315', width: '100%', height: '100%', }}/>
        ),

        headerTitle: () => <Pages_header/>,

        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#9A0315',
          borderRadius: 8,
          borderWidth: 0,
          borderColor: '#9A0315',
          marginLeft: 15,
          marginRight: 15,
          marginTop: -50
        },

        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#A2A9B2',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          margin: 8,
          marginTop: -8
        },

        tabBarBackground: () => (
          <ImageBackground source={require('./assets/lines-bot.webp')} style={{ width: '100%', height: '100%', }}></ImageBackground>
        ),

      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarLabel: 'Listas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="movie-open" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

