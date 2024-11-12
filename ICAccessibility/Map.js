import React, { useEffect } from 'react';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MapScreen() {
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
				<TouchableOpacity style={styles.goButtonContainer} activeOpacity={0.9}>
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

const styles = StyleSheet.create({
container: {
	flex: 1,
	alignItems: 'center',
	// paddingTop: 0,
},
topButtonsContainer: {
	flex: 2,
	flexDirection: 'row',
	gap: 10,
	zIndex: 8,
	position: 'absolute',
	top: 60,
	left: 20,
},
topButton: {
	color: 'white',
	backgroundColor: '#013159',
	width: 60,
	height: 60,
	borderRadius: 100,
	alignItems: 'center',
	justifyContent: 'center',
	borderWidth: 1,
	borderColor: 'white'
},
map: {
	width: '100%',
	height: '100%',
},
bottomMenu: {
	zIndex: 10,
	position: 'absolute',
	bottom: 0,
	width: '80%',
	height: 350,
	backgroundColor: '#fff',
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	alignItems: 'center',
	paddingTop: 15,
	gap: 8
},
buildingSearchBar: {
	width: '90%',
	borderWidth: 1,
	borderBlockColor: '#013159',
	padding: 10,
	borderRadius: 5,
},
goButtonContainer: {
	marginTop: 5,
	backgroundColor: '#FFBB00',
	width: '90%',
	height: 50,
	alignItems: 'center',
	borderRadius: 5,
	justifyContent: 'center',
	shadowColor: 'gray',
	shadowOffset: 2,
	shadowOpacity: 60
},
goButton: {
	fontSize: 30,
	fontWeight: 'bold',
	color: '#fff'
},
menuLinks: {
	marginTop: 10,
	flexDirection: 'row',
	gap: 20,
	height: 30,
},
fpButtonContainer: {
	backgroundColor: '#013159',
	padding: 12,
	width: '90%',
	borderRadius: 100
},
fpButton: {
	color: '#fff',
	textAlign: 'center'
},
markerLabelContainer: {
	alignItems: 'center',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	paddingVertical: 2,
	paddingHorizontal: 5,
	borderRadius: 5,
	marginBottom: 15,
},
markerLabelText: {
	color: 'white',
	fontSize: 12,
	fontWeight: 'bold',
},
});