<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="ed-main mt20 text-c">
				<view class="fons-18 fonw-bold">{{ $t('Election.title') }}</view>
				<view class="fons-10 mt5 mb8">{{ $t('Election.text') }}</view>
				<view class="line-etc" />
				<view class="mt16 mb16">{{ $t('Election.etc') }}</view>
				<view class="main-num fonw-bold">0</view>
				<view class="ml8 mr8">
					<u-button type="primary" :text="$t('Election.bocomeEtc')" color='#478CF4' :customStyle="{
						borderRadius:'16rpx',margin:'48rpx 0 44rpx',height:'72rpx'
					}" @click="$jump('/pages/become/index')"></u-button>
				</view>
				<view class="flex-between">
					<view class="">{{ $t('Election.number') }}</view>
					<view class="">{{ 0 }}</view>
				</view>
			</view>
			
			<view class="etc-list">
				{{ $t('Election.etcList') }}
				
				<u-empty v-if="!etcList.length" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				etcList: [],
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
	.container {
		.ed-main {
			// height: 672rpx;
			background: linear-gradient(136deg, #70A9FF 0%, #0057B3 53%, #063087 100%);
			// background: url('@/static/image/Election-back.png') no-repeat;
			border: 3rpx solid #2875E4;
			border-radius: 20rpx 20rpx 0 0;
			padding: 20rpx 36rpx 50rpx;
			
			.line-etc {
				margin: 0 16rpx;
				border: 2rpx solid #7CB0FF;
			}
			.main-num {
				height: 156rpx;
				line-height: 156rpx;
				background: linear-gradient(180deg, #2D7FE6 10%, #064C9A 100%);
				border-radius: 20rpx;
				padding: 0 32rpx;
				font-size: 80rpx;
				display: inline-block;
			}
		}
		
		.etc-list {
			margin-top: 48rpx;
		}
	}
	
</style>
