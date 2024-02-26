import { StyleSheet, 
Text, 
View, 
SafeAreaView, 
FlatList, 
Pressable, 
Button, 
BackHandler, 
TextInput,
Image, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState, useEffect, useContext} from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Dialog, Portal  } from 'react-native-paper';

// Auth
import {AuthContext} from '../Auth/auth'

// Config
import {isEmptyObject} from '../config'

export default function ProfileScreen(){
	const {Logout,Loading, userInfo} = useContext(AuthContext)  
	const cekUser = isEmptyObject(userInfo)
	const [visible, setVisible] = useState(false)
  	const hideDialog = (op) => setVisible(op)

	if(cekUser == true){
		return null
	}
	return(
		<SafeAreaView>
		<Spinner visible={Loading} />		
		
		<Avatar.Icon size={75} icon="account"
		style={{
			alignSelf:'center',
			marginTop:20,
		}}
		/>	
		<Text
		style={{
			alignSelf:'center',
			marginTop:10,
			fontWeight:'bold',
			fontSize:20
		}}
		>{userInfo.user.username}</Text>
		<View style={{marginTop:380}}>
		<Text
		style={{
			fontSize:15,
			fontWeight:'bold',			
			alignSelf:'center'
		}}
		>From</Text>
		<Image        	
			style={{width:100,height:50,alignSelf:'center'}}
        	source={require('./logo.png')}
      	/>
      	</View>
		</SafeAreaView>
	)
}