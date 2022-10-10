<template>
	<view class="login-container">
		<text class="title">登录</text>
		<view class="userInfo">
			<view class="accountInput">
				<label for="userAccount" class="accountLabel">账号:</label>
				<input class="uni-input account" type="text" maxlength="16" focus placeholder="输入账号" v-model="userAccount"  />
			</view>
			<view class="accountInput">
				<label for="userPassword" class="accountLabel">密码:</label>
				<input class="uni-input account" password maxlength="16" type="text" placeholder="输入密码" v-model="userPassword" />
			</view>
		</view>
		<view class="operation">
			<button type="primary" class="operationBtn" loading="true" v-if="ifLoging" >登录</button>
			<button type="primary" class="operationBtn" @click="login" v-else >登录</button>
			<button type="default" class="operationBtn"  @click="goBackUrl" >返回</button>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				userAccount:'',  //输入的账号
				userPassword:'', //输入的密码
				ifLoging:false, //是否正在登录
			};
		},
		methods:{
			async login() {
				if(this.userAccount === '' || this.userPassword === '') {
					uni.showModal({
						title:'笨比',
						content:'账号和密码不能为空',
						showCancel:false
					})
					return
				}else {
					this.ifLoging = true
					const db = uniCloud.database();
					const {result:res} = await db.collection('users').where({account:this.userAccount}).get()
					if(!res.data[0]) {
						// 没有相应的账号
						uni.showModal({
							title:'登陆失败',
							content:'账号错误',
							showCancel:false
						})
						this.ifLoging = false
					}else {
						if(res.data[0].password === this.userPassword) {
							// 登陆成功
							uni.setStorageSync('userAccount',res.data[0].account)
							uni.showModal({
								title:'哟西',
								content:'登录成功',
								showCancel:false,
								success() {
									uni.reLaunch({
										url:"/pages/myself/myself"
									})
								}
							})
							
						}else {
							uni.showModal({
								title:'登陆失败',
								content:'密码错误',
								showCancel:false
							})
							this.ifLoging = false
						}
					}
				}
			},
			goBackUrl() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.title {
		font-size: 24px;
		font-weight: 600;
		margin-top: 80px;
	}
	
	.userInfo {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.accountInput {
			display: flex;
			margin-top: 20px;
			
			.account {
				border-bottom: 1px solid #999999;
			}
			
			.accountLabel {
				margin-right: 10px;
			}
		}
	}
	
	.operation {
		width: 100%;
		display: flex;
		flex-direction: column;
		.operationBtn {
			width: 60%;
			margin-top: 20px;
		}
	}
}
</style>
