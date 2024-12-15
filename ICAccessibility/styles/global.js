import React from 'react';
import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({

    backgroundImage: {
      flex: 1,
      resizeMode: 'contain',
  
    },
    mainContainer: {
        alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      height:'100%',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: '',   //if removed, lots of space below the go button.
      
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
    
    form: {
      backgroundColor: 'rgba(237, 237, 237, 0.8)',
      padding: 15,
      borderRadius: 8,
      width: '90%',
      marginVertical: 5,
      
    },
    formLabel: {
      fontSize: 14,
      color: '#333333',
      marginTop: 10,
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      padding: 10,
      marginTop: 5,
    },
    goButton: {
      backgroundColor: '#FFA500',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginVertical: 80,
      
    },
    goButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 10,
      backgroundColor: '#1F1F1F',
      position: 'absolute',
      bottom: 0,
      paddingTop: 15,
    },
    navButton: {
      alignItems: 'center',
    },
    navIcon: {
      color: '#FFFFFF',
      fontSize: 24,
    },
    topButton: {
      color: 'white',
      backgroundColor: '#013159',
      width: 60,
      height: 60,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'white'
    },
      
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#1F1F1F',
        position: 'absolute',
        bottom: 0,
        paddingTop: 15,
      },
      navButton: {
        alignItems: 'center',
      },
      navIcon: {
        color: '#FFFFFF',
        fontSize: 24,
      },
      navBar: {
        backgroundColor: '#000000',
        width: '100',
        height: '100',
      },
      //Saved Routes
      
      sectionHeader: {
        textAlign:'left',
        fontSize:28,
        fontWeight:'bold',
        alignSelf:'flex-start',
        marginVertical:15,
        marginLeft:20,
      },
      goButtonContainer: {
       
        backgroundColor: '#FFBB00',
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        shadowColor: 'gray',
        shadowOffset: 2,
        shadowOpacity: 60,
        paddingVertical: 8,
    },
      bold: {
        fontWeight: 'bold',
      },
      textCenter: {
        textAlign:'center',
      },
      textWhite: {
        color:'white',
      },
  });

  export default styles;