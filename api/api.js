import request from "@/utils/request.js";

/**
 * 之前的请求格式 已弃用并优化
 * noAuth 并没有做什么处理 就加了个loading 已关闭 继续添加无效
 */
// export function login(data) {
//     return request.post("/bar/user/wxapp/auth", data, {
//         noAuth: true
//     });
// }

/**
 * 新写法 添加一个{loading} 加个统一处理的loading而已 某些场景需要时触发
 * export const wxlogin = data => request.post("", data, {loading:true}) // 登陆 - 需要请求loading
 * export const getTokenStatus = data => request.get('', data, {isModal:false}) // 查询token状态 - 当401的时候不需要弹出去登陆
 *  @param {*} data 参数
 * 	@param {
		loading:true 是否需要全局loading 默认false
		isModal:false 当401时是否需要全局弹出modal 默认true
	} 
 */
/**
 *  用户相关
 */



/**
 * 其他
 */


