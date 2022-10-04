import { TOKENKEY } from '@/config/config'

export const setStorage = (key, value) => {
	if(!uni.setStorageSync) return
	if(key != null && value != null) {
		uni.setStorageSync(key, value)
	}
}

export const getStorage = key => {
	if(!uni.setStorageSync) return null
	if(key != null) {
		return uni.getStorageSync(key)
	}
}

export const remove = key => {
	uni.removeStorageSync(key)
}

export const setToken = token => {
	setStorage(TOKENKEY, token)
}

export const getToken = _ => {
	return getStorage(TOKENKEY)
}

export const removeToken = _ => {
	remove(TOKENKEY)
}
