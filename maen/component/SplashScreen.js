import React from 'react'

import {ActivityIndicator,View} from 'react-native'


export default SplashScreen = () => {
	return(
		<View style={{flex:1,justifyContent:'center',backgroundColor:'#06bcee'}}>			
			<ActivityIndicator size="large"color="#ffffff" />
		</View>
	)
}