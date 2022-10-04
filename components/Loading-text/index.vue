<template>
	<view>
		<view class="h-30 flex mt10 fons-12">
			<u-loading-icon text="加载中" size="24" textSize="24" v-if="status == 2"></u-loading-icon>
			<text v-if="status == 3"> 没有更多了~~ </text>
			<text v-if="status == 1"> 上拉加载更多~ </text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Loading-text",
		props: {
			status: {
				type: Number,
				required: true
			}
		},
		watch: {
			status: {
				handler(newStatus, oldStatus){
					// console.log(newStatus, oldStatus)
				},
				immediate: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>