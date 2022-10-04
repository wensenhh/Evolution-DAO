<template>
	<view class="">
		<!-- 更新用户信息 -->
		<button type="primary" class="mline" @click="login(true)">更新用户信息</button>
		<!-- 通过微信弹窗拉取用户手机号登陆 -->
		<button class="member1" open-type="getPhoneNumber" @getphonenumber="getPhone" v-if="!userType && !token">
			<view class=" w100 ">
				<image src="http://dy.qiyangsci.com/img/member.png"
					style="width:30rpx;height:38rpx;margin-top: 16rpx;"></image>
				<view style="margin-top: -20rpx;">会员登录</view>
			</view>
		</button>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			/* 登录 */
			login(flag) {
				const _this = this;
				uni.getUserProfile({
					desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let info = res
						console.log('getUserProfile', res);
						uni.showLoading({
							title: '同步信息中...',
							mask: true
						})
						this.showUser = false
						uni.login({
							success: (res) => {
								let params = {
									code: res.code,
									encryptedData: info.encryptedData,
									iv: info.iv
								}
								if (this.sid) {
									params.userId = this.sid
								}
								updataWechat(params).then(res => {
									uni.hideLoading()
			
									uni.setStorageSync('isLogin', true)
									// console.log('授权', res.data.kefu.id, res
									// 	.data)
									if (res.data.kefu) {
										res.data.barUserInfo.kefuId = res
											.data.kefu
											.id // 绑定的客服
									}
			
									uni.setStorageSync('userInfo', res.data
										.barUserInfo)
									_this.refarsh = true
									_this.userInfo = res.data.barUserInfo
									_this.userType1 = _this.userInfo
										.userType
			
									_this.userType = this.userInfo.userType
			
									_this.getMoney()
									if (!_this.userInfo.member) {
										_this.showkf = true
										return;
									}
								})
							},
							fail: (err) => {
								uni.hideLoading()
								console.log('err', err);
							}
						})
					}
				})
			}
		
			/* 获取用户手机号 */
			getPhone(e) {
				let encryptedData = e.detail.encryptedData
				let iv = e.detail.iv
				this.$load()
				uni.checkSession({
					success: (res) => {
						console.log('登录', res)
			
						let params = {
							code: this.code,
							encryptedData: encryptedData,
							iv: iv
						}
						if (this.sid) {
							params.userId = this.sid
						}
						login(params).then(res => {
							if (res.code == 200) {
								uni.hideLoading()
								uni.setStorageSync('token', res.data.token)
								this.token = res.data.token
			
								if (res.data.barUserInfo) {
									uni.setStorageSync('isLogin', true)
									if (res.data.kefu) {
										res.data.barUserInfo.kefuId = res.data.kefu
											.id // 绑定的客服
									}
									uni.setStorageSync('userInfo', res.data
										.barUserInfo)
									this.userInfo = res.data.barUserInfo
									this.userType1 = this.userInfo.userType
									this.userType = this.userInfo.userType
									this.getMoney()
									this.$msg(res.msg, 1)
								} else {
									this.showGetUser()
									// this.login()
									// this.$msg('登录成功!点击完善头像信息!')
								}
							} else {
								this.$msg(res.msg)
							}
						})
					},
					fail: () => {
						uni.login({
							success: (res) => {
								let code = res.code
								this.code = res.code
								let params = {
									code: code,
									encryptedData: encryptedData,
									iv: iv
								}
								login(params).then(res => {
									if (res.code == 200) {
										uni.hideLoading()
										uni.setStorageSync('token', res
											.data
											.token)
										this.token = res.data.token
			
										if (res.data.barUserInfo.id) {
											uni.setStorageSync('isLogin',
												true)
											if (res.data.kefu) {
												res.data.barUserInfo
													.kefuId = res.data.kefu
													.id // 绑定的客服
											}
			
											uni.setStorageSync('userInfo',
												res
												.data
												.barUserInfo)
											this.userInfo = res.data
												.barUserInfo
											this.userType1 = this.userInfo
												.userType
											this.$msg(res.msg, 1)
											this.getMoney()
										} else {
											// let that = this
											this.showGetUser()
											// this.login()
											// this.$msg('登录成功!点击完善头像信息!')
										}
			
									} else {
										this.$msg(res.msg)
									}
			
								})
							},
						})
					}
				})
				console.log(e.detail)
			},
		
			// 跳转页面
			updateUser_daw() {
				uni.showModal({
					title:'提示!',
					content:`亲，授权账号信息后才能正常使用小程序功能`,
					showCancel:true,
					cancelText:'取消',
					success: (res) => {
						if(res.confirm){
							uni.getUserProfile({
								desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
								success: (res) => {
							
									// uni.setStorageSync('current', 0)
									this.userInfo = wx.getStorageSync('userInfo', res.userInfo)
									wx.setStorageSync('hasUserInfo', true);
									let data = {
										avatar: res.userInfo.avatarUrl,
										// city: res.userInfo.city,
										longitude:this.tude.lng,
										latitude:this.tude.lat,
										nickname: res.userInfo.nickName,
									}
									updateUser(data).then(res=>{
										if(res.msg == "更新成功"){
											uni.switchTab({
												url: "/pages/home/index"
											})
										}
									})
									console.log(data,"yyyafaw")
								},
								fail: (err) => {
									console.log('err', err);
								}
							})
						}else{
							
						}
					}
				})
			},
			
			// 获取手机号
			getPhoneNumber(e) {
				if (!this.checked) {
					uni.showToast({
						title: "请阅读并勾选底部协议",
						icon: 'none'
					})
					return
				}
				this.data1 = e.detail
				console.log('第一次', e.detail)
				var _that = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
					wx.showToast({
						title: '取消授权!',
						duration: 5000,
						icon: 'none',
					});
				} else {
			
					uni.showLoading({
						title: '加载中...',
					})
			
					uni.login({
						success(res) {
							let code = res.code
							if (res.code) {
								//发起网络请求
								get_openid({
									"code": code,
								}).then(res => {
									// 请求成功后获取openid和session_key
									console.log(res.data, 'ww')
									let userkey = res.data
									let params = {
										// "user_id": userkey.id,
										"spread_uid": _that.uid,
										"openid": userkey.openid,
										"session_key": userkey.session_key,
										"iv": _that.data1.iv,
										"encryptedData": _that.data1.encryptedData
									}
			
									console.log('第二次11111', params)
									getphone(params).then(res => {
										console.log('res', res)
										let data = res.data
										uni.hideLoading()
										uni.setStorageSync('login', true)
										uni.setStorageSync('token', data.token)
										uni.setStorageSync('userInfo', data.userInfo)
										console.log('用户信息', uni.getStorageSync('userInfo'))
										// 请求成功后获取openid和session_key
										console.log(data, 'phone12323213231')
										if (data.token) {
											_that.updateUser_daw()
											// console.log(value); 
											// uni.navigateTo({
											// 	url: '/pages/home/index'
											// })
										}else{
											
										}
									})
			
								})
			
							} else {
			
								uni.hideLoading()
								console.log('登录失败！' + res.errMsg)
							}
						},
						fail() {
							uni.hideLoading()
							console.log("获取用户信息失败");
						}
					})
				}
			
			},
		
		},
	}
</script>

<style>
</style>