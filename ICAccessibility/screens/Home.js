import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AccessibilityNotices from './AccessibilityNotices.js';
import styles from '../styles/global.js';
import homeStyles from '../styles/homeStyle.js';
import { useFontSize } from './FontSize';

const HomeScreen = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [originBuilding, setOriginBuilding] = useState(null);
    const [destinationBuilding, setDestinationBuilding] = useState(null);
    const [openOrigin, setOpenOrigin] = useState(false); // Control dropdown visibility
    const [openDestination, setOpenDestination] = useState(false); // Control dropdown visibility
    const { fontSize, toggleFontSize } = useFontSize();

    let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

    const buildings = [
        { label: 'Williams', value: 'Williams' },
        { label: 'Park School', value: 'Park School' },
        { label: 'Friends Hall', value: 'Friends Hall' },
        { label: 'School of Business', value: 'School of Business' },
        { label: 'Textor Hall', value: 'Textor Hall' },
        { label: 'School of Music', value: 'School of Music' },
        { label: 'Gannett Center', value: 'Gannett Center' },
    ];

    return (
        <ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
            <View style={[styles.container, { rowGap: 50 }]}>

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
                    <DropDownPicker
                        open={openOrigin}
                        value={originBuilding}
                        items={buildings}
                        setOpen={setOpenOrigin}
                        setValue={setOriginBuilding}
                        placeholder="Select Building"
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                    />

                    <Text style={[styles.formLabel, styles[fontSize]]}>To:</Text>
                    <DropDownPicker
                        open={openDestination}
                        value={destinationBuilding}
                        items={buildings}
                        setOpen={setOpenDestination}
                        setValue={setDestinationBuilding}
                        placeholder="Select Building"
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                    />

                    <Text style={[styles.formLabel, styles[fontSize]]}>Mobility:</Text>
                    <TextInput style={styles.input} placeholder="Not available" editable={false} />
                </View>

                {/* Go Button */}
                <TouchableOpacity style={[styles.goButtonContainer, { width: '80%' }]}>
                    <Text style={[styles.goButtonText, styles[fontSize]]}>GO</Text>
                </TouchableOpacity>

                {/* Accessibility Notices Modal */}
                <AccessibilityNotices visible={modalVisible} onClose={() => setModalVisible(false)} />

            </View>
        </ImageBackground>
    );
};

export default HomeScreen;
