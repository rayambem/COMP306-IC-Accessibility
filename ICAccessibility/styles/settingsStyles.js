
import React from 'react';
import { StyleSheet} from 'react-native';
const settingsStyles = StyleSheet.create({
  
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
    Normal: {
      fontSize: 16,
    },
  
    Large: {
      fontSize: 24,
    },
  });

  export default settingsStyles;