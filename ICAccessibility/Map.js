import React, { useEffect } from 'react';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from './styles.js';

export default function MapScreen({navigation, route}) {
	const buildingData = [
		{ id: 1, name: 'Library', latitude: 42.4229, longitude: -76.4955 },
		{ id: 2, name: 'Student Center', latitude: 42.4232, longitude: -76.4941 },
		{ id: 3, name: 'Gym', latitude: 42.4238, longitude: -76.4937 },
		// Add more buildings here
	];

	useEffect(() => {
		(async () => {
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			console.log('Permission to access location was denied');
			}
		});
	  }, []
	);

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
				initialRegion={{
					latitude: 42.4227,
					longitude: -76.4949,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}

				// Remove UrlTile component to allow satellite map version to show, I'm not sure why the conflict happens
				// mapType="satellite"
				showsPointsOfInterest={false}
				showsBuildings={false}
				showsCompass={false}
				showsTraffic={false}
				showsIndoors={false}

				googleMapId=''
			>
				{buildingData.map((building) => (
					<Marker
						key={building.id}
						coordinate={{ latitude: building.latitude, longitude: building.longitude }}
						title={building.name}
					>
						<View style={styles.markerLabelContainer}>
            				<Text style={styles.markerLabelText}>{building.name}</Text>
        				</View>
					</Marker>
				))}
				
					<UrlTile
					urlTemplate="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF5YW1iZW0iLCJhIjoiY20ydXFnemgxMDRkMDJqb2s1M3dxMWdiaiJ9.dsYaHzxdNIZzGHeYHQ7BBw"
					maximumZ={19}
					flipY={false}
					zIndex={1000}
					/>
				
			</MapView>
			<View style={styles.bottomMenu}>
				<TextInput
					style={styles.buildingSearchBar}
					placeholder='Search for starting point...'
				/>
				<TextInput
					style={styles.buildingSearchBar}
					placeholder='Search for destination...'
				/>
				<TouchableOpacity style={[styles.goButtonContainer, {marginTop:8}] } activeOpacity={0.9}>
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
			</View>
		</View>
	);
}
