<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		//通过读取localStrange跳转网页的页面
		data() {
			return {
				url:''
			};
		},
		onLoad() {
			const url = uni.getStorageSync('pageUrl')
			this.url = url
		},
		onUnload() {
			uni.removeStorageSync('pageUrl')
		}
	}
</script>

<style lang="less">

</style>
