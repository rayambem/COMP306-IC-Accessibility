import React from 'react';
import { StyleSheet} from 'react-native';
const routesStyles = StyleSheet.create({
    routeContainer: {
        backgroundColor: '#e8eefc',
        borderRadius: 10,
        width: '100%',
        height:'auto',
        padding: 10,
        marginVertical:10,
      },
      travelTimeContainer: {
        backgroundColor: 'white',
        borderRadius:12,
        padding:1,
        width:55,
        height:55,
        alignItems:'center',
      },
      mobilityIndicator: {
        padding:8,
        borderRadius:5,
        backgroundColor:'green',
        alignSelf:'flex-start',
        justifyContent:'flex-start',
        
      },
      routeTitle: {
        fontSize:17,
      },
});

export default routesStyles;