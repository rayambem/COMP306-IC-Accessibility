import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutes } from '../contexts/RoutesContext';
import styles from '../styles/global.js';
import routeStyles from '../styles/routesStyle.js';
import { useFontSize } from './FontSize';

const SavedRoutesScreen = ({navigation}) => {
const { savedRoutes, removeRoute } = useRoutes();
const { fontSize } = useFontSize(); 

let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

const renderItem = ({item}) => (
	<RouteDisplay 
	navRoute={item}
	navigation={navigation}
	fontSize={fontSize}
	onDelete={() => {
		Alert.alert(
		"Delete Route",
		"Are you sure you want to delete this route?",
		[
			{
			text: "Cancel",
			style: "cancel"
			},
			{ 
			text: "Delete", 
			style: "destructive",
			onPress: () => removeRoute(item.id)
			}
		]
		);
	}}
	/>
);

// Render empty list component if no routes
const renderEmptyList = () => (
	<View style={{alignItems: 'center', marginTop: 50}}>
	<Text style={[styles[fontSize], {color: 'gray'}]}>
		No saved routes available
	</Text>
	</View>
);

return (
	<ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
	<View style={[styles.mainContainer]}>
		{/* Header */}
		<View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
		<Text style={[styles.headerTitle, styles[fontSize]]}>Ithaca College</Text>
		</View>
		<Text style={[styles.sectionHeader, styles[fontSize]]}>Saved Routes</Text>
		<FlatList
		style={{width:'85%'}}
		data={savedRoutes}
		renderItem={renderItem}
		keyExtractor={item => item.id.toString()}
		ListEmptyComponent={renderEmptyList}
		/>
	</View>
	</ImageBackground>
);
};

const RouteDisplay = ({navRoute, navigation, fontSize, onDelete}) => {
const mobilityLevel = navRoute.mobilityLevel || 'Full Mobility';

return (
	<View style={[routeStyles.routeContainer, { position: 'relative' }]} >
	<TouchableOpacity 
		style={{
		position: 'absolute', 
		top: 10, 
		right: 10, 
		zIndex: 10,
		backgroundColor: 'red',
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
		}}
		onPress={onDelete}
	>
		<Ionicons name="trash" size={20} color="black" />
	</TouchableOpacity>
	<View style={{ flexDirection: 'row', gap: 5 }}>
		<View style={{ flex: 0 }}>
		<Text style={[styles.bold, routeStyles.routeTitle, styles[fontSize]]}>To: </Text>
		<Text style={[styles.bold, routeStyles.routeTitle, styles[fontSize]]}>From:</Text>
		</View>

		{/*Origin & Destination Text*/}
		<View style={{ flex: 1 }}>
		<Text style={[routeStyles.routeTitle, styles[fontSize]]}>{navRoute.origin}</Text>
		<Text style={[routeStyles.routeTitle, styles[fontSize]]}>{navRoute.destination}</Text>
		</View>

		{/*Travel Time*/}
		<View style={[routeStyles.travelTimeContainer, { alignSelf: 'flex-end' }]}>
		<Text style={[styles.bold, { fontSize: 35, marginBottom: -5 }]}>{navRoute.duration || navRoute.travelTime || 0}</Text>
		<Text>MINS</Text>
		</View>

	</View>
	<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
		<View style={[routeStyles.mobilityIndicator]}>
		<Text style={styles.textWhite}>{mobilityLevel}</Text>
		</View>
		<TouchableOpacity 
		style={[styles.goButtonContainer, { height: 'auto', alignSelf: 'flex-start', flexBasis: 100 }]} 
		activeOpacity={0.9}
		onPress={() => navigation.navigate('Map', {navRoute})}
		>
		<Text style={styles.goButtonText}>
			GO
		</Text>
		</TouchableOpacity>
	</View>
	</View>
);
}

export default SavedRoutesScreen;