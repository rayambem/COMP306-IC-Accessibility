
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccessibilityNotices from './AccessibilityNotices.js';
import styles from '../styles/global.js';
import homeStyles from '../styles/homeStyle.js'
import { Picker } from '@react-native-picker/picker';
import { useFontSize } from './FontSize';

const HomeScreen = ({navigation, route}) => {

const [modalVisible, setModalVisible] = useState(false);

const [originBuilding, setOriginBuilding] = useState(null);

const { fontSize, toggleFontSize } = useFontSize(); 

//const { fontSize } = useFontSize(); 

let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

return (

	<ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
	<View style={[styles.container,{rowGap:50}]}>
		
		{/* Header */}
		<View style={styles.header}>
		<Text style={[styles.headerTitle, styles[fontSize]]}>Ithaca College</Text>
		</View>

		{/* Accessibility Notices */}
		<TouchableOpacity style={homeStyles.noticeBox} onPress={() => setModalVisible(true)}>
		<Text style={[homeStyles.noticeText, styles[fontSize]]}>Accessibility Notices</Text>
		<View style={homeStyles.noticeCircle}>
			<Text style={[homeStyles.noticeCount, styles[fontSize]]}>3</Text>
		</View>
		</TouchableOpacity>

		{/* Navigation Form */}
		<View style={styles.form}>
		<Text style={[styles.formLabel, styles[fontSize]]}>Navigate from:</Text>
		<TextInput style={styles.input} placeholder="Building A" />

		<Text style={[styles.formLabel, styles[fontSize]]}>To:</Text>
		<TextInput style={styles.input} placeholder="Building B" />

		<Text style={[styles.formLabel, styles[fontSize]]}>Mobility:</Text>
		<TextInput style={styles.input} placeholder="Select Mobility" />
		</View>

		{/* Go Button */}
		<TouchableOpacity style={[styles.goButtonContainer, {width:'80%'}]}>
		<Text style={[styles.goButtonText, styles[fontSize]]}>GO</Text>
		</TouchableOpacity>

		{/* Accessibility Notices Modal */}
		<AccessibilityNotices visible={modalVisible} onClose={() => setModalVisible(false)} />
		
		

	</View>
	</ImageBackground>

	
);
};



export default HomeScreen;
