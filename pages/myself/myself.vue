<template>
	<view class="myself-container">
		<view class="head">
			<view class="headImg">
				<image :src="userHeadImg" mode="aspectFill" class="userHead"></image>
			</view>
			<view class="nickName">
				<text>{{ userNickName }}</text>
			</view>
		</view>
		<view class="operation">
			<button type="default" @click="changeHead">修改头像</button>
			<button type="default" @click="changeNickname">修改昵称</button>
			<button type="default" @click="changePassword">修改密码</button>
			<button type="default" @click="exitLog" class="exitLog">退出登录</button>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				userHeadImg:'',
				userNickName:'超级无敌王子刚',
			};
		},
		created() {
			//判断是否登录了
			this.ifLog()
		},
		methods:{
			//判断是否登录了
			async ifLog() {
				const userToken = uni.getStorageSync('userAccount')
				if(!userToken) {  //没有登录跳转到登录界面
					uni.redirectTo({
						url:"/pages/login/login"
					})
				}else {  //登录了就请求用户的信息
					const db = uniCloud.database();
					const {result:res} = await db.collection('users').where({account:userToken}).get()
					const userInfo = res.data[0]
					this.userHeadImg = userInfo.headImg
					this.userNickName = userInfo.nickName
				}
			},
			
			//退出登录
			exitLog() {
				uni.showModal({
					title:'退出登录',
					content:'确定要退出登录吗',
					success(res) {
						if(res.confirm) {
							uni.removeStorageSync('userAccount')
							uni.reLaunch({
								url:"/pages/index/index"
							})
						}
					},
				})
			},
			
			//修改头像
			changeHead()  {
				uni.navigateTo({
					url:"/pages/changeHead/changeHead",
					animationType:"slide-in-right",
					animationDuration:100
				})
			},
			
			//修改昵称
			changeNickname() {
				uni.navigateTo({
					url:"/pages/changeNickname/changeNickname",
					animationType:"slide-in-right",
					animationDuration:100
				})
			},
			
			//修改密码
			changePassword() {
				uni.navigateTo({
					url:"/pages/changePassword/changePassword",
					animationType:"slide-in-right",
					animationDuration:100
				})
			}
		}
	}
</script>

<style lang="less">
.myself-container {
	.head {
		height: 300px;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
			
		.headImg {
			width: 150px;
			height: 150px;
			overflow: hidden;
			border-radius: 50%;
			background-color: #e5e5e5;
			
			.userHead {
				width: 100%;
				height: 100%;
			}
		}
		
		.nickName {
			font-size: 20px;
			font-weight: 600;
			color: #fff;
			margin-top: 20px;
		}
	}
	
	.operation {
		.exitLog {
			color: #ff0000;
		}
	}
}
</style>
