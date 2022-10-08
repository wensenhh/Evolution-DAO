<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="ed-main mt20">
				<view class="flex-between pl5 pr5 mb10">
					<view>{{ $t('Mine.edt.Recharge.curAddress') }}</view>
					<view class="fons-12" style="color: rgba(255,255,255,0.6);">ED:0.0000</view>
				</view>
				<u--input placeholder="0x29FBb033E84601c35djsHBu821145shda578487HX53" color='#fff' border="bottom"
				  v-model="recharge.adress"></u--input>
				  
				<view class="flex-between pl5 pr5 mb10 mt30">
				  	{{ $t('Mine.edt.Recharge.number') }}
				</view>
				<u--input :placeholder="$t('Mine.edt.Recharge.number')" color='#fff' border="bottom"
				    v-model="recharge.adress"></u--input>
					
				<view class="flex-between pl5 pr5 mt40">
					<view>{{ $t('Mine.edt.Recharge.SelectCoin') }}</view>
					<view class="fons-12 flex-a" @click="coinShow = true">
						<text style="color: #FFDD71;">{{ recharge.coin }}</text>
						<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
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
					coin: 'EDT'
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
		}
	}
</style>
