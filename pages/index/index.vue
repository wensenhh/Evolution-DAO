<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="ed-main mt20 text-c">
				<view class="fons-18 fonw-bold">{{ $t('Election.title') }}</view>
				<view class="fons-10 mt5 mb8 flex flex-between">
					<view @tap="levelshow = true">{{ levelList[0][nowleveli].label }}</view>
					<view> > </view>
				</view>
				<u-picker ref="uPicker" :show="levelshow" :columns="levelList" @confirm="levelconfirm" @cancel="closelevel" keyName="label"></u-picker>
				<view class="line-etc" />
				<view class="mt16 mb16" style="font-size: 52rpx;">
					<block v-if="joinAt">有效用户</block>
					<block v-else>无效用户</block>
				</view>
				<view class="main-num" style="margin: 0 auto;">
					<image src="../../static/image/levelicon.png" mode=""></image>
				</view>
				<view class="ml8 mr8">
					<!-- <u-button type="primary" :text="$t('Election.bocomeEtc')" color='#478CF4' :customStyle="{
						borderRadius:'16rpx',margin:'48rpx 0 44rpx',height:'72rpx'
					}" @click="$jump('/pages/become/index')"></u-button> -->
					<u-button type="primary" :disabled="!ifuplevel" @tap="uplevel" :text="$t('Election.bocomeEtc')" color='#478CF4' :customStyle="{
						borderRadius:'16rpx',margin:'48rpx 0 44rpx',height:'72rpx'
					}"></u-button>
				</view>
				<!-- <view class="flex-between">
					<view class="">{{ $t('Election.number') }}</view>
					<view class="">{{ 0 }}</view>
				</view> -->
			</view>
			<!-- <view class="mt16" v-if="nowleveli !== 0">
				 升级条件：{{levelList[0][nowleveli].condition}}
			</view> -->
			<view class="mt16" >
				 升级条件： <br/>
				 <block v-if="nowlevel == 0">
					 下一阶段为公会会长 <br/>
					 {{refnums}} / 30
				 </block>
				 <block v-if="nowlevel == 1">
				 	下一阶段为公会联盟 <br/>
				 	条件1: 团队大区：{{updatedata.daqu1}} / 350 <br/>
					条件2: 有效团队地址 {{updatedata.zhitui}}/1000 <br/>
					注释：条件1至少伞下2条线分别大于或者等于350个有效地址。条件2整个团队地址大于或者等于1000有效地址。
				 </block>
				 <block v-if="nowlevel == 2">
				 		下一阶段为理事会成员 <br/>
				 		3个直系公会联盟已经完成数量 {{updatedata.lianmengNums}}/3
				 </block>
				 <!-- {{levelList[0][nowleveli].condition}} -->
			</view>
			<!-- <view class="etc-list">
				{{ $t('Election.etcList') }}
				
				<u-empty v-if="!etcList.length" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" />
			</view> -->
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
	export default {
		data() {
			return {
				address: uni.getStorageSync('wallet_address'),
				etcList: [],
				levelshow: false,
				nowleveli: 0,
				nowlevel: 0,
				ifuplevel: true,
				joinAt: true,
				levelList: [
                    [{
                        label: '无效/有效成员',
                        id: 0,
						condition: ''
                    }, {
                        label: '公会会长',
                        id: 1,
						condition: '直推30个有效地址客户（有效地址为参与过空投的为有效客户）'
                    },{
                        label: '公会联盟',
                        id: 2,
						condition: `至少伞下2条线分别大于或者等于350个有效地址。\n
    2 整个团队地址大于或者等于1000有效地址。{备注：完成以上2条件即可升级为公会联盟}\n
    3 加入公会联盟后{享受的待遇}\n 	 
    4 成为公会联盟可以享受公会体系下释放数量10%分红\n
    5 如果公会下出现公会（平级），则不享受下面公会分红。（平级不分红）`
                    },{
                        label: '理事会成员',
                        id: 3,
						condition: `直推体系中培养3个合格公会联盟，即可升级理事会成员。{享受的待遇} 享受释放数量的5%分红。\n
    2 同时享受其他未达成公会联盟的体系业绩的公会联盟分红权益。\n
    `
                    },]
                ],
				refnums: 0,
				updatedata: {}
			}
		},
		onLoad() {
			this.getWeb3fun()
			var q = document.URL.split('#')[1].split('?')[1];
			if (q != undefined) {
				q = q.split('inviteCode=');
				console.log(q[1])
				uni.setStorageSync('referrer',q[1])
				// this.parentName = q[1];
			}
			console.log(this.address)
		},
		computed: {
		},
		methods: {
			getWeb3fun() {
				let that = this
			    // web3前面必须有window
			    Web3.default.getWeb3().then((res) => {
					window.web3 = res;
					console.log("getWeb3", res);
					
			    }).finally(()=> {
					that.getTeaminfo()
					that.getidojoininfo()
					that.getifklevel()
					// that.getReferrer()
					that.getcountUsers()
					that.getUpdatedata()
				});
			},
			getTeaminfo(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.teamInfoMap(this.address)
					.call()
					.then((res) => {
						console.log(res)
						this.nowlevel = res.identity
					});
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
							
						}else{
							this.getcountUsers(res)
						}
						// this.nowlevel = res.identity
					});
			},
			getcountUsers(address){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.countUsersOfReferrer(this.address)
					.call()
					.then((res) => {
						console.log('直推人数=' + res)
						this.refnums = res
					});
			},
			getUpdatedata(address){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.getUpdateData(this.address)
					.call()
					.then((res) => {
						console.log(res)
						this.updatedata = res
					});
			},
			getidojoininfo(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.idoJoinInfoMap(this.address)
					.call()
					.then((res) => {
						console.log(res)
						if(res.joinAt == 0){
							this.joinAt = false
						}
						// this.nowleveli = res.identity
					});
			},
			getuplevel(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.updateIdentity()
					.send({
						from: this.address,
						value: web3.utils.toWei('0.00005')
					})
					.then((res) => {
						console.log(res)
						this.$msg('升级成功', true)
						this.getWeb3fun()
						// this.nowleveli = res.identity
					});
			},
			getifklevel(){
				var web3 = window.web3;
				var MyContract = new web3.eth.Contract(edidoabi, edidoaddr);
				MyContract.methods
					.getCanUpdateIdentity(this.address)
					.call()
					.then((res) => {
						console.log(res)
						if(res == this.nowlevel)this.ifuplevel = false
						// this.nowleveli = res.identity
					});
			},
			uplevel(){
				if(!this.ifuplevel){
					return this.$msg('当前不可升级～')
				}
			},
			levelconfirm(e){
				console.log( e.indexs[0])
				this.nowleveli = e.indexs[0]
				// this.$refs.uPicker.setIndexs(e.indexs[0])
				this.levelshow = false
			},
			closelevel(){
				this.levelshow = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.ed-main {
			// height: 672rpx;
			background: linear-gradient(136deg, #70A9FF 0%, #0057B3 53%, #063087 100%);
			// background: url('@/static/image/Election-back.png') no-repeat;
			border: 3rpx solid #2875E4;
			border-radius: 20rpx 20rpx 0 0;
			padding: 20rpx 36rpx 50rpx;
			
			.line-etc {
				margin: 0 16rpx;
				border: 2rpx solid #7CB0FF;
			}
			.main-num {
				width: 156rpx;
				height: 156rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.etc-list {
			margin-top: 48rpx;
		}
	}
	
</style>
