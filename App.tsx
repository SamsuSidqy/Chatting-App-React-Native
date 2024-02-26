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
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import React,{useState, useEffect, useContext} from 'react';
import SplashScreen from 'react-native-splash-screen'

import {AuthProvider} from './maen/Auth/auth'
import Navigasi from './maen/component/Navigasi'


export default function App(){
  useEffect(() => {
    SplashScreen.hide()
  },[])
  return(
    <AuthProvider>
      <NavigationContainer>
        <Navigasi />
      </NavigationContainer>
    </AuthProvider>
  )
}