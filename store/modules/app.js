import { ANGELLONE_USERINFO, ANGELLONE_LOCAL } from '@/config/config'
import { setToken, getToken, getStorage, setStorage, removeToken, remove } from '@/utils/cache'
import { login } from '@/api/api'

const state = {
	local: getStorage(ANGELLONE_LOCAL) || 'en',
	token: getToken() || void 0,
	userinfo: getStorage(ANGELLONE_USERINFO) || {}
}

const mutations = {
	SET_TOKEN(state, token) {
		state.token = token
		setToken(token)
	},
	SET_USERINFO(state, info) {
		state.userinfo = info
		setStorage(ANGELLONE_USERINFO, info)
	},
	SET_lOCAL(state, local) {
		state.local = local
		uni.setLocale(local)
		setStorage(ANGELLONE_LOCAL, local)
	},
	LOGOUT(state) {
		removeToken()
		remove(ANGELLONE_USERINFO)
	}
}

const actions = {
	// 登录
	login({ commit }, userinfo) {
		return new Promise(async (reslove, reject) => {
			try{
				// const { token } = await login(userinfo)
				commit('SET_TOKEN', token)
				reslove()
			} catch(err) {
				reject(err)
			}
		})
	},
	
	
	setLocal({ commit }, local) {
		commit('SET_lOCAL', local)
	}
	
}

export default {
	state,
	mutations,
	actions
}