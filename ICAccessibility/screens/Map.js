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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoutes } from '../contexts/RoutesContext.js';

import styles from '../styles/global.js';
import { useFontSize } from './FontSize.js';
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
        { label: 'Williams (Starting point)', value: 'Williams' },
        { label: 'Park School (Destination)', value: 'Park School' },
    ]);
    
    const { fontSize, toggleFontSize, mapType } = useFontSize();

    const buildingData = [
        { id: 1, name: 'Williams', location: [42.42266727826489, -76.49517372389519] },
        { id: 2, name: 'Park School', location: [42.42409393043525, -76.49499966434016] },
        { id: 3,  name: 'Center for Natural Sciences', location: [42.423355,-76.495429]},
        { id: 4,  name: 'Campus Center', location: [42.4223792,-76.4941679]},
        { id: 5,  name: 'Hammond Health Center', location: [42.4230498,-76.4937854]},
        { id: 6,  name: 'Muller', location: [42.4219757,-76.4957186]},
        { id: 7,  name: 'Textor', location: [42.4218214,-76.4961915]},
        { id: 8,  name: 'Friends', location: [42.4218123,-76.4967748]},
        { id: 9,  name: 'Park Business Center', location: [42.4220959,-76.4971005]},
        { id: 10,  name: 'Job', location: [42.421573,-76.4972152]},
        { id: 11,  name: 'Dillingham', location: [42.4211253,-76.4983049]},
        { id: 12,  name: 'Peggy Ryan Williams Center', location: [42.4217572,-76.4987242]},
        { id: 13,  name: 'Smitty', location: [42.4203551,-76.4984903]},
        { id: 14,  name: 'Center for Health Sciences', location: [42.4201203,-76.4979585]},
        { id: 15,  name: 'Hill Center', location: [42.4205384,-76.4970762]},
        { id: 16,  name: 'Whalen', location: [42.4210833,-76.4960277]},
        { id: 17,  name: 'Gannett', location: [42.4212466,-76.4950494]},
        { id: 18,  name: 'East Tower', location: [42.4206719,-76.4939682]},
        { id: 19,  name: 'Tower Concourse', location: [42.4206278,-76.4944864]},
        { id: 20,  name: 'West Tower', location: [42.4204983,-76.4950578]},
        { id: 21,  name: 'Holmes', location: [42.4212331,-76.4938355]},
        { id: 22,  name: 'Tallcott', location: [42.4212768,-76.4930033]},
        { id: 23,  name: 'Rowland', location: [42.4214322,-76.4922503]},
        { id: 24,  name: 'Hilliard', location: [42.4219268,-76.4925334]},
        { id: 25,  name: 'Hood', location: [42.4217634,-76.4933581]},
        { id: 26,  name: 'Fitness Center', location: [42.4225327,-76.4923509]},
        { id: 27,  name: 'A&E Center', location: [42.422893,-76.4902083]},
        { id: 28,  name: 'Hilliard', location: [42.4219268,-76.4925334]},
        { id: 29,  name: 'Hood', location: [42.4217634,-76.4933581]},
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

    const fetchRoute = function(origin, destination) {
        const route = allRoutes.find(route => route.origin === origin && route.destination === destination);
        
        if (route) {
            setKeyLocations(route.keyPoints);
            setCurrentInstruction(route.keyPoints[0].instructions);
            setNavigationMode(true);
        } else {
            Alert.alert('Error', 'Route not found. Please ensure the origin and destination are correct.');
        }
    }

    const { addRoute } = useRoutes();

    const saveRoute = async (origin, destination) => {
        try {
            const fullRouteDetails = allRoutes.find(
                r => r.origin === origin && r.destination === destination
            );

            if (!fullRouteDetails) {
                Alert.alert('Error', 'Route details not found');
                return;
            }

            const newRoute = { 
                id: Date.now(), 
                ...fullRouteDetails,
                savedDate: new Date().toLocaleDateString() 
            }; 

            addRoute(newRoute);

            Alert.alert('Route Saved', 'Your route has been successfully saved.');
        } catch (error) {
            Alert.alert('Error', 'An error occurred while saving the route.');
            console.error(error);
        }
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
                mapType={mapType}
                // liteMode={true}
            >
            
            {navigationMode &&
                keyLocations.map((location, id) => (
                    <Marker
                        key={id}
                        coordinate={{
                            latitude: location.coordinates[0],
                            longitude: location.coordinates[1],
                        }}
                        onPress={() => {
                            setCurrentInstruction(location.instructions);
                            setCurrentLocationID(id);
                        }}
                        icon={null}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                            <FontAwesome5
                                name="map-pin"
                                size={currentLocationID === id ? 50 : 30}
                                color={currentLocationID === id ? (mapType !== "satellite" ? "blue" : "yellow") : 'red'}
                            />
                        </View>
                    </Marker>
                ))
            }

                {!navigationMode &&
                    pois.map((poi) => {
                        // Skip bathrooms when they are hidden
                        if (!showBathrooms && poi.type === 'bathroom') {
                            return null;
                        }

                        return (
                            <Marker
                                key={poi.id}
                                coordinate={{
                                    latitude: poi.coordinates[0],
                                    longitude: poi.coordinates[1],
                                }}
                                zIndex={1}
                                onPress={() => {}}
                            >
                                <BathroomMarker poi={poi} />
                            </Marker>
                        );
                    })}

                {/* Render buildings only when navigationMode is false */}
                {!navigationMode &&
                    showBuildings &&
                    buildingData.map((building) => (
                        <Marker
                        key={building.id}
                        coordinate={{ 
                            latitude: building.location[0], 
                            longitude: building.location[1] 
                        }}
                        zIndex={2}
                        // description={`Location of ${building.name}`}
                        onPress={() => {
                            console.log('Marker tapped');
                            origin == null ? setOrigin(building.name) : setDestination(building.name)
                        }}
                    >
                        <View style={mapStyles.markerLabelContainer}>
                            <Text style={[mapStyles.markerLabelText, {fontSize: fontSize === 'Large' ? 20 : 14}]}>{building.name}</Text>
                        </View>
                    </Marker>
                    ))}
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
                        textStyle={{ fontSize: fontSize === 'Large' ? 18 : 14 }}
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
                        textStyle={{ fontSize: fontSize === 'Large' ? 18 : 14 }}
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
                            <Text style={[{ textDecorationLine: 'underline', color: '#013159' }, {fontSize: fontSize === 'Large' ? 18 : 14}]}>
                                Clear selections
                            </Text>
                            <Feather name="x" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', gap: 3, justifyContent: 'center' }}
                            activeOpacity={0.9}
                            onPress={() => {
                                if (origin && destination) {
                                    saveRoute(origin, destination);
                                } else {
                                    Alert.alert('Error', 'Please select both origin and destination');
                                }
                            }}
                        >
                            <Text style={[{ textDecorationLine: 'underline', color: '#013159', height: 20 }, {fontSize: fontSize === 'Large' ? 18 : 14}]}>
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
                        <Text style={[styles.goButtonText, {fontSize: fontSize === 'Large' ? 30 : 20}]}>GO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[mapStyles.fpButtonContainer, styles[fontSize]]} activeOpacity={0.9}>
                        <Text style={mapStyles.fpButton}>View Floor Plans</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {/* Navigation Mode */}
                    <Text style={{fontSize: fontSize === 'Large' ? 18 : 14}}>{currentInstruction}</Text>
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
                            <Text style={[mapStyles.fpButton, {fontSize: fontSize === 'Large' ? 18 : 14}]}>{"< Previous"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[mapStyles.fpButtonContainer, styles[fontSize], { width: 100 }]}
                            activeOpacity={0.9}
                            onPress={() => {
                                setCurrentLocationID((prevID) => {
                                    const newID = prevID + 1;
                                    if (newID >= keyLocations.length) {
                                        // Reset navigation mode when reaching the last point
                                        setNavigationMode(false);
                                        setKeyLocations([]);
                                        setCurrentInstruction(null);
                                        setCurrentLocationID(0);
                                        Alert.alert("Navigation Complete", "You have reached your destination.");
                                        return 0; // Reset to initial ID
                                    }
                                    setCurrentInstruction(keyLocations[newID]?.instructions || '');
                                    return newID;
                                });
                            }}
                        >
                            <Text style={[mapStyles.fpButton, {fontSize: fontSize === 'Large' ? 18 : 14}]}>{"Next >"}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>

    </View>
);
}
