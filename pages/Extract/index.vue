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
					<view class="fons-12" style="color: rgba(255,255,255,0.6);">ED:0.0000</view>
				</view>
				<u--input placeholder="0x29FBb033E84601c35djsHBu821145shda578487HX53" color='#fff' border="bottom"
				  v-model="recharge.adress"></u--input>
				  
				<view class="flex-a pl5 pr5 mb10 mt30">
					<view class="line-ed mr5" />
				  	<text>{{ $t('Mine.edt.Recharge.number2') }}</text>
				</view>
				<u--input :placeholder="$t('Mine.edt.Recharge.number2')" color='#fff' border="bottom"
				    v-model="recharge.adress"></u--input>
					
				<view class="flex-between pl5 pr5 mt40">
					<view class="flex-a">
						<view class="line-ed mr5" />
						<text>{{ $t('Mine.edt.Recharge.Formalities') }}</text>
					</view>
					<view class="fons-12 flex-a" @click="coinShow = true">
						<text>{{ recharge.coin }}</text>
					</view>
				</view>
			</view>
			
			<u-button type="primary" :text="$t('Mine.edt.Recharge.Allowance')" color='#478CF4' :customStyle="{
				margin:'60rpx 0 0',height:'84rpx'
			}" shape='circle'></u-button>
			
		</view>
		
		<myPicter :show.sync='coinShow' :columns='coinList' @confirm="handleConfirm" />
	</view>
</template>

<script>
	import myPicter from '@/components/Picker/index'
	export default {
		components: {
			myPicter
		},
		data() {
			return {
				recharge: {
					adress: void 0,
					coin: '0EDNFT'
				},
				coinShow: false,
				coinList: [['ED', 'EDT', 'USDT', 'EDNFT']],
			}
		},
		onLoad() {
		},
		computed: {
		},
		methods: {
			
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
