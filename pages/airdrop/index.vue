<template>
	<view class="container">
		<view class="main">
			<myHeader />
			
			<view class="card posi-r" @click="$jump('/pages/totalAirdrop/index')">
				<view class="fons-24">{{ $t('Airdrop.total') }}</view>
				<view class="money mb10 fons-24">{{ '750,000,000,000,000' }}</view>
				<view>
					<view class="flex-a tube" v-for="(item,index) in tubeList" :key="item.id">
						<view class="tube-left text-hidden text-c">{{ $t(item.title) }}</view>
						<view class="tube-right">{{ item.data }}</view>
					</view>
				</view>
				
				<view class="posi-a lps" @click="$jump('/pages/offering/index')">
					{{ $t('Airdrop.lps') }}
				</view>
			</view>
			
			<view class="mt20">
				<view class="fons-16 mb5 flex-between">
					<text>{{ $t('Airdrop.address') }}</text>
					<text class="fons-14">BNB: 0</text>
				</view>
				<u--input placeholder="400000000" border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle" 
				 placeholderStyle="color:#fff"/>
			</view>
			<view class="mt20">
				<view class="fons-16 mb5">
					{{ $t('Airdrop.invitationAddress') }}
				</view>
				<u--input :placeholder="$t('Airdrop.invitationAddressP')" border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle"
				 placeholderStyle="color:#fff">
					<template slot="suffix">
						<u-icon name="eye" color='#ECF2FA' size='36'></u-icon>
					</template>
				</u--input>
			</view>
			<u-button type="primary" :text="$t('Airdrop.collect')" color='#478CF4' shape='circle' :customStyle="{
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
						https://dapp.evolution dao.xyz/#/drop？spread=0x2****05004z/#/drop？spread=0x2****05004z/#/drop？spread=0x2****05004
					</view>
					<view class="flex-a">
						{{ $t('Airdrop.copy') }}
						<u-icon name="bookmark" color="#fff" size="32"></u-icon>
					</view>
				</view>
				<view class="flex-between fons-12">
					<view>
						{{ $t('Airdrop.pushNum') }}: {{ 0 }}
					</view>
					<view>{{ $t('Airdrop.teamNum') }}: {{ 0 }}</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
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
				etc: {}
			}
		},
		onLoad() {
		},
		computed: {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.card {
			padding: 84rpx 32rpx 30rpx 48rpx;
			margin-top: 40rpx;
			background: url('https://cdn.uviewui.com/uview/album/1.jpg') center no-repeat;
			border-radius: 30rpx;
			.money {
				margin-top: 50rpx;
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
