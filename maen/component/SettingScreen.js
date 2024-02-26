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

export default function SettingScreen(){
	 return(
      <View>
      		<View style={{marginTop:180}}>
            <Text
            style={{
                fontSize:15,
                fontWeight:'bold',          
                alignSelf:'center'
            }}
            >From</Text>
            <Image          
            style={{width:250,height:50,alignSelf:'center'}}
            source={require('./logo.png')}
            />
            </View>
      </View>
     )
}