<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="main-top">
				<view class="text">
					{{ $t('Community.content') }}
				</view>
				
				<u-button type="primary" :text="$t('Community.pushBtn')" color='#478CF4' :customStyle="{
					borderRadius:'16rpx',width: '520rpx', height:'72rpx',marginTop:'40rpx'
				}" @click="$jump('/pages/proposal/index')"></u-button>
			</view>
			
			<view class="main-top">
				<view class="flex-around">
					<view class="btn bor-r8 flex" :class="[curBtn == item.id ? 'active' : '']" v-for="(item,index) in btnList"
					 :key="item.id" @click="curBtn = item.id">
						{{ $t('Community.' + item.title) }}
					</view>
				</view>
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" />
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curBtn: 1,
				btnList: [
					{ id: 1, title: 'start' },
					{ id: 2, title: 'Progress' },
					{ id: 3, title: 'Ended' },
				],
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
		.main-top {
			margin-top: 40rpx;
			padding: 40rpx 36rpx;
			border: 2rpx solid #6FA8FE;
			background-color: #1A2B45;
			border-radius: 20rpx;
			.text {
				color: #3A78C7;
				line-height: 20px;
				font-size: 26rpx;
			}
			
			.btn {
				width: 140rpx;
				height: 52rpx;
				background: #274573;
				color: rgba(255,255,255,0.6);
				font-size: 24rpx;
			}
			.active {
				background: #3662EC;
				color: #FFFFFF;
			}
		}
	}
</style>
