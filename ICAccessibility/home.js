
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccessibilityNotices from './AccessibilityNotices.js';
import styles from './styles/global.js';
import homeStyles from './styles/homeStyle.js';

const HomeScreen = ({navigation, route}) => {

  const [modalVisible, setModalVisible] = useState(false);

  let pic = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZ2rLMNmedcJfmp3cQEr_AZ2N2ICL8deY4lwcFuu-yrWGy6aBcKZXkFM&s' };

  return (

    <ImageBackground source={pic} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain' }}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ithaca College</Text>
        </View>

        {/* Accessibility Notices */}
        <TouchableOpacity style={homeStyles.noticeBox} onPress={() => setModalVisible(true)}>
          <Text style={homeStyles.noticeText}>Accessibility Notices</Text>
          <View style={homeStyles.noticeCircle}>
            <Text style={homeStyles.noticeCount}>3</Text>
          </View>
        </TouchableOpacity>

        {/* Navigation Form */}
        <View style={styles.form}>
          <Text style={styles.formLabel}>Navigate from:</Text>
          <TextInput style={styles.input} placeholder="Building A" />

          <Text style={styles.formLabel}>To:</Text>
          <TextInput style={styles.input} placeholder="Building B" />

          <Text style={styles.formLabel}>Mobility:</Text>
          <TextInput style={styles.input} placeholder="Select Mobility" />
        </View>

        {/* Go Button */}
        <TouchableOpacity style={[styles.goButtonContainer,{width:'85%', marginTop:20}]}>
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>


        {/* Accessibility Notices Modal */}
        <AccessibilityNotices visible={modalVisible} onClose={() => setModalVisible(false)} />
        
        

      </View>
    </ImageBackground>

    
  );
};



export default HomeScreen;
