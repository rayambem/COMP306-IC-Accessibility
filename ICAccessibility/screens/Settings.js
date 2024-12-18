
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, FlatList, ImageBackground, fontSize } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFontSize } from './FontSize';
import styles from '../styles/global.js';
import settingsStyles from '../styles/settingsStyles';

// Background image URL
let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

const SettingsScreen = ({ navigation }) => {
  // States for toggle switches
  const [isHighContrast, setHighContrast] = useState(false);
  const [isMapLabels, setMapLabels] = useState(false);
  const [isSatelliteView, setSatelliteView] = useState(false);
  //const [fontSize, setFontSize] = useState('Normal');
  const { fontSize, toggleFontSize, mapType, toggleMapType  } = useFontSize(); 

  const handleSatelliteToggle = (value) => {
    setSatelliteView(value);
    toggleMapType(); 
    navigation.setOptions({
      mapType: value ? 'satellite' : 'standard',
    });
  };


  return (
    <ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
      <View style={[styles.mainContainer]}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={[styles.headerTitle, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Ithaca College</Text>
        </View>

        <Text style={[styles.sectionHeader, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Settings</Text>


        {/* Font Size */}
         <View style={settingsStyles.settingOption}>
           <Text style={[settingsStyles.label, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Change Font Size</Text>
           <TouchableOpacity
             style={settingsStyles.button}
        //      onPress={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
        //    >
        onPress={toggleFontSize}>
            <Text style={[settingsStyles.buttonText, {fontSize: fontSize === 'Large' ? 22 : 16}]}>{fontSize}</Text>
           </TouchableOpacity>
         </View>

        {/* Settings Options */}
        <View style={settingsStyles.settingOption}>
          <Text style={[settingsStyles.label, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Toggle High Contrast</Text>
          <Switch
            value={isHighContrast}
            onValueChange={setHighContrast}
            thumbColor={isHighContrast ? 'royalblue' : 'gray'}
          />
        </View>

        <View style={settingsStyles.settingOption}>
          <Text style={[settingsStyles.label, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Toggle Map Labels</Text>
          <Switch
            value={isMapLabels}
            onValueChange={setMapLabels}
            thumbColor={isMapLabels ? 'royalblue' : 'gray'}
          />
        </View>

        <View style={settingsStyles.settingOption}>
          <Text style={[settingsStyles.label, {fontSize: fontSize === 'Large' ? 22 : 16}]}>Toggle Satellite View</Text>
          <Switch
 
            value={isSatelliteView}
    onValueChange={handleSatelliteToggle} // Call handler to toggle satellite view
    thumbColor={isSatelliteView ? 'royalblue' : 'gray'}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

//hi


export default SettingsScreen;



