

export const BASE_URL = ''  // Example => http://192.168.1.13:8000/  For Api  
export const SOCKET_URL = '' // Example => 192.168.1.13:8000/ For Socket Chat  

export const isEmptyObject = (obj)=> {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}