export default {
	data() {
		return {
		   //这个share可以在每个页面的data中设置相应的转发内容
			share:{
				title:'...小程序',
				path:'/pages/index/index',
				
			}
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			// imageUrl: this.share.imageUrl,
			// desc: this.share.desc,
			// content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	}
}

