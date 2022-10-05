import App from './App'
import Vue from 'vue'
import store from './store'
import uView from "uview-ui"
Vue.use(uView);
uni.$u.config.unit = 'rpx'

import share from '@/common/mixin'
Vue.mixin(share)

import * as filters from '@/utils/filter'

import Header from '@/components/Header/index'
Vue.component('myHeader', Header)

import i18n from './locale/index'

Vue.config.productionTip = false

App.mpType = 'app'

// 手机端的弹框提示
Vue.prototype.$msg = function(msg, flag) {
	// console.log(flag)
	if (!flag) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1500
		})
		return;
	}
	uni.showToast({
		title: msg,
		duration: 1500
	})
},
	
// 缓冲加载中
Vue.prototype.$load = function(msg) {
	uni.showLoading({
		title: msg || '加载中...',
		mask: true
	})
}
/* 全局复制方法 */
Vue.prototype.$copy = function(msg) {
	uni.setClipboardData({
		data: msg, //要被复制的内容
		success: () => { //复制成功的回调函数
			uni.showToast({ //提示
				title: '复制成功'
			})
		}
	});
}
/* 全局跳转方法  路径 flag 跳转方法  */
Vue.prototype.$jump = function(path, flag = 1) {
	if (flag == 1) {
		return uni.navigateTo({
			url: path
		})
	}
	if (flag == 2) {
		return uni.switchTab({
			url: path
		})
	}
	if (flag == 3) {
		return uni.reLaunch({
			url: path
		})
	}
	if (flag == 4) {
		return uni.redirectTo({
			url: path
		})
	}
}

// 封装全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

const app = new Vue({
    ...App,
	store,
	i18n
})
app.$mount()
