import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from './Map'
import HomeScreen from './home';


const SavedRoutesScreen = () => {
  <Text>ROUTES</Text>
}

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home' : 'home-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Routes') {
              iconName = focused ? 'list' : 'list-outline';
            }
  
           return <Icon name={iconName} size={size} color={color} />;
          },
	tabBarActiveTintColor: 'royalblue',
   	tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarStyle: { position: 'absolute', backgroundColor: 'black' },
        })}
>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Routes" component={SavedRoutesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',

  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'space-between',   //if removed, lots of space below the go button.
    
  },
  header: {
    width: '100%',
    padding: 15,
    paddingTop: 50,
    backgroundColor: 'rgba(31, 31, 31, 0.7)',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
    width: '90%',
    justifyContent: 'space-between',   
  },
  noticeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  noticeCount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'rgba(237, 237, 237, 0.8)',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    marginVertical: 5,
    
    
  },
  formLabel: {
    fontSize: 14,
    color: '#333333',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginTop: 5,
  },
  goButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 80,
    
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#1F1F1F',
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  navBar: {
    backgroundColor: '#000000',
    width: '100',
    height: '100',
  }
});


