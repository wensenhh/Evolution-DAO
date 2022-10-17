<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="ed-main mt20">
				<view class="flex-between pl5 pr5 mb10">
					<view class="flex-a">
						<view class="line-ed mr5" />
						<text>{{ $t('Mine.edt.Recharge.curAddress') }}</text>
					</view>
					<!-- <view class="fons-12" style="color: rgba(255,255,255,0.6);">可提取ED:{{edblance}}</view> -->
				</view>
				<u--input :placeholder="address" :disabled="true" color='#fff' border="bottom"
				  v-model="recharge.adress"></u--input>
				  
				<view class="flex-a pl5 pr5 mb10 mt30">
					<view class="line-ed mr5" />
				  	<text>{{ $t('Mine.edt.Recharge.number2') }}</text>
				</view>
				<u--input :placeholder="$t('Mine.edt.Recharge.number2')" :disabled="true" color='#fff' border="bottom"
				    v-model="edblance"></u--input>
					
				<!-- <view class="flex-between pl5 pr5 mt40">
					<view class="flex-a">
						<view class="line-ed mr5" />
						<text>{{ $t('Mine.edt.Recharge.Formalities') }}</text>
					</view>
					<view class="fons-12 flex-a" @click="coinShow = true">
						<text>{{ recharge.coin }}</text>
					</view>
				</view> -->
			</view>
			
			<u-button type="primary" v-if="!approveFlag" @tap="ApproveEd" :text="$t('Mine.edt.Recharge.Allowance')" color='#478CF4' :customStyle="{
				margin:'60rpx 0 0',height:'84rpx'
			}" shape='circle'></u-button>
			<u-button type="primary" v-else @tap="extracted" :text="$t('Mine.edt.Recharge.extract')" color='#478CF4' :customStyle="{
				margin:'60rpx 0 0',height:'84rpx'
			}" shape='circle'></u-button>
			
		</view>
		
		<myPicter :show.sync='coinShow' :columns='coinList' @confirm="handleConfirm" />
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
	import web3utils from '@/common/web3Utils.js'
	import myPicter from '@/components/Picker/index'
	export default {
		components: {
			myPicter
		},
		data() {
			return {
				recharge: {
					adress: void 0,
					edtq: void 0,
					coin: '0EDNFT'
				},
				coinShow: false,
				coinList: [['ED', 'EDT', 'USDT', 'EDNFT']],
				address: uni.getStorageSync('wallet_address'),
				edblance: 0,
				approveFlag: false
			}
		},
		onLoad() {
			this.getbalance(),
			this.allowance()
		},
		computed: {
		},
		methods: {
			extracted(){
				console.log(this.recharge.edtq)
				// if(this.recharge.edtq > this.edblance){
				// 	return this.$msg('不能超过当前可提取数量')
				// }
				// if(!uni.$u.test.digits(this.recharge.edtq)){
				// 	return this.$msg('请输入正确的提取数量')
				// }
				if(this.edblance == 0){
					return this.$msg('可提取数量不足～')
				}
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				var num = web3.utils.toWei((this.etc.money).toString());
				uni.showLoading({
					title: '正在提取中～',
					mask: true
				});
				console.log(num)
				try{
					MyContract.methods.takeReward().send({
							from: this.address
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: '提取成功'
							})
							this.recharge.edtq = void 0;
							this.getbalance()
						}).catch((e) =>{
							console.log(e)
							uni.hideLoading();
						})
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
				
			},
			async allowance() {
				// 查询授权额度
				try {
					var web3 = window.web3
					var MyContract = new web3.eth.Contract(edabi, edaddr)
					MyContract.methods.allowance(this.address, edidoaddr).call().then(
						res => {
						let n = web3.utils.fromWei(res, "ether");
						 console.log("授权数量==",n);
						 this.approveFlag = n >= 100000000;
					})
				} catch (error) {
					// this.allowanceBalance = 0;
					console.error("trigger smart contract error", error)
				}
			},
			// 授权ed
			async ApproveEd() {
				let that = this;
				var web3 = window.web3
				let data = new Object();
				data['from'] = web3utils.createContract(edabi, edaddr, that.address);
				data['to'] = web3utils.createContract(edidoabi, edidoaddr, that.address);
				data['account'] = that.address;
				web3utils.approve(data, function() {
					that.approveFlag = true;
					that.allowance()
					that.$msg('Authorize succeeded',true)
				})
			},
			getbalance(){
				var web3 = window.web3
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods.getCanReward(this.address).call((err,
					res) => {
						console.log(res)
					// let n = web3.utils.fromWei(res, "ether");
					this.edblance = res
				})
			},
			handleConfirm({ value: [item] }) {
				console.log(item);
				this.recharge.coin = item
			}
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
			padding: 120rpx 44rpx 70rpx;
			
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
			
			.line-ed {
				width: 4rpx;
				height: 28rpx;
				background: #AECEFF;
			}
		}
	}
</style>
