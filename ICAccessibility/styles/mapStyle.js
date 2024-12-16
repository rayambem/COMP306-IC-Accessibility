import React from 'react';
import { StyleSheet} from 'react-native';
const mapStyles = StyleSheet.create({
    topButtonsContainer: {
        flex: 2,
        flexDirection: 'row',
        gap: 10,
        zIndex: 8,
        position: 'absolute',
        top: 60,
        left: 20,
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
    map: {
        width: '100%',
        height: '100%',
    },
    bottomMenu: {
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 'auto',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        padding: 15,
        marginBottom: 80,
        gap: 8
    },
    buildingSearchBar: {
        width: '100%',
        borderWidth: 1,
        borderBlockColor: '#013159',
        padding: 10,
        borderRadius: 5,
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
        shadowOpacity: 60
    },
    goButton: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    menuLinks: {
        marginTop: 3,
        flexDirection: 'row',
        gap: 20,
        height: 30,
    },
    fpButtonContainer: {
        backgroundColor: '#013159',
        padding: 12,
        width: '100%',
        borderRadius: 100
    },
    fpButton: {
        color: '#fff',
        textAlign: 'center'
    },
    markerLabelContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 15,
    },
    markerLabelText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    toggleSlash: {
        position: 'absolute',
        //transform: [{rotateZ: '45deg'}],
        zIndex:100,
        backgroundColor: 'white',
        borderWidth:4,
        height:"90%",
        borderRadius:10,
        borderColor: '#013159',
        width: 12,
        transformOrigin: 'bottom left',
        left:6,
        bottom:15,
        
    }
});

export default mapStyles;