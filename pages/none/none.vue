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
			//传过来url，这里再跳回去，实现刷新
			const path = option.path
			uni.redirectTo({
				url: path
			})
		}
	}
</script>

<style lang="less">

</style>
