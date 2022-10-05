<template>
	<view class="container">
		<view class="main">
			<view class="header">
				<myHeader />
			</view>
			
			<u-button type="primary" text="确定" @click="$jump('/pages/subcontract/login/index')"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
	
</style>
