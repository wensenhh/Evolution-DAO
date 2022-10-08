<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="banner">
				<u--image :src="require('@/static/image/offering-back.png')" width='100%' height="380rpx" radius='10rpx'></u--image>
			</view>
			
			<u-subsection :list="this.$t('Airdrop.offering.subList').split(',')" :current="current" @change='handleSubChange'
			  activeColor='#FFFFFF' inactiveColor='rgba(255,255,255,0.6)' mode='subsection' :bold='false'></u-subsection>
			
			<view v-show="current == 0">
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
			</view>
			
			<view v-show="current == 1">
				<view class="offering-num posi-r lps">
					<view>
						<view class="fons-16 mb5 flex-between">
							<text>{{ $t('Airdrop.offering.lpsAddress') }}</text>
							<text class="fons-14">LPS:0</text>
						</view>
						<u--input placeholder="0x29FBb033E84601c35djsHBu821145shda578487HX53" border="none" color='#fff' v-model="etc.money"
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
					<u-button type="primary" :text="$t('Airdrop.offering.AllowanceBtn')" color='#478CF4' :customStyle="{
						margin:'52rpx 0 0',height:'84rpx',borderRadius:'10rpx'
					}"></u-button>
				</view>
				
				<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :text="$t('system.notData')" />
			</view>
			
		</view>
	</view>
</template>

<script>
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
				etc: {},
			}
		},
		onLoad() {
			// this.$store.dispatch('setLocal', 'en')
		},
		computed: {
		},
		methods: {
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
