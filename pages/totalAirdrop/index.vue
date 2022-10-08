<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="lists">
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.total') }}</view>
							<view>{{ '0' }}</view>
						</view>
						<view class="text-r">
							<view class='mb10'>{{ $t('Airdrop.airdropList.unlocked') }}</view>
							<view>{{ '0' }}</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.Cumulative') }}</view>
							<view class='c-478CF4 textd-un'>{{ $t('Airdrop.airdropList.see') }}</view>
						</view>
						<view class="text-r">
							<view class='mb10'>{{ $t('Airdrop.airdropList.Yesterday') }}</view>
							<view class='c-478CF4 textd-un'>{{ $t('Airdrop.airdropList.see') }}</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.CumulativeLock') }}</view>
							<view>{{ '0.0000' }}</view>
						</view>
						<view class="text-r">
							<view class='mb10'>{{ $t('Airdrop.airdropList.YesterdayLock') }}</view>
							<view>{{ '0.0000' }}</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.directNum') }}</view>
							<view>{{ '0' }}</view>
						</view>
						<view class="text-r">
							<view class='mb10'>{{ $t('Airdrop.airdropList.teamNum') }}</view>
							<view>{{ '0' }}</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.todayBuy') }}</view>
							<view>0ED</view>
						</view>
						<view class="text-r c-478CF4">
							<view class='mb10'>{{ $t('Airdrop.airdropList.Extractable') }}</view>
							<view>0ED</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.UnlockedNum') }}</view>
							<view class="c-478CF4">0ED</view>
						</view>
						<view class="text-r c-478CF4">
							<view class='mb10'>{{ $t('Airdrop.airdropList.Mone') }}>></view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' src="https://cdn.uviewui.com/uview/album/1.jpg" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.beOverdue') }}</view>
							<view>0</view>
						</view>
						<view class="text-r c-478CF4">
							<view class='mb10'>{{ $t('Airdrop.airdropList.look') }}>></view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
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
		.lists {
			margin-top: 72rpx;
			.list {
				padding-bottom: 32rpx;
				border-bottom: 2rpx solid #7DB1FF;
				.textd-un {
					text-decoration: underline;
				}
			}
		}
	}
</style>
