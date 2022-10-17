<template>
	<view class="tab">
		<u-tabbar
			:value="curTabbar"
			inactiveColor="#333"
			activeColor="#009B4D"
			:safeAreaInsetBottom='true'
		>
			<u-tabbar-item :text="menu.name" v-for="(menu, index) in menuList" :key="menu.id" @click='e => changeTabbar(e, menu)'>
				<image class="tabbar-icon" slot='active-icon' :src="require(`@/static/image/${menu.active}.png`)"></image>
				<image class="tabbar-icon" slot='inactive-icon' :src="require(`@/static/image/${menu.inactive}.png`)"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		props: {
			curTabbar: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				menuList: this.$store.getters.menuList || []
			}
		},
		created() {
			// console.log('vuex存的用户信息', this.menuList)
		},
		computed: {
		},
		methods: {
			changeTabbar(e, menu) {
				this.$jump(`/pages/${menu.path}/index`, 2)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		.tabbar-icon {
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
