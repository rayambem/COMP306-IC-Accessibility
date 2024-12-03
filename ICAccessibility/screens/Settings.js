
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, FlatList, ImageBackground, fontSize } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Background image URL
let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

const SettingsScreen = ({ navigation }) => {
  // States for toggle switches
  const [isHighContrast, setHighContrast] = useState(false);
  const [isMapLabels, setMapLabels] = useState(false);
  const [isSatelliteView, setSatelliteView] = useState(false);
  const [fontSize, setFontSize] = useState('Normal');

  return (
    <ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
      <View style={[styles.mainContainer]}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ithaca College</Text>
        </View>

        <Text style={[styles.sectionHeader]}>Settings</Text>


        {/* Font Size */}
         <View style={styles.settingOption}>
           <Text style={styles.label}>Change Font Size</Text>
           <TouchableOpacity
             style={styles.button}
             onPress={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
           >
            <Text style={styles.buttonText}>{fontSize}</Text>
           </TouchableOpacity>
         </View>

        {/* Settings Options */}
        <View style={styles.settingOption}>
          <Text style={styles.label}>Toggle High Contrast</Text>
          <Switch
            value={isHighContrast}
            onValueChange={setHighContrast}
            thumbColor={isHighContrast ? 'royalblue' : 'gray'}
          />
        </View>

        <View style={styles.settingOption}>
          <Text style={styles.label}>Toggle Map Labels</Text>
          <Switch
            value={isMapLabels}
            onValueChange={setMapLabels}
            thumbColor={isMapLabels ? 'royalblue' : 'gray'}
          />
        </View>

        <View style={styles.settingOption}>
          <Text style={styles.label}>Toggle Satellite View</Text>
          <Switch
            value={isSatelliteView}
            onValueChange={setSatelliteView}
            thumbColor={isSatelliteView ? 'royalblue' : 'gray'}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// Styling defined in the same file
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    
  },

  mainContainer: {
    alignItems: 'center',
	backgroundColor: 'rgba(255, 255, 255, 0.8)',
	height:'100%',
  },
  header: {
	width: '100%',
	padding: 15,
	paddingTop: 30,
	backgroundColor: 'rgba(31, 31, 31, 0.7)',
	alignItems: 'center',
},
headerTitle: {
	color: '#FFFFFF',
	fontSize: 18,
	fontWeight: 'bold',
},

sectionHeader: {
	textAlign:'left',
	fontSize:28,
	fontWeight:'bold',
	alignSelf:'flex-start',
	marginVertical:15,
	marginLeft:20,
},

settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, 
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;



