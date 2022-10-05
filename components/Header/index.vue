<template>
	<view class="header-con flex-between">
		<view>
			<u--image v-if="flag == 1" :showMenuByLongpress='false' src='https://cdn.uviewui.com/uview/album/1.jpg' width="104rpx" height="104rpx" />
			<u-icon v-else name="arrow-left" color="rgba(255,255,255,0.7)" size="32" bold @click='handleBack'></u-icon>
		</view>
		<view class="flex-a">
			<u--image :showMenuByLongpress='false' src='https://cdn.uviewui.com/uview/album/1.jpg' width="44rpx" height="44rpx" />
			<view class="ml12 mr12">0x...5004</view>
			<view class="language flex">{{ $t('local') }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			flag: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 返回上一层
			handleBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header-con {
		height: 104rpx;
		
		.language {
			width: 48rpx;
			height: 48rpx;
			background: #3A78C7;
			border-radius: 50%;
			font-weight: bold;
			color: #0E1E2D;
		}
		
	}
</style>