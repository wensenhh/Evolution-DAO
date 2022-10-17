const tools = {};
import clipboard from "@/components/clipboard/clipboard.js"
import copy from '@/components/clipboard/h5-copy';
// 后退
tools.back = (step) => {
	uni.navigateBack({
		delta: step
	});
};
// 成功执行后返回
tools.setTimeout = (second, delta) => {
	setTimeout(() => {
		uni.navigateBack({
			delta
		});
	}, second)
};

// 暂未开放
tools.noOpen = () => {
	if(uni.getStorageSync('langLZ') == 'en') {
		uni.showToast({
			title: 'Not yet open!',
			duration: 2000,
			icon: "none"
		})
	} else {
		uni.showToast({
			title: '暂未开放！',
			duration: 2000,
			icon: "none"
		})
	}
};
tools.phoneSplit = (tel) => {
	if(!!tel) return tel.substr(0, 3) + '****' + tel.substr(7);
}

tools.nameSplit = (name) => {
	if(!!name) return name.substr(0, 1) + '*' + name.substr(2);
}
tools.walletAddressSplit = (str) => {
	if(!!str) return str.substr(0, 10) + '****' + str.substr(-10);
}
tools.walletAddress_split = (str) => {
	if(!!str) return str.substr(0, 5) + '****' + str.substr(-5);
}
// 复制
uni.clipboard = clipboard
tools.copy = (val) => {
	uni.clipboard.setText(val)
	if(uni.getStorageSync('langLZ') == 'en') {
		uni.showToast({
			title: 'Copied Successfully!',
			duration: 2000,
			icon: "none"
		})
	} else {
		uni.showToast({
			title: '复制成功！',
			duration: 2000,
			icon: "none"
		})
	}
	
}
tools.h5Copy = (val, name = '',bool=false) => {
	copy(val)
	if(uni.getStorageSync('langLZ') == 'en') {
		if(bool){
			return true
		}
		uni.showToast({
			title: name + '\xa0\xa0' +'Copied Successfully!',
			duration: 2000,
			icon: "none"
		})
	} else {
		if(bool){
			return true
		}
		uni.showToast({
			title: name + '复制成功！',
			duration: 2000,
			icon: "none"
		})
	}
}
tools.toast = (val) => {
	uni.showToast({
		title: val,
		icon: "none",
		duration: 2000,
	})
}
tools.jump = (url, data) => {
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	uni.navigateTo({
		url
	})
}
export function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''
}
tools.jumpTo = (path, value1, value2, value3) => {
	uni.switchTab({
		url: path + '?=' + '&value1=' + value1 + '&value2=' + value2 + '&value3=' + value3
	})
}
tools.formatTime = (value, type) => {
	var dataTime = "";
	var data = new Date();
	data.setTime(value);
	var year = data.getFullYear();
	var month_temp = data.getMonth() + 1;
	var month = month_temp < 10 ? '0' + month_temp : month_temp;
	var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
	var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
	var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
	var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
	if (type == "YMD") {
		dataTime = year + "-" + month + "-" + day;
	} else if (type == "YMDHMS") {
		dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else if (type == "HMS") {
		dataTime = hour + ":" + minute + ":" + second;
	} else if (type == "YM") {
		dataTime = year + "-" + month;
	}
	return dataTime; //将格式化后的字符串输出到前端显示
}
tools.formatTime2 = (value) => {
		var timeValue = value.replace(/-/g, "/");
		var T_pos = timeValue.indexOf('T');
		var year_month_day = timeValue.substr(0, T_pos);
		var hour_minute_second = timeValue.substr(T_pos + 1, 8);
		var new_datetime = year_month_day + " " + hour_minute_second;
		var dateee = new Date(new_datetime).toJSON();
		var sjc = new Date(dateee).getTime();
		var chinaT = sjc + 8 * 3600 * 1000;
		var date = tools.formatTime(chinaT, 'YMDHMS');
		return date;
	},
	tools.number = (value, type) => {
		if (value == null || value == '') {
			value = 0;
		}
		//处理科学计数法
		value = value.toFixed(8);
		var arr = (value + "").split(".");
		var a1 = arr[0];
		var a2 = 0;
		if (arr.length > 1) {
			a2 = arr[1];
			if (a2.length > type) {
				a2 = a2.substring(0, type);
			}
		}
		value = Number(a1 + "." + a2);
		return Number(value).toFixed(type)
	}

tools.prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

export default tools
