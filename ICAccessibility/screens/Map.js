import React, { useEffect, useState } from 'react';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location'; // Properly import Location

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../styles/styles';
import { useFontSize } from './FontSize';

export default function MapScreen({navigation, route}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);

    const { fontSize, toggleFontSize, mapType } = useFontSize();


    const buildingData = [
        { id: 1, name: 'Williams', latitude: 42.42266727826489, longitude: -76.49517372389519 },
        { id: 2, name: 'Park School', latitude: 42.42409393043525, longitude: -76.49499966434016 },
		// 42.42409393043525, -76.49499966434016
        // Add more buildings here
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Alert.alert('Location Access', 'Permission to access location was denied');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            } catch (error) {
                setErrorMsg('Error getting location: ' + error.message);
                Alert.alert('Location Error', error.message);
            }
        })();
    }, []);


    // Fallback to default location if user location can't be retrieved
    const initialRegion = location 
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
        : {
            latitude: 42.4227,
            longitude: -76.4949,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };


    return (
        
        
        <View style={styles.container}>
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity style={styles.topButton} activeOpacity={0.7}>
                    <FontAwesome5 name="toilet" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton} activeOpacity={0.7}>
                    <FontAwesome5 name="building" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsPointsOfInterest={false}
                showsBuildings={true}
                showsCompass={true}
                showsTraffic={false}
                // showsIndoors={false}
				//mapType="hybrid"
                mapType={mapType}
				// liteMode={true}     // Enable lite mode
            >

                {buildingData.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ 
                            latitude: building.latitude, 
                            longitude: building.longitude 
                        }}
                        title={building.name}
                        description={`Location of ${building.name}`}
                    >
                        <View style={styles.markerLabelContainer}>
                            <Text style={[styles.markerLabelText, styles[fontSize]]}>{building.name}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.bottomMenu}>
				<TextInput
					style={[styles.buildingSearchBar, styles[fontSize]]}
					value={origin}
					placeholder='Search for starting point...'
				/>
				<TextInput
					style={[styles.buildingSearchBar, styles[fontSize]]}
					value={destination}
					placeholder='Search for destination...'
				/>
				<TouchableOpacity style={[styles.goButtonContainer, {marginTop:8}] } activeOpacity={0.9}>
					<Text style={[styles.goButton, styles[fontSize]]}>
						GO
					</Text>
				</TouchableOpacity>

				<View style={styles.menuLinks}>
					<TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
						<Text style={[{textDecorationLine: 'underline', color: '#013159'}, styles[fontSize]]}>Share</Text>
						<FontAwesome5 name="share" size={14} color="#013159" />
					</TouchableOpacity>
					<TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
						<Text style={[{textDecorationLine: 'underline', color: '#013159'}, styles[fontSize]]}>Print</Text>
						<MaterialIcons name="local-print-shop" size={18} color="#013159" />
					</TouchableOpacity>
					<TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
						<Text style={[{textDecorationLine: 'underline', color: '#013159', height: 20}, styles[fontSize]]}>Save</Text>
						<FontAwesome name="bookmark" size={14} color="#013159" />
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={[styles.fpButtonContainer, styles[fontSize]]} activeOpacity={0.9}>
					<Text style={styles.fpButton}>
						View Floor Plans
					</Text>
				</TouchableOpacity>
			</View>
        </View>
    );
}