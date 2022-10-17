import { HTTP_REQUEST_URL, HEADER, TOKENNAME } from '@/config/app'
import { ANGELLONE_USERINFO } from '@/config/config'
import { getToken, removeToken, remove } from '@/utils/cache'

/**
 * 发送请求
 */
function baseRequest(url, method, data, opt) {
	let Url = HTTP_REQUEST_URL, header = HEADER
	if (getToken()) header[TOKENNAME] = 'Bearer ' + getToken()
	
	// header['responseType'] = 'arraybuffer'
	// header[TOKENNAME] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQzZTY3OTU0LTVmNGItNDA1YS1hN2VhLTdjNWQ0MzA1Mzc2NSJ9.F1inTA1_QQbkdvmvgvs4PYrcRa1klQeaR7NNeTiUfR0DQpH9WO7m56OVJL38UQpB_Ya7Sa5SmiecIkKGYiRslg'
	return new Promise((reslove, reject) => {
		// if (!opt.noAuth) {	
		// 	console.log('login')
		// 	uni.showLoading({
		// 		title: "加载中"
		// 	})
		// }
		// if(opt.contentType){
		// 	header = opt.contentType;
		// 	if (token) header[TOKENNAME] = 'Bearer ' + token;
		// }
		const { isModal = true, loading } = opt
		if(loading) {
			uni.showLoading({
				title: '加载中...'
			})
		}
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				loading && uni.hideLoading()
				// console.log('请求状态码', res.data)
				const { msg, code } = res.data
				if (msg == '非法访问' || code == 401) {
					removeToken()
					remove(ANGELLONE_USERINFO)
					isModal && uni.showModal({
						title: '提示!',
						content: '您还未登录!请登录后再试',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/subcontract/login/index'
								})
							} else {}
						}
					})
				}
				if(code != 200) {
					reject(new Error(msg))
				}
				//  else if(code == 500) { // [400,500].includes(code)
				// 	uni.showToast({
				// 		title: msg,
				// 		icon: 'none',
				// 		duration: 1500
				// 	})
				// }
				reslove(res.data)
			},
			fail: (msg) => {
				uni.hideLoading()
				reject('请求失败')
			}
		})
	})
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
})



export default request
