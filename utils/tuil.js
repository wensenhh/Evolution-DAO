
/**
 * 处理时间戳转为时间格式
 * @param { * 
	 timer 要转换的时间戳
	 flag 转换后返回的格式类型 默认为1
	}
 * @return flag == 1 ? yyyy-mm-dd hh:MM:ss : yyyy-mm-dd hh:MM
 * */
export function getDays(timer, flag = 1) {
	// let dd = timer * 1000
	let dd = timer
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(dd);
	let Y = date.getFullYear()
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
	
	if(flag == 1) return `${Y}-${M}-${D} ${h}:${m}:${s}`
	  else return `${Y}-${M}-${D} ${h}:${m}`
	
}

/**
 * 获取当前的格式化时间
 * @param {*
	 new Date()获取当前时间
	 flag 格式化后返回的格式类型 默认为1
	}
 * @return flag == 1 ? yyyy-mm-dd hh:MM:ss : yyyy-mm-dd hh:MM
 * */
export function gettime(flag = 1) {
	let date = new Date(),
	  Y = date.getFullYear(),
	  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
	  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate(),
	  h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()),
	  m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
	  s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	if(flag == 1) return `${Y}-${M}-${D} ${h}:${m}:${s}`
	  else return `${Y}-${M}-${D} ${h}:${m}`
}

/**
 * 排序的函数
 * */
export function Sort(obj) {
	var newkey = Object.keys(obj).sort();
	//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
		newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
	}
	return newObj; //返回排好序的新对象
}


export function gettimer1() {
	let data = new Date()
	let tt = data.getTime() / 1000
	return tt.toFixed(0)
}

