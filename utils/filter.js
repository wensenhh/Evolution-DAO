import Vue from 'vue'

/**
 * 	过滤时间戳
 *  @param originVal 要转换的时间的时间戳
 *  @param type 展示的日期格式1:yy-mm-dd 2:yy-mm-dd hh:mm:ss 默认为第二种格式
 */
Vue.filter('dataFormat', (originVal, type = 2) => {
	var date = new Date(originVal);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();

	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	if (type == 1) { //yy-mm-dd 格式
		return y + '-' + m + '-' + d
	} else if (type == 2) { // yy-mm-dd hh:mm:ss
		// return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		return `${y}-${m}-${d} ${h}:${minute}:${second}`
	}
})

/**
 * 也是过滤时间 有时候ios和安卓会有区别
 * @param originVal 要转换时间的时间戳
 */
Vue.filter('iosTime', (originVal) => {
	var date = new Date(originVal.replace(/-/g, "/"));
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();

	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
})

/**
 * 计算距离当前过去了多久
 * @param timestamp 计算的时间 yyyy-MM-dd HH:mm:ss
 */
Vue.filter('diffTime', (timestamp) => {
	let new_date = new Date() //新建一个日期对象，默认现在的时间
	let old_date = new Date(timestamp) //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
	if(old_date > new_date) return
	let difftime = parseInt((new_date - old_date) / 1000) // 计算时间差,并把毫秒转换成秒
	let minutes = parseInt(difftime / 60) // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
	let hours = parseInt(minutes / 60) // 小时 60*60 总小时数-过去的小时数=现在的小时数 
	let days = parseInt(hours / 24) // 天  24*60*60*1000 
	let moon = parseInt(days / 30) // 月
	let year = parseInt(moon / 12) // 年
	
	if(difftime < 60) return difftime + '秒前'
	else if(minutes < 60) return minutes + '分钟前'
	else if(hours < 24) return hours + '小时前'
	else if(days < 30) return days + '天前'
	else if(moon < 12) return moon + '个月前'
	else return year +  '年前'
})

/**
 * 隐藏手机号 展示159****9137
 * @param phoneNumber 要隐藏的手机号
*/
Vue.filter('hidePhoneNumber', (phoneNumber) => {
	if(!phoneNumber) return
	const tel = phoneNumber + '', start = tel.substr(0,3), end = tel.substr(-4)
	return start + '****' + end
})
