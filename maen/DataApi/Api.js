import axios from 'axios'
import {BASE_URL} from '../config'

export const ContactApi = async(token) => {
	// let data = null
	try{
		const res = await axios.get(`${BASE_URL}contact/`,{
			headers:{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
		// console.log(res.data)
		return res.data

	}catch(e){
		console.error(e)
	}
}
export const RoomApi = async(token,idrecive,idesender) => {
	console.log(token,idrecive,idesender)
	try{		
		const res = await fetch(`${BASE_URL}room/`,{
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body:JSON.stringify({
				"id-sender":idesender,
				"id-recive":idrecive
			})
		})
		const data = await res.json()		
		return data

	}catch(e){
		console.log(e)
	}
}

export async function PesanData(token){
	try{
		const res = await axios.get(`${BASE_URL}message/`,{
			headers:{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		})

		return res.data
	}catch(e){
		console.log(`Gagal ${e}`)
	}
}