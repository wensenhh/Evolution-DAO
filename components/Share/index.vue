<template>
	<view>
		<view v-if="isShowShare">
			<view class="shade" @click="closeShare" @touchmove.prevent></view>
			<!-- 邀请好友指引 -->
			<view class="invitezhi fons-14 c-fff">
				<view style="width: 100%;">
					<image src="@/static/image/shareLine.png" style="width: 121rpx;height: 113rpx;" />
				</view>
				<view>点击右上角</view>
				<view>将它发给指定朋友</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Share",
		props: {
			isShare: {
				type: Boolean,
				default: false,
				required: true
			}
		},
		computed: {
			isShowShare: {
				get() {
					return this.isShare
				},
				set(flag) {
					this.$emit('update:isShare', flag)
				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
			// 关闭遮罩
			closeShare() {
				this.isShowShare = false
			},
		}
	}
</script>

<style scoped lang="scss">
.shade {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	/* z-index: 999; */
}

.invitezhi {
	position: fixed;
	top: 0;
	right: 17%;
	text-align: right;
	width: 100%;
}
</style>