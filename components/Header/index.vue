<template>
	<view class="header-con flex-between">
		<view>
			<u--image v-if="flag == 1" :showMenuByLongpress='false' :src="require('@/static/image/logo.png')" width="104rpx" height="104rpx" />
			<u-icon v-else name="arrow-left" color="rgba(255,255,255,0.7)" size="32" bold @click='handleBack'></u-icon>
		</view>
		<view class="flex-a">
			<u--image :showMenuByLongpress='false' :src="require('@/static/image/back.png')" width="44rpx" height="44rpx" />
			<view class="ml12 mr12">{{address | hideaddress(address)}}</view>
			<view class="language flex" @click="handleSwitch">{{ $t('local') }}</view>
		</view>
	</view>
</template>

<script>
	import { getStorage, setStorage } from '@/utils/cache'
	import { ANGELLONE_LOCAL } from '@/config/config'
	export default {
		props: {
			flag: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				curLocal: getStorage(ANGELLONE_LOCAL),
				address: ''
			}
		},
		mounted() {
			this.getAddress();
		},
		methods: {
			getAddress(){
				if (window.ethereum) {
				    window.ethereum.enable().then((res) => {
						console.log("当前钱包地址:" + res[0]);
						this.address = res[0];
						uni.setStorageSync('wallet_address', res[0]);
					});
				} else {
				    console.log("请安装MetaMask钱包");
				}
			},
			// 返回上一层
			handleBack() {
				uni.navigateBack()
			},
			
			handleSwitch() {
				uni.showModal({
					content: `是否确认切换为 ${this.curLocal == 'zh' ? 'English' : '简体中文'}`,
					confirmText: this.curLocal == 'zh' ? '确定' : 'confirm',
					cancelText: this.curLocal == 'zh' ? '取消' : 'cancel',
					success: ({ confirm }) => {
						if(!confirm) return
						this.$store.dispatch('setLocal', this.curLocal == 'zh' ? 'en' : 'zh')
						this.$msg('切换成功', 1)
						location.reload()
					}
				})
				
				
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