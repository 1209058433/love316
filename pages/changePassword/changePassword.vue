<template>
	<view class="changePassword-container">
		<view class="title">旧密码:</view>
		<input class="uni-input" focus placeholder="输入旧密码" v-model.trim="oldPassword" />
		<view class="title">新密码:</view>
		<input class="uni-input" maxlength="16" placeholder="最大输入长度为16" v-model.trim="newPassword" />
		<view class="title">再次输入新密码:</view>
		<input class="uni-input" maxlength="16" placeholder="最大输入长度为16" v-model.trim="newPasswordNext" />
		<text class="passwordErr" v-if="passwordErr">*两次输入的密码不一值</text>
		<button type="primary" loading="true" class="changePasswordBtn" v-if="ifChange">更新密码</button>
		<button type="primary" class="changePasswordBtn" v-else @click="changePassword">更新密码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifChange: false, //是否在更新密码
				oldPassword: '',
				newPassword: '',
				newPasswordNext: '',
				passwordErr:false, //两次输入的密码不一值的提示句子
			};
		},
		methods: {
			async changePassword() {
				this.ifChange = true
				if (this.oldPassword === '' || this.newPassword === '' || this.newPasswordNext === '') {
					uni.showToast({
						title: '请完整填写表单',
						icon: "error",
						duration: 2000
					});
					this.ifChange = false
				} else {
					const tokenInfo = uni.getStorageSync('userAccount')
					const db = uniCloud.database();
					const {result:res} = await db.collection('users').where({account:tokenInfo}).get()
					const oldPass = res.data[0]
					if(oldPass.password === this.oldPassword) {
						if(this.passwordErr === false) {
							await db.collection('users').where({account:tokenInfo}).update({password:this.newPasswordNext})
							uni.showModal({
								title:'成功',
								content:'修改密码成功',
								showCancel:false,
								success() {
									uni.removeStorageSync('userAccount')
									uni.reLaunch({
										url:'/pages/login/login'
									})
								}
							})
						}else {
							uni.showToast({
								title: '新密码不一致',
								icon: "error",
								duration: 2000
							});
							this.ifChange = false
						}
					}else {
						uni.showToast({
							title: '旧密码错误',
							icon: "error",
							duration: 2000
						});
						this.ifChange = false
					}
				}
			}
		},
		watch:{
			newPasswordNext(newVal,oldVal) {
				if(newVal !== this.newPassword) {
					this.passwordErr = true
				}else {
					this.passwordErr = false
				}
			}
		}
	}
</script>

<style lang="less">
	.changePassword-container {
		box-sizing: border-box;
		padding: 10px;

		.title {
			font-size: 16px;
			font-weight: 600;
			margin-top: 15px;
		}

		.uni-input {
			font-size: 16px;
			border-bottom: 1px solid #d1d1d1;
			margin-top: 5px;
		}

		.changePasswordBtn {
			margin-top: 20px;
		}
		
		.passwordErr {
			font-size: 12px;
			color: #ff0000;
		}
	}
</style>
