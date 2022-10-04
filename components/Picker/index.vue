<template>
	<view>
		<u-picker
			v-if="pickerType == 1"
			:show="pShow"
			:columns="columns"
			:showToolbar="showTop"
			:keyName='keyName'
			:defaultIndex='defaultIndex'
			:closeOnClickOverlay="showModal"
			@close='cancel'
			@cancel='cancel'
			@confirm='handleConfirm'
		  >
		  <!-- @change='handleConfirm' -->
		</u-picker>
		
		<u-datetime-picker
			v-if="pickerType == 2"
			v-model="curDate"
			mode="datetime"
			:show="pShow"
			:minDate='minDate'
			:closeOnClickOverlay="showModal"
			@close='cancel'
			@cancel='cancel'
			@confirm='handleConfirm'
		>
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		props: {
			pickerType: { // picker框的类型 默认为1普通选择器 2是时间选择器
				type: Number,
				default: 1
			},
			show: {
				type: Boolean,
				default: false
			},
			
			columns: {
				type: Array,
				default: []
			},
			keyName: {
				type: String,
				default: 'text'
			},
			defaultIndex: {
				type: Array,
				default: []
			},
			
			showTop: {
				type: Boolean,
				default: true
			},
			showModal: {
				type: Boolean,
				default: true
			},
			
			minDate: {
				type: Number,
				default: 0
			},
		},
		computed: {
			pShow: {
				get() {
					return this.show
				},
				set(flag) {
					this.$emit('update:show', flag)
				}
			}
		},
		data() {
			return {
				curDate: Number(new Date())
			}
		},
		methods: {
			// 确认选中该数据
			handleConfirm(arr) {
				this.$emit('confirm', arr)
				this.pShow = false
			},
			
			cancel() {
				this.pShow = false
			},
		}
	}
</script>

<style scoped lang="scss">
	
</style>
