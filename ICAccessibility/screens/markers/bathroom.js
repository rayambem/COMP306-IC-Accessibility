import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
//import styles from '/styles/styles.js';
import markerStyles from '../../styles/markerStyles.js'
const BathroomMarker = ({poi}) => {

    genderIcon = (gender) => {
        //console.log(gender);
        switch (gender) {
            case "m":
                return "male";
                break;
            case "w":
                return "female";
                break;
            case "mw":
                return "restroom";
                break;
            case "u":
            default:
                return "toilet";
                break;
        }
        return null;
    };

    return(
    <View style={[markerStyles.bathMarker]}>
        <FontAwesome5 name={genderIcon(poi.gender)} size={20} color="white" />
    </View>
    );
}

export default BathroomMarker;