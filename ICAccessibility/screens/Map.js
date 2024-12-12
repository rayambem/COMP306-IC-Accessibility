import React, { useEffect, useState } from 'react';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location'; // Properly import Location

import allRoutes from '../localStorage/routeData.json';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../styles/styles';

export default function MapScreen({navigation, route}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);

    const [keyLocations, setKeyLocations] = useState(allRoutes[0].keyPoints);
    const [currentInstruction, setCurrentInstruction] = useState(null);
    const [currentLocationID, setCurrentLocationID] = useState(0);
    const [navigationMode, setNavigationMode] = useState(false);

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
				mapType="hybrid"
				// liteMode={true}     // Enable lite mode
            >
                {buildingData.map((building) => (
                    <Marker
                        key={building.id}
                        coordinate={{ 
                            latitude: building.latitude, 
                            longitude: building.longitude 
                        }}
                        // description={`Location of ${building.name}`}
                        onPress={() => {
                            console.log('Marker tapped');
                            origin == null ? setOrigin(building.name) : setDestination(building.name)
                        }}
                    >
                        <View style={styles.markerLabelContainer}>
                            <Text style={styles.markerLabelText}>{building.name}</Text>
                        </View>
                    </Marker>
                ))}

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
                {!navigationMode ?
                    <>
                        <TextInput
                            style={styles.buildingSearchBar}
                            value={origin}
                            placeholder='Search for starting point...'
                        />
                        <TextInput
                            style={styles.buildingSearchBar}
                            value={destination}
                            placeholder='Search for destination...'
                        />
                        <TouchableOpacity style={[styles.goButtonContainer, {marginTop:8}] } activeOpacity={0.9} onPress={() => fetchRoute(origin, destination)}>
                            <Text style={styles.goButton}>
                                GO
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.menuLinks}>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
                                <Text style={{textDecorationLine: 'underline', color: '#013159'}}>Share</Text>
                                <FontAwesome5 name="share" size={14} color="#013159" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
                                <Text style={{textDecorationLine: 'underline', color: '#013159'}}>Print</Text>
                                <MaterialIcons name="local-print-shop" size={18} color="#013159" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', gap: 3, justifyContent: 'center'}} activeOpacity={0.9}>
                                <Text style={{textDecorationLine: 'underline', color: '#013159', height: 20}}>Save</Text>
                                <FontAwesome name="bookmark" size={14} color="#013159" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.fpButtonContainer} activeOpacity={0.9}>
                            <Text style={styles.fpButton}>
                                View Floor Plans
                            </Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <Text>
                            {currentInstruction}
                        </Text>
                        <TouchableOpacity style={styles.fpButtonContainer} activeOpacity={0.9}
                            onPress={() => {
                                setCurrentLocationID(prevID => {
                                    var newID = Math.max(prevID - 1, 0); // Prevent going below 0
                                    if (newID === 0) {
                                        setNavigationMode(false);
                                        newID = 0;
                                    } else {
                                        setCurrentInstruction(keyLocations[newID]?.instructions || '');
                                    }
                                    return newID;
                                });
                            }}
                        >
                            <Text style={styles.fpButton}>
                                {"< Previous"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fpButtonContainer} activeOpacity={0.9}
                            onPress={() => {
                                setCurrentLocationID(prevID => {
                                    var newID = Math.min(prevID + 1, keyLocations.length - 1); // Prevent exceeding the last index
                                    if (newID === keyLocations.length - 1) {
                                        setNavigationMode(false);
                                        newID = 0;
                                    } else {
                                        setCurrentInstruction(keyLocations[newID]?.instructions || '');
                                    }
                                    console.log(newID)
                                    return newID;
                                });
                            }}
                        >
                            <Text style={styles.fpButton}>
                            {"Next >"}
                            </Text>
                        </TouchableOpacity>
                    </>
                    
                    }
			</View>
        </View>
    );
}