<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="card posi-r" @click="$jump('/pages/totalAirdrop/index')">
				<view class="fons-24">{{ $t('Airdrop.total') }}</view>
				<view class="money mb10 fons-24">{{ etc.allamount }}</view>
				<view>
					<view class="flex-a tube" v-for="(item,index) in tubeList" :key="item.id">
						<view class="tube-left text-hidden text-c">{{ $t(item.title) }}</view>
						<view class="tube-right">{{ item.data }}</view>
					</view>
				</view>
				
				<view class="posi-a lps" @tap.stop="$jump('/pages/offering/index')">
					{{ $t('Airdrop.lps') }}
				</view>
			</view>
			
			<view class="mt20">
				<view class="fons-16 mb5 flex-between">
					<text>{{ $t('Airdrop.address') }}</text>
					<text class="fons-14">BNB: 0</text>
				</view>
				<u--input placeholder="300000000" disabled border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle" 
				 placeholderStyle="color:#fff"/>
			</view>
			<view class="mt20">
				<view class="fons-16 mb5">
					{{ $t('Airdrop.invitationAddress') }}
				</view>
				<u--input :placeholder="$t('Airdrop.invitationAddressP')" :disabled="hasreferrer"  border="none" color='#fff' v-model="etc.referrer" :customStyle="inputStyle"
				 placeholderStyle="color:#fff">
					<template slot="suffix">
						<u-icon name="eye" color='#ECF2FA' size='36'></u-icon>
					</template>
				</u--input>
			</view>
			<u-button type="primary" v-if="!approveFlag" @tap="ApproveEd" :text="$t('Airdrop.offering.AllowanceBtn')" color='#478CF4' shape='circle' :customStyle="{
				margin:'48rpx 0',height:'72rpx'
			}"></u-button>
			<u-button type="primary" v-else @tap="joinido" :text="$t('Airdrop.collect')" color='#478CF4' shape='circle' :customStyle="{
				margin:'48rpx 0',height:'72rpx'
			}"></u-button>
			
			<view class="mt20 remark">{{ $t('Airdrop.remark') }}</view>
			
			
			<view class="count">
				<view class="flex-around">
					<view class="flex-a">
						<text class="line"></text>{{ $t('Airdrop.InviteFriends') }}
					</view>
					<view class="see-friend">{{ $t('Airdrop.GoodFriend') }}</view>
				</view>
				<view class="flex-between mt30 mb16 ml8 mr8 fons-10">
					<view class="link text-hidden3">
						{{'http://test.edblock.xyz/#/?inviteCode=' + address}}
					</view>
					<view class="flex-a" @tap="copyfun('http://test.edblock.xyz/#/?inviteCode=' + address)">
						{{ $t('Airdrop.copy') }}
						<u-icon name="bookmark" color="#fff" size="32"></u-icon>
					</view>
				</view>
				<view class="flex-between fons-12">
					<view>
						{{ $t('Airdrop.pushNum') }}: {{ etc.refnums }}
					</view>
					<view>{{ $t('Airdrop.teamNum') }}: {{ 0 }}</view>
				</view>
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
				tubeList: [
					{ id: 1, title: 'Airdrop.vip', data: 82 },
					{ id: 2, title: 'Airdrop.account', data: 0 },
					{ id: 3, title: 'Airdrop.pool', data: 0 },
					{ id: 4, title: 'Airdrop.lp', data: 0 },
				],
				inputStyle: {
					height:'112rpx',
					background: 'linear-gradient(134deg, #5B8ED7 0%, #0758B3 49%, #04367C 100%)',
					padding:'0 36rpx',
					borderRadius:'16rpx',
				},
				etc: {
					referrer: '',
					refnums: 0,
					allamount: 0,
				},
				address: uni.getStorageSync('wallet_address'),
				hasreferrer: true,
				joinAt: true,
				approveFlag: false,
			}
		},
		onLoad() {
		},
		onShow() {
			let that = this
			if(window.web3.utils){
				that.allowance()
				that.getReferrer()
				that.getidonums()
				that.getidojoininfo()
				that.gallamount()
				that.gtakedAmount()
			}else{
				this.getWeb3fun(() => {
					that.allowance()
					that.getReferrer()
					that.getidonums()
					that.getidojoininfo()
					that.gallamount()
					that.gtakedAmount()
				})
			}
		},
		computed: {
		},
		methods: {
			getWeb3fun(callback) {
				let that = this
				console.log(8888)
			    // web3前面必须有window
			    Web3.default.getWeb3().then((res) => {
					window.web3 = res;
					console.log("getWeb3", res);
					return callback && callback()
			    })
			},
			joinido(){
				if(this.etc.referrer.length < 10){
					return this.$msg('请输入有效的上级地址')
				}
				console.log('上级地址入参：' + this.etc.referrer)
				if(!this.joinAt){
					return this.$msg('您已经领取过了～')
				}
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.join(this.etc.referrer)
					.send({
						from: this.address,
						value: web3.utils.toWei('0.00004')
					})
					.then((res) => {
						console.log(res)
						this.$msg('领取成功',true)
						this.getidojoininfo()
						// this.nowlevel = res.identity
					});
			},
			getidojoininfo(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.idoJoinInfoMap(this.address)
					.call()
					.then((res) => {
						console.log('空投时间=' + res.joinAt)
						if(res.joinAt !== '0'){
							this.joinAt = false
						}
						// this.nowleveli = res.identity
					});
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
			getReferrer(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.getReferrer(this.address)
					.call()
					.then((res) => {
						console.log('接口返回的上级地址: ' + res)
						if(res == '0x0000000000000000000000000000000000000000') {
							if(uni.getStorageSync('referrer') !== ''){
								this.etc.referrer = uni.getStorageSync('referrer')
							}else{
								this.hasreferrer = false
							}
						}else{
							this.etc.referrer = res
							this.getcountUsers()
						}
						// this.nowlevel = res.identity
					});
			},
			getidonums(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.idoNums()
					.call()
					.then((res) => {
						console.log(res)
						this.tubeList[0].data = res
						// this.nowlevel = res.identity
					});
			},
			gallamount(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.gallAmount()
					.call()
					.then((res) => {
						console.log(res)
						this.etc.allamount = res
						// this.nowlevel = res.identity
					});
			},
			gtakedAmount(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.gtakedAmount()
					.call()
					.then((res) => {
						console.log(res)
						this.tubeList[1].data = res
						// this.nowlevel = res.identity
					});
			},
			getcountUsers(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.countUsersOfReferrer(this.etc.referrer)
					.call()
					.then((res) => {
						console.log('直推人数=' + res)
						this.etc.refnums = res
					});
			},
			copyfun(name){
				this.$tools.h5Copy(name,'地址');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.card {
			padding: 84rpx 32rpx 30rpx 48rpx;
			margin-top: 40rpx;
			background: url('@/static/image/Airdrop-back.png') no-repeat;
			background-size: cover;
			border-radius: 30rpx;
			.money {
				margin-top: 50rpx;
				overflow: hidden;
			}
			
			.tube {
				height: 48rpx;
				line-height: 48rpx;
				font-size: 24rpx;
				margin-bottom: 5rpx;
				.tube-left {
					height: 100%;
					width: 146rpx;
					background: #206ECF;
					border-radius: 20rpx 0 0 20rpx;
				}
				.tube-right {
					padding: 0 20rpx 0 10rpx;
					background: #74B1FF;
					border-radius: 0 20rpx 20rpx 0;
				}
			}
			.lps {
				bottom: 40rpx;
				right: 30rpx;
				text-decoration: underline;
				cursor: pointer;
			}
		}
		
		.remark {
			font-size: 22rpx;
			color: #478CF4;
			line-height: 26rpx;
		}
		
		.count {
			margin-top: 40rpx;
			// height: 348rpx;
			background: #1A2B45;
			border-radius: 20rpx;
			border: 2rpx solid #60A1FF;
			padding: 60rpx 32rpx 50rpx;
			.line {
				width: 6rpx;
				height: 32rpx;
				background: #478CF4;
				display: inline-block;
				margin-right: 16rpx;
			}
			.see-friend {
				color: #478CF4;
				font-size: 24rpx;
				text-decoration: underline;
				cursor: pointer;
			}
			
			.link {
				width: 400rpx;
				height: 88rpx;
				line-height: 30rpx;
			}
		}
	}
</style>
