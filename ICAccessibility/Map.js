import React, { useEffect } from 'react';
import MapView, { UrlTile } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function MapScreen() {
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
		<MapView
			style={styles.map}
			initialRegion={{
				latitude: 42.4227,
				longitude: -76.4949,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
			// Remove UrlTile component to allow satellite map view to show, I'm not sure why the conflict happens
			mapType="satellite"
		>
			{/* <UrlTile
			urlTemplate="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF5YW1iZW0iLCJhIjoiY20ydXFnemgxMDRkMDJqb2s1M3dxMWdiaiJ9.dsYaHzxdNIZzGHeYHQ7BBw"
			maximumZ={19}
			flipY={false}
			/> */}
		</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
},
map: {
	width: '100%',
	height: '100%',
},
});