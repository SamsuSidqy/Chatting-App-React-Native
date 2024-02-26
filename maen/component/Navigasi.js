import { StyleSheet, 
Text, 
View, 
SafeAreaView, 
FlatList, 
Pressable,  
BackHandler,  
} from 'react-native';

// Navigasi
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

import React,{useState, useEffect, useContext} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button, Avatar } from 'react-native-paper';

// Komponen

import SplashScreen from './SplashScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import ChatScreen from './ChatScreen'
import SettingScreen from './SettingScreen'
import Message from './Message'

// Auth
import {AuthContext} from '../Auth/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Config
import {isEmptyObject} from '../config'

export default function Navigasi(){
	  const {userInfo,Logout,Loading, SplashLoading} = useContext(AuthContext)
    const cekUser = isEmptyObject(userInfo)
    const navigation = useNavigation()              
    
    return(    
      <Stack.Navigator> 
        {SplashLoading ? (
          <Stack.Screen name='Waiting' component={SplashScreen} options={{headerShown:false}} />
        ):cekUser == true ? (
          <>
          <Stack.Screen name="Login" component ={LoginScreen} options={{
            headerShown:false
          }}/>
          <Stack.Screen name="Register" component ={RegisterScreen} options={{
            headerShown:false
          }}/>
          </>
        ): (
          <>
          <Stack.Screen name='Chat' component={ChatScreen} 
          options={{
            headerRight:() => (
              <>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
               marginRight:10,}}>
                  <Pressable onPress={() => navigation.navigate('Profile')}>
                      <Icon name="user" size={30} style={{paddingRight:15}}/>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Settings')}>
                      <Icon name="gear" size={30}/>
                  </Pressable>
              </View>
              </>
            )
          }}
          />          
          <Stack.Screen name='Profile' component={ProfileScreen}
          options={{
            title:`Halo ${userInfo.user.username}`,
            headerRight:() => (
              <View>
                <Button 
                style={{
                  marginTop:10,
                  marginBottom:10,                  
                  backgroundColor:'blue',
                  textAlign:'center',                  
                }}
                icon="power"
                mode="elevated"
                textColor="white"
                contentStyle={{flexDirection: 'row-reverse',}}
                onPress={() => Logout() }
                ></Button>
              </View>
            )
          }}
          /> 
          <Stack.Screen name='Settings' component={SettingScreen}/> 
          <Stack.Screen name="Pesan" component={Message} options={({ route }) => ({ 
            title: route.params.username,
            headerLeft: () => (
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
               }}>
                <Pressable onPress={() => navigation.navigate('Chat')}>
                    <Icon name="arrow-left" size={20} style={{marginLeft:10,marginRight:10,}}/>
                </Pressable>
                <Avatar.Icon size={35} icon="account" style={{backgroundColor:'blue'}} />
              </View>
              ) 
          })}/>

          </>
          ) 
        }                      
      </Stack.Navigator>    
   )
}