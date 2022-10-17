<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="banner">
				<u--image :src="require('@/static/image/offering-back.png')" width='100%' height="380rpx" radius='10rpx'></u--image>
			</view>
			
			<u-subsection :list="[this.$t('Airdrop.offering.subList')]" :current="current" @change='handleSubChange'
			  activeColor='#FFFFFF' inactiveColor='rgba(255,255,255,0.6)' mode='subsection' :bold='false'></u-subsection>
			
			<!-- <view v-show="current == 0">
				<view class="offering-num posi-r">
					<view class="num-top flex flex-c">
						<view class="c-478CF4 mb8">
							{{ $t('Airdrop.offering.offeringNum') }}
						</view>
						<view>{{ 200000 }}</view>
					</view>
					<view class="line posi-a" />
					<view class="num-top flex flex-c">
						<view class="c-478CF4 mb8">
							{{ $t('Airdrop.offering.snappedUp') }}
						</view>
						<view>{{ 0 }}</view>
					</view>
				</view>
				
				<view class="mt30">
					<view class="fons-16 mb5 flex-between">
						<text>{{ $t('Airdrop.offering.address') }}</text>
						<text class="fons-14">EDT: 0.0000</text>
					</view>
					<u--input placeholder="0x29FBb033E84601c35djsHBu821145shda578487HX53" border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle" 
					 />
				</view>
				<view class="fons-16 mb5 flex-between mt30">
					<text>{{ $t('Airdrop.offering.current') }}</text>
					<text class="fons-14">ED: 0</text>
				</view>
				<view class="mt30">
					<view class="fons-16 mb5">
						{{ $t('Airdrop.offering.rushNum') }}
					</view>
					<u--input :placeholder="$t('Airdrop.offering.rushNumP')" border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle" 
					 />
				</view>
				<u-button type="primary" :text="$t('Airdrop.offering.rushBtn')" color='#478CF4' :customStyle="{
					margin:'48rpx 0',height:'84rpx',borderRadius:'10rpx'
				}"></u-button>
			</view> -->
			
			<view v-show="current == 0">
				<view class="offering-num posi-r lps">
					<view>
						<view class="fons-16 mb5 flex-between">
							<text>{{ $t('Airdrop.offering.lpsAddress') }}</text>
							<text class="fons-14">{{$t('Mine.edt.Recharge.mydeposit')}}: {{depositmapnum}}</text>
						</view>
						<u--input placeholder="" border="none" :disabled="true" color='#fff' v-model="depositnum"
						 :customStyle="inputStype2"
						 />
					</view>
					<view class="mt40">
						<view class="fons-16 mb5 flex-between">
							<text>{{ $t('Airdrop.offering.lpsNum') }}</text>
							<text class="fons-14">{{ $t('Airdrop.offering.lpsMin') }}</text>
						</view>
						<u--input :placeholder="$t('Airdrop.offering.lpsMinP')" border="none" color='#fff' v-model="etc.money"
						 :customStyle="inputStype2"
						 />
					</view>
					<u-button type="primary" v-if="!approveFlag" @tap="ApproveEd" :text="$t('Airdrop.offering.AllowanceBtn')" color='#478CF4' :customStyle="{
						margin:'52rpx 0 0',height:'84rpx',borderRadius:'10rpx'
					}"></u-button>
					<u-button type="primary" v-else @tap="stakinged" :text="$t('Airdrop.offering.pledge')" color='#478CF4' :customStyle="{
											margin:'52rpx 0 0',height:'84rpx',borderRadius:'10rpx'
										}"></u-button>
				</view>
				
				<!-- <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" /> -->
			</view>
			
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
	import web3utils from '@/common/web3Utils.js'
	export default {
		data() {
			return {
				current: 0,
				inputStyle: {
					height:'112rpx',
					background: '#1A2B45',
					padding:'0 36rpx',
					borderRadius:'16rpx',
					border: '2rpx solid #439CFB'
				},
				inputStype2: {
					height:'112rpx',
					background: '#1A2B45',
					padding:'0 36rpx',
					borderBottom: '2rpx solid #1364BF'
				},
				etc: {
					money: 15000000
				},
				depositnum: 0,
				depositmapnum: 0,
				address: uni.getStorageSync('wallet_address'),
				approveFlag: false,
				edblance: 0,
				okdepositnum:0
			}
		},
		onLoad() {
			// this.$store.dispatch('setLocal', 'en')
			if(window.web3.utils){
				this.allowance()
				this.getbalance()
				this.getdeposit()
				this.getidojoininfo()
				this.getdepositmap()
			}
		},
		computed: {
		},
		methods: {
			stakinged(){
				console.log(this.etc.money)
				console.log(this.okdepositnum)
				if(Number(this.etc.money) < 100){
					return this.$msg('质押数量必须大于100')
				}
				if( Number(this.etc.money )> Number(this.okdepositnum)){
					return this.$msg('不能高于可质押数量，当前可质押数量为：' + this.okdepositnum)
				}
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				var num = web3.utils.toWei((this.etc.money).toString());
				uni.showLoading({
					title: '正在质押中～',
					mask: true
				});
				console.log(num)
				try{
					MyContract.methods.deposit(num).send({
							from: this.address
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: '质押成功'
							})
							this.etc.money = ''
							this.getbalance()
							this.getdeposit()
							this.getdepositmap()
							this.getidojoininfo()
						}).catch((e) =>{
							console.log(e)
							uni.hideLoading();
						})
				}catch(e){
					//TODO handle the exception
					console.log(e)
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
				var MyContract = new web3.eth.Contract(abi, usdtaddr);
				MyContract.methods.balanceOf(this.address).call((err,
					res) => {
						console.log(res)
					let n = web3.utils.fromWei(res, "ether");
					this.edblance = Math.round(n * 1000) / 1000
				})
			},
			getidojoininfo(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.getMaxDeposit(this.address)
					.call()
					.then((res) => {
						console.log(res)
						let n = web3.utils.fromWei(res, "ether");
						this.okdepositnum = n
						this.etc.money = n
					});
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
			getdeposit(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.gdeposit()
					.call()
					.then((res) => {
						console.log(res)
						this.depositnum = web3.utils.fromWei(res, "ether");
						// this.nowlevel = res.identity
					});
			},
			getdepositmap(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.depositMap(this.address)
					.call()
					.then((res) => {
						console.log(res)
						let n = web3.utils.fromWei(res, "ether");
						this.depositmapnum = Math.round(n * 1000) / 1000
						// this.nowlevel = res.identity
					});
			},
			//减法
			    subtract(a,b){
			        return this.$math.subtract(this.$math.bignumber(a), this.$math.bignumber(b));
			    },
			// 切换分断器
			handleSubChange(ind) {
				this.current = ind
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.container {
		.banner {
			margin: 40rpx 0;
			height: 380rpx;
			width: 100%;
		}
		
		.u-subsection {
			background: #274573;
			height: 72rpx;
			border-radius: 6rpx;
			.u-subsection__item {
				border: none !important;
				.u-subsection__item__text {
					font-size: 30rpx !important;
				}
			}
			.u-subsection__bar {
				background-color: #478CF4 !important;
			}
		}
		
		.offering-num {
			margin-top: 36rpx;
			height: 324rpx;
			border-radius: 20rpx;
			border: 2rpx solid #6FA8FE;
			background: #1A2B45;
			.num-top {
				text-align: center;
				height: 160rpx;
			}
			.line {
				width: 100%;
				top: 160rpx;
				border: 2rpx solid #1364BF;
			}
		}
		
		.lps {
			height: auto;
			padding: 120rpx 30rpx 44rpx;
		}
	}
</style>
