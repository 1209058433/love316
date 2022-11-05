<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		//实现跳转博客相应id文章页面链接的页面组件
		onLoad(option) {
			this.url = 'https://www.ibukisk.top/articlebrowse?id=' + option.id
		},
		data() {
			return {
				url:''
			};
		}
	}
</script>

<style lang="less">

</style>
