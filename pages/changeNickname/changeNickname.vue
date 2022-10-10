<template>
	<view class="changeNickname-container">
		<uni-section title="新昵称" type="line">
			<input class="uni-input" focus placeholder="输入新的昵称" maxlength="8" v-model="newNickname" />
		</uni-section>
		<view class="operation">
			<button type="primary" loading="true" v-if="ifUploading">更新昵称</button>
			<button type="primary" v-else @click="changeNickname">更新昵称</button>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				ifUploading: false, //是否正在更新
				newNickname:'',
			};
		},
		methods:{
			async changeNickname() {
				this.ifUploading =  true
				//获取要更新的用户信息账号
				const tokenInfo = uni.getStorageSync('userAccount')
				const db = uniCloud.database();
				await db.collection('users').where({account:tokenInfo}).update({nickName:this.newNickname})
				uni.showToast({
					title: '更新成功',
					duration: 2000
				});
				uni.reLaunch({
					url:'/pages/myself/myself'
				})
			}
		}
	}
</script>

<style lang="less">
	.changeNickname-container {
		box-sizing: border-box;
		padding: 10px;

		.uni-input {
			border-bottom: 1px solid #d6d6d6;
			font-size: 16px;
			padding: 10px;
		}

		.operation {
			margin-top: 15px;
		}
	}
</style>
