import { StyleSheet, 
Text, 
View, 
SafeAreaView, 
FlatList, 
Pressable, 
Image, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useContext, useState,useEffect} from 'react'
import {AuthContext} from '../Auth/auth'
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInput, Button, Chip  } from 'react-native-paper';

export default function LoginScreen(){
	const [Username,setUsername] = useState(null)
	const [Password,setPassword] = useState(null)
	const navigation = useNavigation()
	const {login, Loading, MessageErr} = useContext(AuthContext)
	const [Err,setErr] = useState(false)
	const [M,setM] = useState(false)

	const MainLogin = () => {
		login(Username,Password)
		setM(true)
	}

	const LogicError = () => {
		setErr(false)
		setM(false)
		setUsername(null)
		setPassword(null)
	}

	useEffect(() => {
		if(Err == true || M){
			MessageErr  ? setErr(true) : setErr(false)
		}
	})

	return(
	<SafeAreaView>
		<Spinner visible={Loading}/>
		<View style={{marginTop:80}}>
		<Text
		style={{
			fontSize:20,
			fontWeight:'bold',			
			alignSelf:'center'
		}}
		>From</Text>
		<Image        	
			style={{width:250,height:50,alignSelf:'center'}}
        	source={require('./logo.png')}
      	/>
      	</View>
		<View style={{marginTop:120}}>
		{Err ? (
			<Chip icon="close"
		 mode='outlined'
		 style={{backgroundColor:'#f52525',marginBottom:10,width:400,alignSelf:'center'}}
		 rippleColor='black'
		 selectedColor='white'
		 onPress={() => LogicError()}>{MessageErr}</Chip>
		) : null}		
			<TextInput		        
				mode="outlined"
				label="Username"
				placeholder="Username"		     
		        style={{
		        marginLeft:10,
		        marginRight:10,
		        marginBottom:20,
		    	}}
		    	onChangeText={value => setUsername(value)}
		      />
		      <TextInput		        
		        mode="outlined"
				label="Password"
				placeholder="Password"		     
		        style={{
		        marginLeft:10,
		        marginRight:10,
		    	}}
		    	secureTextEntry
      			right={<TextInput.Icon icon="eye" />}
		    	onChangeText={e => setPassword(e)}
		    	color='blue'
		      />
		     <Pressable onPress={() => MainLogin()}>
		     <Button 
		     style={{
		     	marginTop:10,
		     	marginBottom:10,
		     	width:150,
		     	backgroundColor:'blue',
		     }}
		     icon="arrow-right"
		     mode="contained"
		     >Login</Button>
		     </Pressable>
		     <Pressable onPress={() => navigation.navigate('Register')}>
		     <Text style={{
		     	marginLeft:10,
		     	color:'blue'
		     }}
		     >Create Accounts ?</Text>
		     </Pressable>
		</View>
	</SafeAreaView>
	)
}