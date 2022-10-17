<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="ed-main mt20 text-c">
				<view class="flex-between mb30">
					<view class="flex-a">
						<u--image :showLoading="true" :src="require('@/static/image/edtlogo.png')" width="52rpx" height="52rpx"></u--image>
						<text class="ml10">ED</text>
					</view>
					<view class="flex-a">
						<text class="mr5">{{ $t('Mine.edt.info') }}</text>
						<u-icon name="arrow-right" color="rgba(255,255,255,0.6)" size="28"></u-icon>
					</view>
				</view>
				<view class="line-etc" />
				<view class="flex-between mt20">
					<view class="flex-a">
						<u--image :showLoading="true" :src="require('@/static/image/money.png')" width="40rpx" height="40rpx"></u--image>
						<text class="ml10">{{ $t('Mine.edt.balance') }}</text>
					</view>
					<view>
						<view class="mb10">
							{{edblance}}
						</view>
						<view>
							≈$ {{ustdblance}}
						</view>
					</view>
				</view>
				
				<view class="btn posi-r">
					<view class="flex-a posi-a" style="position: absolute;right: 0;top: 25%;">
						<!-- <u-button type="primary" :text="$t('Mine.edt.Recharge')" color='#478CF4' :customStyle="{
							borderRadius:'10rpx',margin:'0 16rpx 0 0',height:'60rpx',width:'140rpx'
						}" @click="$jump('/pages/Recharge/index')"></u-button> -->
						<u-button type="primary" :text="$t('Mine.edt.Extract')" color='#478CF4' :customStyle="{
							borderRadius:'10rpx',margin:0,height:'60rpx',width:'140rpx'
						}" @click="$jump('/pages/Extract/index')"></u-button>
					</view>
				</view>
			</view>
			
			<!-- <view class="tabs-list mt50 h-50">
				<view class="text-c" v-for="(item,index) in tabsList" :key="item.id" @click="clickTabs(item)">
					<view :class="curTabs == item.id ? 'active' : ''">{{ $t(`Mine.edt.${item.title}`) }}</view>
					<view class="line-tabs flex mt10" v-if="curTabs == item.id"></view>
				</view>
			</view>
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" /> -->
			
		</view>
	</view>
</template>

<script>
	const Web3 = require("../../common/getWeb3");
	import {
		usdtaddr,
		edaddr,
		edidoaddr,
		edabi,
		edidoabi
	} from "@/common/abi/ed";
	import {
		abi
	} from "@/common/abi/bdd";
	export default {
		data() {
			return {
				tabsList: [
					{ id: 1, title: 'All' },
					{ id: 2, title: 'in' },
					{ id: 3, title: 'out' },
				],
				curTabs: 1,
				address: uni.getStorageSync('wallet_address'),
				edblance: 0,
				ustdblance: 0
			}
		},
		onLoad() {
			// this.getbalance()
			this.getubalance()
		},
		methods: {
			clickTabs(item) {
				this.curTabs = item.id
			},
			getbalance(){
				var web3 = window.web3
				var MyContract = new web3.eth.Contract(edabi, edaddr);
				MyContract.methods.balanceOf(this.address).call((err,
					res) => {
					let n = web3.utils.fromWei(res, "ether");
					this.edblance = Math.round(n * 1000) / 1000
					console.log(this.edblance)
				})
			},
			getubalance(){
				var that = this
				console.log(this.address)
				console.log(edidoaddr)
				var web3 = window.web3
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.getCanReward(this.address)
					.call()
					.then((res) => {
						console.log(res)
						let n = web3.utils.fromWei(res, "ether");
						this.edblance= Math.round(n * 1000) / 1000;
						that.getusdtnum(res)
					});
				
			},
			getusdtnum(num){
				console.log(num)
				var web3 = window.web3
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods.getUsdtAmount(num).call((err,
					res) => {
						console.log(res)
					let n = web3.utils.fromWei(res, "ether");
					this.ustdblance = Math.round(n * 10000000) / 10000000
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.ed-main {
			// height: 672rpx;
			background: linear-gradient(136deg, #70A9FF 0%, #0057B3 53%, #063087 100%);
			border: 3rpx solid #2875E4;
			border-radius: 20rpx;
			padding: 50rpx 30rpx 32rpx;
			
			.line-etc {
				margin: 0 16rpx;
				border: 2rpx solid #7CB0FF;
			}
			.btn {
				height: 94rpx;
			}
		}
		
		.tabs-list {
			display: flex;
			justify-content: space-around;
			border-bottom: 2rpx dashed #fff;
		}
		.line-tabs {
			height: 4rpx;
			width: 52rpx;
			background-color: #478CF4;
			display: inline-block;
		}
		.active {
			color: #478CF4;
		}
	}
</style>
