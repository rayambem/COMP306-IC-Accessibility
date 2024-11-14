
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AccessibilityNotices from './AccessibilityNotices';
import styles from './styles.js';

const SavedRoutesScreen = ({navigation, route}) => {

  const routes = [{ id: 1, origin: 'Park School', destination: 'williams Hall', travelTime: 3, mobilityLevel: 'Full Mobility' },
  { id: 2, origin: 'Emerson Suites', destination: 'Dillingham Center', travelTime: 10, mobilityLevel: 'Limited Mobility' }
  ];
  const [modalVisible, setModalVisible] = useState(false);

  let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

  const renderItem = ({index, item}) => {
    const {origin, destination, travelTime, mobilityLevel} = item;
    const mobilityColor = 'green';
    console.log(item);
    console.log(item.origin);
    return (
      <RouteDisplay origin={origin}
        destination={destination}
        travelTime={travelTime}
        mobilityLevel={mobilityLevel}
        mobilityColor={mobilityColor}
      />
    )
  }
  return (

    <ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
      <View style={[styles.mainContainer]}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Routes</Text>
        </View>

        <FlatList
          style={{width:'85%'}}
          data={routes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />






      </View>
    </ImageBackground>


  );
};

const RouteDisplay = (props) => {
  return (

    <View style={[styles.routeContainer]} >
      <View style={{ flexDirection: 'row', gap: 5, }}>

        <View style={{ flex: 0 }}>
          <Text style={styles.bold}>To: </Text>
          <Text style={styles.bold}>From:</Text>
        </View>

        {/*Origin & Destination Text*/}
        <View style={{ flex: 1 }}>
          <Text>{props.origin}</Text>
          <Text>{props.destination}</Text>
        </View>

        {/*Travel Time*/}
        <View style={[styles.travelTimeContainer, { alignSelf: 'flex-end' }]}>
          <Text style={[styles.bold, { fontSize: 35, marginBottom: -5 }]}>{props.travelTime}</Text>
          <Text>MINS</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
        <View style={[styles.mobilityIndicator]}>
          <Text style={styles.textWhite}>{props.mobilityLevel}</Text>
        </View>
        <TouchableOpacity style={[styles.goButtonContainer, { height: 'auto', alignSelf: 'flex-start', flexBasis: 100 }]} activeOpacity={0.9}
        onPress={()=> {navigation.navigate('MapScreen')}}>
          <Text style={styles.goButton}>
            GO
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}


export default SavedRoutesScreen;
