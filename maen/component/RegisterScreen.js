import { StyleSheet, 
Text, 
View, 
SafeAreaView, 
FlatList, 
Pressable, 
Button, 
BackHandler, 
TextInput 
} from 'react-native';

import React, {useContext,useState, useEffect} from 'react'
import {AuthContext} from '../Auth/auth'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen(){
	const [Username,setUsername] = useState('')
	const [Password,setPassword] = useState(null)
	const {registrasi, Loading} = useContext(AuthContext)
	const nav = useNavigation();
	useEffect(() => {
		if(Loading){
			nav.navigate('Login')
			setPassword(null)
			setUsername(null)
		}
	})

	return(
	<SafeAreaView>
		<Spinner visible={Loading}/>
		<View style={{marginTop:220}}>			
			<TextInput		        
		        placeholder="New Username"		     
		        style={{borderBottomWidth:1.5,
		        padding:10,
		        marginLeft:10,
		        marginRight:10,		        
		    	}}
		    	onChangeText={value => setUsername(value)}
		      />
		      <TextInput		        
		        placeholder="New Password"		     
		        style={{borderBottomWidth:1.5,
		        marginTop:40,
		        padding:10,
		        marginLeft:10,
		        marginRight:10,
		        marginBottom:10,
		    	}}
		    	secureTextEntry={true}
		    	onChangeText={paswd => setPassword(paswd)}
		      />
		     <Pressable onPress={() => registrasi(Username,Password)}>
		     <Text style={{
		     	borderWidth:1.6,
		     	width:140,
		     	height:30,
		     	textAlign:'center',
		     	padding:5,
		     	marginLeft:10,
		     	marginTop:10,
		     	marginBottom:20,
		     }}
		     >Create Accounts</Text>
		     </Pressable>
		     <Pressable onPress={() => nav.navigate('Login')}>
		     <Text style={{
		     	marginLeft:10,
		     	color:'blue'
		     }}
		     >Login ?</Text>
		     </Pressable>
		</View>
	</SafeAreaView>
	)
}