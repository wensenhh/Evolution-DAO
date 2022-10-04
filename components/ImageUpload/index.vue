<template>
	<view class="upload">
		<u-upload
			:fileList="defaultFileList"
			@afterRead="afterRead"
			@delete="deletePic"
			:multiple='multiple'
			:maxCount="count"
			:accept='accept'
			:deletable='deletable'
		>
			<slot />
		</u-upload>
	</view>
</template>

<script>
	import { HTTP_REQUEST_URL } from '@/config/app'
	import { getToken } from '@/utils/cache'
 	export default {
		props: {
			accept: {
				type: String,
				default: 'image'
			},
			count: {
				type: Number,
				default: 5
			},
			fileList: {
				type: Array,
				default: []
			},
			multiple: {
				type: Boolean,
				default: true
			},
			deletable: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				uploadUrl: HTTP_REQUEST_URL + 'mini/file/upload', // 上传文件接口
				// fileList: [],
				deleteStatus: true,
			}
		},
		computed: {
			defaultFileList: {
				get() {
					return this.fileList
				},
				set(newList) {
					this.$emit('update:fileList', newList)
				}
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				uni.showModal({
					content: '确认删除已上传的图片吗？',
					confirmColor: '#009B4D',
					success: ({ confirm }) => {
						confirm && (
							this.defaultFileList.splice(event.index, 1)
							// this.$set(this, 'defaultFileList', this.defaultFileList)
						)
					}
				})
			},
			
			// 新增图片
			async afterRead(event) {
				this.$load('上传中...')
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.defaultFileList.length
				lists.map((item) => {
					this.defaultFileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
					// this.$set(this, 'defaultFileList', this.defaultFileList)
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.defaultFileList[fileListLen]
					this.defaultFileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					// this.$set(this, 'defaultFileList', this.defaultFileList)
					fileListLen++
				}
				
				uni.hideLoading()
				this.$emit('success', this.defaultFileList)
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.uploadUrl,
						filePath: url,
						name: 'file',
						// formData: {
						// 	user: 'test'
						// },
						header: {
							// 'content-type': 'multipart/form-data',
							'Authorization': getToken()
						},
						success: (res) => {
							setTimeout(() => {
								// resolve(res.data.url)
								resolve(JSON.parse(res.data).data?.url) // 成功的回调为json 转换拿到url 返回
							}, 1000)
						}
					})
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>