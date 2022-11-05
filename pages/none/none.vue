<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(option) {
			//用来刷新用的页面组件
			//传过来url，这里再跳回去，实现刷新
			const path = option.path
			uni.reLaunch({
				url: path
			})
		}
	}
</script>

<style lang="less">

</style>
