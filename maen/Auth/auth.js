import React, {createContext,useState, useEffect} from 'react';
import axios from 'axios'
export const AuthContext = createContext()
import {BASE_URL} from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthProvider = ({children}) => {

	const [userInfo,setUserInfo] = useState({})
	const [Loading,setLoading] = useState(false)
	const [SplashLoading,setSplashLoading] = useState(false)
	const [MessageErr,setMessageErr] = useState(null)


	const registrasi = (username,password) => {		
		setLoading(true)
		return fetch(`${BASE_URL}api/register`,{
			method:'POST',
			body:JSON.stringify({
				username:username,
				password:password
			}),
			 headers: {
			 	"Content-type": "application/json"
			 }
		})
		.then(response => response.json())
		.then(json => {    						
			setLoading(false)
		})
		.catch(error => {
			console.error(error);
			setLoading(false)
		});
	}	

	const login = async(username,password) => {
		setLoading(true)
		const data = JSON.stringify({
			'username':username,
			'password':password,
		})
		try{
			axios.post(`${BASE_URL}api/login`,data,{
				headers:{
					'Content-Type': 'application/json',
				}
			}).then(res => {				
				if(res.data.status == 200){
					dataUser = {
						"user":res.data.data,
						"token":res.data.token,
						"expiredToken":res.data.expires,
						"tokenCreate":res.data.token_created_at
					}
					setUserInfo(dataUser)					
					AsyncStorage.setItem('userInfo',JSON.stringify(dataUser))
					setMessageErr(null)																
					setLoading(false)
				}
				console.log(res.data.Message)
				setMessageErr(res.data.Message)								
			}).catch(err => {
				console.log(err)
				setLoading(false)
			})

		}catch(error){
			console.error(error)
			setLoading(false)
		}		
		setLoading(false)
		
	}

	const Logout = () => {
		setLoading(true)
		const token = userInfo.token
		const data = JSON.stringify({'token':token})
		try{
			axios.post(`${BASE_URL}api/logout`,data,{
				headers:{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				}
			}).then(res => {
				const response = res.data				
				if (response.status == 200){
					AsyncStorage.removeItem('userInfo')
					setUserInfo({})
					console.log(response)
				}
				console.log(response.message)
			})						
			setLoading(false)
		}catch(e){
			console.log(e)
			setLoading(false)
		}
	}

	const isLoggedIn = async() => {
		try{
			setSplashLoading(true)
			let userinfo = await AsyncStorage.getItem('userInfo')
			userinfo = JSON.parse(userinfo)
			if (userinfo){
				setUserInfo(userinfo)				
			}
			setSplashLoading(false)
		}catch(e){			
			console.log(e)
			setSplashLoading(false)
		}
	}

	useEffect(() => {
		isLoggedIn()
	}, [])


	return(
		<AuthContext.Provider 
		value={{
			registrasi,
			userInfo,
			Loading,
			login,
			Logout,
			SplashLoading,
			MessageErr,
		}}>
			{children}
		</AuthContext.Provider>
	)
}