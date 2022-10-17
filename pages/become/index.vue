<template>
	<view class="container">
		<view class="main">
			<myHeader :flag='2' />
			
			<view class="etc mt20">
				<view class="mb16">
					<view class="fons-16 mb12">{{ $t('Election.etc.money') }}</view>
					<u--input placeholder="400000000" border="none" color='#fff' v-model="etc.money" :customStyle="inputStyle">
						<template slot="suffix">
							<u-icon name="eye" color='#ECF2FA' size='36'></u-icon>
						</template>
					</u--input>
				</view>
				<view class="mb16">
					<view class="fons-16 mb12">{{ $t('Election.etc.name') }}</view>
					<u--input :placeholder="$t('Election.etc.nameP')" border="none" color='#fff' v-model="etc.name" :customStyle="inputStyle">
						<template slot="suffix">
							<u-icon name="eye" color='#ECF2FA' size='36'></u-icon>
						</template>
					</u--input>
				</view>
				<view class="mb16">
					<view class="fons-16 mb12">{{ $t('Election.etc.remark') }}</view>
					<view style="background: linear-gradient(134deg, #5B8ED7 0%, #0758B3 49%, #04367C 100%);">
						<u--textarea v-model="etc.remark" border='none' :placeholder="$t('Election.etc.remarkP')" :customStyle="{
							background: 'linear-gradient(134deg, #5B8ED7 0%, #0758B3 49%, #04367C 100%)',
							padding:'20rpx 36rpx',
							borderRadius:'16rpx 16rpx 0 0',
							borderBottom:'2rpx solid #7DB1FF'
						}" count height='360rpx' maxlength='255'></u--textarea>
						<view class="remark text-hidden">{{ $t('Election.etc.remarkContent') }}</view>
					</view>
				</view>
			</view>
			
			<view class="remark-text">
				{{ $t('Election.etc.remarkText') }}
			</view>
			
			<u-button type="primary" :text="'授权'" color='#478CF4' shape='circle' :customStyle="{
				margin:'48rpx 0',height:'72rpx'
			}"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				etc: {
					money: void 0,
					name: void 0,
					remark: void 0
				},
				inputStyle: {
					height:'112rpx',
					background: 'linear-gradient(134deg, #5B8ED7 0%, #0758B3 49%, #04367C 100%)',
					padding:'0 36rpx',
					borderRadius:'16rpx',
				}
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
	::v-deep.container {
		.etc {
			.u-textarea {
				.u-textarea__count {
					background: transparent !important;
					color: rgba(255,255,255,0.6);
				}
			}
			.remark {
				padding-left: 36rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 0 0 16rpx 16rpx;
				font-size: 24rpx;
				color: rgba(255,255,255,0.8);
			}
		}
		
		.remark-text {
			font-size: 22rpx;
			line-height: 40rpx;
			white-space: pre-wrap;
		}
	}
</style>
