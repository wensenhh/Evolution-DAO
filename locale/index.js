import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from './en.json'
import zh from './zh.json'

Vue.use(VueI18n)
export default new VueI18n({
	locale: uni.getStorageSync('locale') || 'en',
	messages: {
		en,
		zh
	}
})
