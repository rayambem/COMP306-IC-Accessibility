import React, { useEffect, useState } from 'react';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert,Animated,useAnimatedValue } from 'react-native';
import * as Location from 'expo-location'; // Properly import Location

import BathroomMarker from './markers/bathroom.js';
import ToggleButton from '../ToggleButton.js'

import allRoutes from '../localStorage/routeData.json';
import pois from '../localStorage/pointsOfIntest.json';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../styles/styles';
import { useFontSize } from './FontSize';
import mapStyles from '../styles/mapStyle.js';

export default function MapScreen({navigation, route}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);

    const [keyLocations, setKeyLocations] = useState(allRoutes[0].keyPoints);
    const [currentInstruction, setCurrentInstruction] = useState(null);
    const [currentLocationID, setCurrentLocationID] = useState(0);
    const [navigationMode, setNavigationMode] = useState(false);

    const [showBathrooms, setShowBathrooms] = useState(true);
    const [showBuildings, setShowBuildings] = useState(true);
    
    const { fontSize, toggleFontSize } = useFontSize();

    const buildingData = [
        { id: 1, name: 'Williams', latitude: 42.42266727826489, longitude: -76.49517372389519 },
        { id: 2, name: 'Park School', latitude: 42.42409393043525, longitude: -76.49499966434016 },
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

    const fetchRoute = function(origin, destination){
        setKeyLocations(allRoutes[0].keyPoints);
        setCurrentInstruction(allRoutes[0].keyPoints[0].instructions)
        setNavigationMode(true);
    }

    const toggleBathrooms = () => {
        setShowBathrooms(!showBathrooms);
    }

    const toggleBuildings = () => {
        setShowBuildings(!showBuildings);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topButtonsContainer}>
                
                <ToggleButton toggleState={showBathrooms} onPress={toggleBathrooms}>
                    <FontAwesome5 name="toilet" size={30} color="white" />
                </ToggleButton>

                <ToggleButton toggleState={showBuildings} onPress={toggleBuildings}>
                    <FontAwesome5 name="building" size={30} color="white" />
                </ToggleButton>
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
				mapType="hybrid"
				// liteMode={true}     // Enable lite mode
            >
                {/*Render POIs (bathrooms only for now, but has multi-catagory support*/}
                {pois != [] ?
                    pois.map((poi) => {
                        
                        //Skip bathrooms when they are hidden
                        if (!showBathrooms && poi.type === "bathroom") {
                            return null;
                        }

                        return(
                        <Marker
                        key={poi.id}
                        coordinate={{ 
                            latitude: poi.coordinates[0], 
                            longitude: poi.coordinates[1]
                        }}
                        zIndex={1}
                        onPress={() => {
                        }}
                    >   
                        {/*TODO: Add support for other POIs*/}

                        <BathroomMarker poi={poi}></BathroomMarker>
                    </Marker>
                    )})
                : null}

                {showBuildings ?
                
                buildingData.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ 
                            latitude: building.latitude, 
                            longitude: building.longitude 
                        }}
                        zIndex={2}
                        // description={`Location of ${building.name}`}
                        onPress={() => {
                            console.log('Marker tapped');
                            origin == null ? setOrigin(building.name) : setDestination(building.name)
                        }}
                    >
                        <View style={styles.markerLabelContainer}>
                            <Text style={[styles.markerLabelText, styles[fontSize]]}>{building.name}</Text>
                        </View>
                    </Marker>
                )):
                null}

               


                {keyLocations != [] ?
                    keyLocations.map((location, id) => (
                        <Marker
                        key={id}
                        coordinate={{ 
                            latitude: location.coordinates[0], 
                            longitude: location.coordinates[1]
                        }}
                        zIndex={1000}
                        onPress={() => {setCurrentInstruction(location.instructions)
                            console.log(currentInstruction)
                        }}
                    >
                    </Marker>
                    ))
                : null}

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