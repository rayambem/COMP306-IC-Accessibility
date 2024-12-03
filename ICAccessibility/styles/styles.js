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
	// flex: 1,
	alignItems: 'center',
	backgroundColor: 'rgba(255, 255, 255, 0.8)',
	justifyContent: 'space-between',   //if removed, lots of space below the go button.
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
	display: 'flex',
	zIndex: 10,
	position: 'absolute',
	bottom: 0,
	width: '80%',
	height: 'auto',
	minHeight: 'auto',
	backgroundColor: '#fff',
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	alignItems: 'center',
	padding: 15,
	paddingBottom: 100,
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
	marginTop: 10,
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
	paddingHorizontal: 8,
	borderRadius: 5,
	marginBottom: 15,
},
markerLabelText: {
	color: 'white',
	fontSize: 18,
	fontWeight: 'normal',
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
sectionHeader: {
	textAlign:'left',
	fontSize:28,
	fontWeight:'bold',
	alignSelf:'flex-start',
	marginVertical:15,
	marginLeft:20,
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