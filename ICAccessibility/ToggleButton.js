import React, { Children } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Animated, useAnimatedValue } from 'react-native';
import styles from './styles/global.js';
import mapStyles from './styles/mapStyle.js';

ToggleButton = (props) => {

    const aniHeight = useAnimatedValue(1);

    const slashIn = () => {
        Animated.timing(aniHeight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
    
      const slashOut = () => {
        Animated.timing(aniHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

      const toggle = () => {
        //console.log(props.toggleState);
        props.onPress();
        if (props.toggleState) {
            slashIn()
        } else {
            slashOut();
        }
        
      }

    return (
        <TouchableOpacity style={styles.topButton} activeOpacity={0.7} onPress={toggle}>
            {props.children}
            <Animated.View style={[mapStyles.toggleSlash, {transform: [{rotateZ: '45deg'},{scaleY: aniHeight}]}]}></Animated.View>
        </TouchableOpacity>
    );
}

export default ToggleButton;