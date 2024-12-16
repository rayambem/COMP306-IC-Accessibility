import React, { useEffect, useState } from 'react';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location'; 

import BathroomMarker from './markers/bathroom.js';
import ToggleButton from '../ToggleButton.js';

import allRoutes from '../localStorage/routeData.json';
import pois from '../localStorage/pointsOfIntest.json';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../styles/global.js';
import { useFontSize } from './FontSize';
import mapStyles from '../styles/mapStyle.js';

export default function MapScreen({ navigation, route }) {
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

    let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

    const [buildings, setBuildings] = useState([
        { label: 'Williams', value: 'Williams' },
        { label: 'Park School', value: 'Park School' },
    ]);
    
    const { fontSize, toggleFontSize } = useFontSize();

    const buildingData = [
        { id: 1, name: 'Williams', latitude: 42.42266727826489, longitude: -76.49517372389519 },
        { id: 2, name: 'Park School', latitude: 42.42409393043525, longitude: -76.49499966434016 },
    ];
    
    const [originOpen, setOriginOpen] = useState(false);
    const [destinationOpen, setDestinationOpen] = useState(false);

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
            <View style={mapStyles.topButtonsContainer}>
                
                <ToggleButton toggleState={showBathrooms} onPress={toggleBathrooms}>
                    <FontAwesome5 name="toilet" size={30} color="white" />
                </ToggleButton>

                <ToggleButton toggleState={showBuildings} onPress={toggleBuildings}>
                    <FontAwesome5 name="building" size={30} color="white" />
                </ToggleButton>
            </View>
            <MapView
                style={mapStyles.map}
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
                        <View style={mapStyles.markerLabelContainer}>
                            <Text style={[mapStyles.markerLabelText, styles[fontSize]]}>{building.name}</Text>
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

            <View style={mapStyles.bottomMenu}>
            {!navigationMode ? (
                <>
                    {/* Non-Navigation Mode */}
                    <DropDownPicker
                        open={originOpen}
                        value={origin}
                        items={buildings}
                        setOpen={setOriginOpen}
                        setValue={setOrigin}
                        setItems={setBuildings}
                        placeholder="Select starting point"
                        style={[mapStyles.dropdown, { zIndex: originOpen ? 1000 : 1 }]}
                        containerStyle={{ zIndex: originOpen ? 1000 : 1 }}
                        textStyle={{ fontSize: fontSize === 'large' ? 18 : 14 }}
                    />

                    <DropDownPicker
                        open={destinationOpen}
                        value={destination}
                        items={buildings}
                        setOpen={setDestinationOpen}
                        setValue={setDestination}
                        setItems={setBuildings}
                        placeholder="Select destination"
                        style={[mapStyles.dropdown, { zIndex: destinationOpen ? 1000 : 1 }]}
                        containerStyle={{ zIndex: destinationOpen ? 1000 : 1 }}
                        textStyle={{ fontSize: fontSize === 'large' ? 18 : 14 }}
                    />

                    <View style={mapStyles.menuLinks}>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', gap: 3, justifyContent: 'center' }}
                            activeOpacity={0.9}
                            onPress={() => {
                                setOrigin(null);
                                setDestination(null);
                            }}
                        >
                            <Text style={[{ textDecorationLine: 'underline', color: '#013159' }, styles[fontSize]]}>
                                Clear selections
                            </Text>
                            <Feather name="x" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', gap: 3, justifyContent: 'center' }} activeOpacity={0.9}>
                            <Text style={[{ textDecorationLine: 'underline', color: '#013159', height: 20 }, styles[fontSize]]}>
                                Save
                            </Text>
                            <FontAwesome name="bookmark" size={14} color="#013159" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.goButtonContainer, { marginTop: 0 }]}
                        activeOpacity={0.9}
                        onPress={() => {
                            if (origin && destination) {
                                fetchRoute(origin, destination);
                            } else {
                                Alert.alert('Error', 'Please select both origin and destination');
                            }
                        }}
                    >
                        <Text style={[styles.goButtonText]}>GO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[mapStyles.fpButtonContainer, styles[fontSize]]} activeOpacity={0.9}>
                        <Text style={mapStyles.fpButton}>View Floor Plans</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {/* Navigation Mode */}
                    <Text>{currentInstruction}</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <TouchableOpacity
                            style={[mapStyles.fpButtonContainer, styles[fontSize], {width: 100}]}
                            activeOpacity={0.9}
                            onPress={() => {
                                setCurrentLocationID((prevID) => {
                                    const newID = Math.max(prevID - 1, 0);
                                    setCurrentInstruction(keyLocations[newID]?.instructions || '');
                                    if (newID === 0) setNavigationMode(false);
                                    return newID;
                                });
                            }}
                        >
                            <Text style={mapStyles.fpButton}>{"< Previous"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[mapStyles.fpButtonContainer, styles[fontSize], {width: 100}]}
                            activeOpacity={0.9}
                            onPress={() => {
                                setCurrentLocationID((prevID) => {
                                    const newID = Math.min(prevID + 1, keyLocations.length - 1);
                                    setCurrentInstruction(keyLocations[newID]?.instructions || '');
                                    if (newID === keyLocations.length - 1) setNavigationMode(false);
                                    return newID;
                                });
                            }}
                        >
                            <Text style={mapStyles.fpButton}>{"Next >"}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>

    </View>
);
}
