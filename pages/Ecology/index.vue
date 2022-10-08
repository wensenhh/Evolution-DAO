<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="ecology">
				<view class="title">ED</view>
				<view class="text mt20">{{ $t('Ecology.ed') }}</view>
			</view>
			
			<view class="text-c fons-14">
				{{ $t('Ecology.more') }}
				
				<view class="flex mb50 mt16">
					<u--image :showMenuByLongpress='false' :src="background" width="600rpx" height="316rpx" radius='10rpx' />
				</view>
				
				<view class="understand">{{ $t('Ecology.understand') }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import background from '@/static/image/Ecology-back.png'
	export default {
		data() {
			return {
				background,
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
		.ecology {
			margin: 40rpx 0 90rpx;
			padding: 46rpx 36rpx 36rpx;
			background: #1A2B45;
			border: 2rpx solid rgba(111.00000098347664, 168.0000051856041, 254.00000005960464, 1);
			// border-image: linear-gradient(180deg, rgba(111.00000098347664, 168.0000051856041, 254.00000005960464, 1), rgba(5.000000176951289, 61.00000016391277, 149.00000631809235, 1)) 1 1;
			// clip-path: inset(0 round 2rpx);
			border-radius: 20rpx;
			.title {
				font-size: 48rpx;
				font-weight: bold;
				text-align: center;
			}
			.text {
				color: #3A78C7;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
		
		.understand {
			color: #478CF4;
			text-decoration: underline;
			line-height: 24rpx;
			cursor: pointer;
		}
	}
</style>
