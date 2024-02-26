import { StyleSheet, TextInput,Text, View, SafeAreaView, FlatList, Pressable } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect, useRef , useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PesanData} from '../DataApi/Api'
import {AuthContext} from '../Auth/auth'
import {SOCKET_URL} from '../config'
const Stack = createStackNavigator();



export default function Message({route}){
	const [Message,setMessage] = useState('')
	const navigation = useNavigation()
	const [Pesan, setPesan] = useState([])
	const [DataPesan,setDatapesan] = useState([])
	const {userInfo} = useContext(AuthContext)
	const [Refresh,setRefresh] = useState(false)

	const ambilData = async() => {
		const data = await PesanData(userInfo.token)
		const a = data.filter(e => e.sender == userInfo.user.id && e.recive == route.params.idRecive || 
			e.sender == route.params.idRecive && e.recive == userInfo.user.id)
		// setDatapesan(a)
		setPesan(a)
	}
	const refreshData = async() => {
		setRefresh(true)
		const data = await PesanData(userInfo.token)
		const a = data.filter(e => e.sender == userInfo.user.id && e.recive == route.params.idRecive || 
			e.sender == route.params.idRecive && e.recive == userInfo.user.id)
		// setDatapesan(a)
		setPesan(a)
		setRefresh(false)
	}	
	const flatListRef = useRef(null)
	const scrollBottom = () => {
		if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
	}

	useEffect(() => {				
		ambilData()
		const socket = new WebSocket(`ws://${SOCKET_URL}chat/${route.params.kode}/`)
		socket.onopen = () => {
				console.log('Open')
		socket.onmessage = (e) => {
				try{
					const data = JSON.parse(e.data)
					const tgl = new Date()	
					console.log(data)							
					const isiPesan = {
						'recive':data.id_terima,
						'sender':data.id_kirim,
						'pesan':data.message,
						'created_at':`${tgl.getHours()}:${tgl.getMinutes()}`,
					}
					setPesan(prev => [...prev,isiPesan])
					scrollBottom()								
				}catch(e){
					console.error(e)
				}
			}		
		}
		return () => {			
			socket.close()		
		}
	},[])

	const KirimPesan = () => {
		const socket = new WebSocket(`ws://${SOCKET_URL}chat/${route.params.kode}/`)
		socket.onopen = () => {
        try {
        		const tgl = new Date()
        		const dataPesan = {
                'type': 'pesan',
                'status': '200',
                'message': Message,
                'id_sender': route.params.idSender,
                'id_recive': route.params.idRecive,                
            }            
            socket.send(JSON.stringify(dataPesan));
            setMessage('');
        } catch (e) {
            console.log(`Error > ${e}`);
        }
    };

    socket.onerror = e => console.log(e);

    socket.onclose = () => {
        console.log('Connection closed.');
    };

    return () => {
        socket.close();
    };
	}


	const UiChatting = ({message,terima,kirim,date,jam}) => {		
  return(
  	<View style={{flex:1,marginTop:10,}}>

  	{terima != userInfo.user.id ? (
  		<View style={{
  			padding:10,alignItems:'flex-end',marginRight:10,
  			backgroundColor:'grey',marginLeft:150,borderRadius:5,
  			marginBottom:10,
  		}}>
  		<Text style={{color:'#fff',}}>{message} </Text>
  		<Text style={{color:'#fff',fontSize:9}}>{jam}   <Icon name="check" size={10}/></Text>	  		 
  		</View>
  		)
  	: (
  		<View style={{
  			padding:10,alignItems:'flex-start',marginRight:10,
  			backgroundColor:'#fff',marginRight:150,marginBottom:10,
  			borderRadius:5,marginLeft:10,
  		}}>
  		<Text>{message}</Text>
  		<Text style={{fontSize:9}}>{jam}</Text>
  		</View>
  		)
  }      

  </View>
	  )
	}
	 

    return(
      <SafeAreaView style={{flex:1,backgroundColor:'#e9f2f1'}}>
      	<View>                    
          <FlatList  
          	ref={flatListRef}        
            data={Pesan}
            renderItem={({item}) => <UiChatting
             message={item.pesan} terima={item.recive} date={item.created_at}
             kirim={item.sender} jam={item.created_at}
             />}
            keyExtractor={(item,index) => `${index}`}
            refreshing={Refresh}
      			onRefresh={refreshData}
      			style={{marginBottom:50}}
            />
         </View>          
          <View style={{flex:1,justifyContent:'flex-end',marginTop:-500}}>
              <TextInput multiline={true} placeholder="   Message" style={{
                borderWidth:0.5,marginLeft:2,marginRight:45,
                borderRadius:5,padding:5,backgroundColor:'#fff',color:'black',
                height:40,
                }}
                onChangeText={(e) => setMessage(e)}
                value={Message}
              />
              <Pressable onPress={() => KirimPesan()}>
              <Text style={{
                width:40,
                height:40,
                borderRadius:3,
                verticalAlign :'middle',
                textAlign:'center',
                marginLeft:370,
                position:'absolute',
                backgroundColor:'blue',                
                color:'#fff',
                marginTop:-40
              }}> > </Text>
              </Pressable>
          </View>
      </SafeAreaView>
    )
}