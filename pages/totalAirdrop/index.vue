<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="lists">
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/1.png')" width="84rpx" height="84rpx"
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
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/2.png')" width="84rpx" height="84rpx"
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
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/2.png')" width="84rpx" height="84rpx"
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
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/3.png')" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>{{ $t('Airdrop.airdropList.directNum') }}</view>
							<view>{{ straightnum }}</view>
						</view>
						<view class="text-r">
							<view class='mb10'>{{ $t('Airdrop.airdropList.teamNum') }}</view>
							<view>{{ '0' }}</view>
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/4.png')" width="84rpx" height="84rpx"
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
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/5.png')" width="84rpx" height="84rpx"
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
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/5.png')" width="84rpx" height="84rpx"
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
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/5.png')" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>待解押的ED数量：</view>
							<view>{{ detainED }}</view>
						</view>
						<view class="text-r c-478CF4">
							<!-- <view class='mb10'>{{ $t('Airdrop.airdropList.look') }}>></view> -->
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/5.png')" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>可领取的ED数量</view>
							<view>{{Canreceive}}</view>
						</view>
						<view class="text-r c-478CF4">
							<!-- <view class='mb10'>{{ $t('Airdrop.airdropList.look') }}>></view> -->
						</view>
					</view>
				</view>
				
				<view class="list flex-a mb20">
					<u-image :showMenuByLongpress='false' :src="require('@/static/image/5.png')" width="84rpx" height="84rpx"
					 radius='6rpx'></u-image>
					<view class="flex-between flex-1 ml10">
						<view class="text-l">
							<view class='mb10'>已领取的ED数量</view>
							<view>{{alreadyed}}</view>
						</view>
						<view class="text-r c-478CF4">
							<!-- <view class='mb10'>{{ $t('Airdrop.airdropList.look') }}>></view> -->
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		usdtaddr,
		edaddr,
		edidoaddr,
		edabi,
		edidoabi
	} from "@/common/abi/ed";
	export default {
		data() {
			return {
				address: uni.getStorageSync('wallet_address'),
				alreadyed: 0,
				straightnum: 0,
				Canreceive: 0,
				detainED: 0
			}
		},
		onLoad() {
			if(window.web3.utils){
				this.getinfo()
			}
		},
		computed: {
		},
		methods: {
			getinfo(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.hadTakedReward(this.address)
					.call()
					.then((res) => {
						console.log(res)
						this.alreadyed = res
					});
				MyContract.methods
					.getCanReward(this.address)
					.call()
					.then((res) => {
						console.log(res)
						this.Canreceive = res
					});
				MyContract.methods
					.idoJoinInfoMap(this.address)
					.call()
					.then((res) => {
						// let tempdata = this.subtract(parseInt(res.rewardAmount),parseInt(res.outAmount))
						// this.detainED = tempdata.d[0] / 2
						console.log(tempdata)
					});
				MyContract.methods
					.getReferrer(this.address)
					.call()
					.then((res) => {
						if(res !== '0x0000000000000000000000000000000000000000') {
							MyContract.methods
								.countUsersOfReferrer(res)
								.call()
								.then((res) => {
									console.log(res)
									this.straightnum = res
								});
						}
					});
			},
			//减法
			    subtract(a,b){
			        return this.$math.subtract(this.$math.bignumber(a), this.$math.bignumber(b));
			    },
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
