<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="main-top">
				<view class="flex-between mb20">
					<view class="fons-16">{{ $t('Community.prop.prop') }}</view>
					<u-button type="primary" :text="$t('Community.prop.Publish')" color='#478CF4' :customStyle="{
						borderRadius:'6rpx',width: '120rpx', height:'52rpx',margin:0
					}"></u-button>
				</view>
				
				<u--input :placeholder="$t('Community.prop.title')" border="none" v-model="proposal.title" color='#fff'></u--input>
				
				<u--textarea v-model="proposal.content" :placeholder="$t('Community.prop.content')" autoHeight count :maxlength='255' :customStyle="{
					height:'200rpx',background:'#1A2B45',color:'#fff'
				}" border='none'></u--textarea>
				
				<ImageUpload :fileList.sync='fileList'>
					<view class="upload-image flex">
						<u-icon name="plus" color="#fff" size="80"></u-icon>
					</view>
				</ImageUpload>
				
				<view class="bottom flex-between">
					<view class="flex-a">
						<u--image :src="require('@/static/image/topic.png')" width="40rpx" height="40rpx"></u--image>
						<text class="ml8">{{ $t('Community.prop.topic') }}</text>
					</view>
					<view class="tips">{{ $t('Community.prop.like') }}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import ImageUpload from '@/components/ImageUpload/index'
	export default {
		components: {
			ImageUpload
		},
		data() {
			return {
				proposal: {
					title: void 0,
					content: void 0,
				},
				fileList: [],
			}
		},
		onLoad() {
		},
		computed: {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.container {
		.main-top {
			margin-top: 72rpx;
			padding: 50rpx 46rpx 400rpx;
			border: 2rpx solid #6FA8FE;
			background-color: #1A2B45;
			border-radius: 20rpx;
			
			.u-textarea {
				.u-textarea__count {
					background-color: #1A2B45 !important;
				}
				.uni-textarea-wrapper {
					height: 200rpx !important;
					.uni-textarea-textarea {
						color: #fff;
					}
				}
			}
			
			.upload-image {
				height: 160rpx;
				width: 160rpx;
				background: rgba(54,98,236,0.5);
				margin: 60rpx 0 50rpx;
			}
			.bottom {
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #1364BF;
				.tips {
					color: #95B1FF;
				}
			}
		}
	}
</style>
