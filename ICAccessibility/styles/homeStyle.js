import React from 'react';
import { StyleSheet} from 'react-native';
const homeStyles = StyleSheet.create({
    noticeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        padding: 10,
        borderRadius: 8,
        marginVertical: 15,
        width: '90%',
        justifyContent: 'space-between',   
      },
      noticeCircle: {
        backgroundColor: 'red', 
        width: 30,              
        height: 30,             
        borderRadius: 15,       
        justifyContent: 'center', 
        alignItems: 'center',   
      },
      noticeCount: {
        color: '#FFFFFF',       
        fontSize: 17,           
        fontWeight: 'bold',
      },
      noticeText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        //height: '70%',
        backgroundColor: '#F0F4FA',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
      },
      modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      modalTitleContainer: {
        alignItems: 'center', 
      },
      modalDate: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
      },
      closeButton: {
        fontSize: 24,
        color: '#333',
      },
      noticeContent: {
        width: '100%',
      },
      noticeItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
      },
      noticeTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      noticeDescription: {
        fontSize: 14,
        color: '#333',
      },
});

export default homeStyles;