import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from './screens/Map';
import HomeScreen from './screens/Home';
import SavedRoutesScreen from './screens/SavedRoutes';
import SettingsScreen from './screens/Settings';
import { FontSizeProvider } from './screens/FontSize';
import { RoutesProvider } from './contexts/RoutesContext'; // Import the RoutesProvider

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FontSizeProvider> 
      <RoutesProvider> {/* Wrap the whole app in RoutesProvider */}
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Map') {
                  iconName = focused ? 'location' : 'location-outline';
                } else if (route.name === 'Routes') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Settings') {
                  iconName = 'settings-outline';
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
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RoutesProvider> {/* Close RoutesProvider */}
    </FontSizeProvider>
  );
}
