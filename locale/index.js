import VueI18n from 'vue-i18n'
import Vue from 'vue'
import store from '@/store/index'
import en from './en.json'
import zhHans from './zh.json'


Vue.use(VueI18n)

export default new VueI18n({
	locale: store.getters.local, // uni.getLocale()
	messages: {
		en,
		'zh': zhHans
	}
})
