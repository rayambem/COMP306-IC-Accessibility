import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AccessibilityNotices from './AccessibilityNotices.js';
import styles from '../styles/global.js';
import homeStyles from '../styles/homeStyle.js';
import { useFontSize } from './FontSize';

const HomeScreen = ({ navigation, route }) => {
    // State for dropdown and modal
    const [modalVisible, setModalVisible] = useState(false);
    const [originBuilding, setOriginBuilding] = useState(null);
    const [destinationBuilding, setDestinationBuilding] = useState(null);
    const [openOrigin, setOpenOrigin] = useState(false);
    const [openDestination, setOpenDestination] = useState(false);

    // Font size context
    const { fontSize, toggleFontSize } = useFontSize();

    // Background image
    const backgroundImage = { 
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' 
    };

    // Buildings list for dropdown
    const buildings = [
		{ label: 'Williams (Starting point)', value: 'Williams' },
		{ label: 'Park School (Destination)', value: 'Park School' },
        { label: 'Friends Hall (Not implemented)', value: 'Friends Hall' },
        { label: 'School of Business (Not implemented)', value: 'School of Business' },
        { label: 'Textor Hall (Not implemented)', value: 'Textor Hall' },
        { label: 'School of Music (Not implemented)', value: 'School of Music' },
        { label: 'Gannett Center (Not implemented)', value: 'Gannett Center' },
    ];

    return (
        <ImageBackground 
            source={backgroundImage} 
            style={styles.backgroundImage} 
            imageStyle={{ resizeMode: 'contain' }}
        >
            <View style={[styles.container, { rowGap: 50 }]}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[
                        styles.headerTitle, 
                        { fontSize: fontSize === 'Large' ? 24 : 18 }
                    ]}>
                        Ithaca College
                    </Text>
                </View>

                {/* Accessibility Notices */}
                <TouchableOpacity 
                    style={homeStyles.noticeBox} 
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={[
                        homeStyles.noticeText, 
                        { fontSize: fontSize === 'Large' ? 18 : 14 }
                    ]}>
                        Accessibility Notices
                    </Text>
                    <View style={homeStyles.noticeCircle}>
                        <Text style={[
                            homeStyles.noticeCount, 
                            { fontSize: fontSize === 'Large' ? 16 : 12 }
                        ]}>
                            3
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Navigation Form */}
                <View style={styles.form}>
                    {/* Navigate From */}
                    <Text style={[
                        styles.formLabel, 
                        { fontSize: fontSize === 'Large' ? 18 : 14 }
                    ]}>
                        Navigate from:
                    </Text>
                    <DropDownPicker
                        open={openOrigin}
                        value={originBuilding}
                        items={buildings}
                        setOpen={setOpenOrigin}
                        setValue={setOriginBuilding}
                        placeholder="Select Building"
                        style={styles.dropdown}
                        textStyle={[
                            styles.dropdownText,
                            { fontSize: fontSize === 'Large' ? 18 : 14 }
                        ]}
                    />

                    {/* Navigate To */}
                    <Text style={[
                        styles.formLabel, 
                        { fontSize: fontSize === 'Large' ? 18 : 14 }
                    ]}>
                        To:
                    </Text>
                    <DropDownPicker
                        open={openDestination}
                        value={destinationBuilding}
                        items={buildings}
                        setOpen={setOpenDestination}
                        setValue={setDestinationBuilding}
                        placeholder="Select Building"
                        style={styles.dropdown}
                        textStyle={[
                            styles.dropdownText,
                            { fontSize: fontSize === 'Large' ? 18 : 14 }
                        ]}
                    />

                    {/* Mobility */}
                    <Text style={[
                        styles.formLabel, 
                        { fontSize: fontSize === 'Large' ? 18 : 14 }
                    ]}>
                        Mobility:
                    </Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Not available" 
                        editable={false} 
                        placeholderTextSize={fontSize === 'Large' ? 18 : 14}
                    />
                </View>

                {/* Go Button */}
                <TouchableOpacity 
                    style={[styles.goButtonContainer, { width: '80%' }]}
                >
                    <Text style={[
                        styles.goButtonText, 
                        { fontSize: fontSize === 'Large' ? 22 : 18 }
                    ]}>
                        GO
                    </Text>
                </TouchableOpacity>

                {/* Accessibility Notices Modal */}
                <AccessibilityNotices 
                    visible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                />
            </View>
        </ImageBackground>
    );
};

export default HomeScreen;