<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="ed-main mt20 text-c">
				<view class="fons-24 mb8">{{ $t('Mine.total') }}</view>
				<view class="mb16 flex">
					<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="220rpx" height="120rpx"></u--image>
				</view>
				
				<view class="main-num fonw-bold">0</view>
				<view class="ml8 mr8">
					<u-button type="primary" :text="$t('Mine.seeBtn')" color='#478CF4' :customStyle="{
						borderRadius:'16rpx',margin:'48rpx 0 40rpx',height:'92rpx'
					}" @click="$jump('/pages/become/index')"></u-button>
				</view>
				<view class="flex-between">
					<view class="">{{ $t('Mine.number') }}</view>
					<view class="">{{ 0 }}</view>
				</view>
			</view>
			
			<view class="lists flex-between mt20">
				<view class="list" v-for="(item,index) in lists" :key="item.id">
					<view class="flex-between">
						<view>{{ item.title }}</view>
						<view>+</view>
					</view>
					<view class="mt16">{{ item.data }}</view>
				</view>
			</view>
			
			<view class="mt20 data-list">
				<view class="pt40 flex-around">
					<view :class="[item.id == curTabs ? 'active' : '']" v-for="(item,index) in tabs" :key="item.id"
					 @click="curTabs = item.id">{{ $t(item.title) }}</view>
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
				lists: [
					{ id: 1, title: 'EDT', data: '0.0000' },
					{ id: 2, title: 'ED', data: '0.0000' },
					{ id: 3, title: 'EDNFT', data: '0.0000' },
				],
				tabs: [
					{ id: 1, title: 'Mine.yes', data: '0.0000' },
					{ id: 2, title: 'Mine.director', data: '0.0000' },
				],
				curTabs: 1,
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
			border: 3rpx solid #2875E4;
			border-radius: 20rpx 20rpx 0 0;
			padding: 46rpx 36rpx 40rpx;
			
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
		
		.lists {
			.list {
				width: 244rpx;
				height: 182rpx;
				border-radius: 20rpx;
				background: url('https://cdn.uviewui.com/uview/album/1.jpg') center no-repeat;
				padding: 12rpx 30rpx 0;
			}
		}
		
		.data-list {
			height: 496rpx;
			background: #1A2B45;
			border-radius: 20rpx;
			.active {
				color: #478CF4;
			}
		}
	}
</style>
