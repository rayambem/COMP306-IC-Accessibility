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
	list: {
		width: '85%',
		marginVertical: 10,
	},
	routeContainer: {
		backgroundColor: '#f9f9f9',
		padding: 16,
		marginVertical: 8,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	routeText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 4,
	},
	travelTime: {
		fontSize: 14,
		color: '#777',
		marginBottom: 8,
	},
	goButton: {
		backgroundColor: '#007bff',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
		alignSelf: 'flex-start',
	},
	goButtonText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	emptyText: {
		fontSize: 18,
		color: '#555',
	}
});

export default routesStyles;