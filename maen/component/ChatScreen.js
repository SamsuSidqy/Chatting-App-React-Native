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
import { useNavigation } from '@react-navigation/native';
import React,{useState, useEffect, useContext} from 'react';
import {AuthContext} from '../Auth/auth'
import {ContactApi,RoomApi} from '../DataApi/Api'
import { Avatar, Divider } from 'react-native-paper';

export default function ChatScreen(){

	const {userInfo, SplashLoading} = useContext(AuthContext) 
	const [Datapesan,setDatapesan] = useState(null) 
    const [refreshing, setRefreshing]  = useState(false)
          
    const ambilData = async() => {
      const data = await ContactApi(userInfo.token)
      const a = data.filter(e => e.id != userInfo.user.id && e.id != 1)
      setDatapesan(a)
    }

    const refreshData = async() => {
      setRefreshing(true)
      const data = await ContactApi(userInfo.token)
      const a = data.filter(e => e.id != userInfo.user.id && e.id != 1)
      setDatapesan(a)
      setRefreshing(false)
    }

    useEffect(() => {      
      ambilData()  
    }, [])

	const ItemChat = ({username,idRecive, idSender}) => {
		const navigation = useNavigation()
		const {userInfo} = useContext(AuthContext) 


		const KirimPesan = async() => { 
			const kode = await RoomApi(userInfo.token,idRecive,idSender) 
			const roomKode = JSON.stringify(kode)
			const a = JSON.parse(roomKode)                           
			navigation.navigate('Pesan',{
				'username':username,
				'idRecive':idRecive,
				'idSender':idSender,
				'token':userInfo.token,
				'kode':a.KodeRoom,
			})
		}
		return(
			<Pressable
			onPress={KirimPesan}
			>
			<View style={{
				marginLeft:20,
				marginTop:20,
				marginRight:10,
				height:50,
				flexDirection:'row',
			}}>
			<Avatar.Icon size={50} icon="account" style={{marginTop:-10}} />
			<Text
			style={{
				fontSize:20,
				fontWeight:'bold',
				marginLeft:10,
			}}
			>{username}</Text>					
			</View>
			<Divider bold={true} />	
			</Pressable>
			)
	}

	return(
		<SafeAreaView>      
			<FlatList 
			data={Datapesan}
			renderItem={({item}) => <ItemChat username={item.username} idRecive={item.id} idSender={userInfo.user.id}/>}
			keyExtractor={item => item.id}
			refreshing={refreshing}
      		onRefresh={refreshData}
			/>
		</SafeAreaView>
	)
}