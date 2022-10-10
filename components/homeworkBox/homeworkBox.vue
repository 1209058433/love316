<template>
	<view class="homeworkBox-container" @click="goDetails">
		<view class="title">
			<text class="homeworkTitle">{{homework.title}}</text>
			<text>截止时间:{{homework.deadLine}}</text>
		</view>
		<view class="author">
			<view class="info">
				<view class="headImg">
					<img :src="authorInfo.headImg" alt="headImg">
				</view>
				<text>{{authorInfo.nickName}}</text>
			</view>
			<text class="time">发布于:{{homework.time}}</text>
		</view>
		<view class="tag notComplete" v-if="homeworkState === 0" >
			未完成
		</view>
		<view class="tag Complete" v-else-if="homeworkState === 1">
			已完成
		</view>
		<view class="tag deadTime" v-else>
			已超时
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		name:"homeworkBox",
		props:{
			homework:Object
		},
		data() {
			return {
				authorInfo:{  //文章作者的信息
					headImg:'',
					nickName:'',
				},
				homeworkState:0,
			};
		},
		created() {
			this.getAuthorInfo()
		},
		methods:{
			//请求作者的信息
			async getAuthorInfo() {
				const db = uniCloud.database();
				const {result:res} = await db.collection('users').where({account:this.$props.homework.author}).get()
				this.authorInfo = res.data[0]
				
				
				//判断完成了没有
				const tokenInfo = uni.getStorageSync('userAccount')
				if(this.$props.homework.completeUsers.indexOf(tokenInfo) !== -1) {
					//已经完成了，修改homeworkState的值为1
					this.homeworkState = 1
				}else {
					//判断超时了没有
					const deadLine = +new Date(this.$props.homework.deadLine)
					const nowTime = +new Date()
					if(nowTime - deadLine > 0) {
						//已经超时，修改homeworkState的值为2
						this.homeworkState = 2
					}
				}
				
			},
			goDetails() {
				const homeworkId = this.$props.homework._id
				//点击进入详情页
				uni.navigateTo({
					url:'/pages/homeworkDetails/homeworkDetails?id=' + homeworkId,
					animationType:'slide-in-right',
					animationDuration:100
				})
			},
		}
	}
</script>

<style lang="less">
	.homeworkBox-container {
		margin: 5px 0;
		box-sizing: border-box;
		padding: 5px;
		width: 100%;
		height: 80px;
		border: 1px solid black;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		
		.title {
			display: flex;
			flex-direction: column;
			
			.homeworkTitle {
				font-size: 18px;
				font-weight: 700;
			}
		}
		
		.author {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.time {
				color: #919191;
				font-size: 14px;
				margin-right: 10px;
			}
			
			.info {
				font-size: 14px;
				display: flex;
				align-items: center;
				.headImg {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: #73c991;
					overflow: hidden;
					
					:nth-child(1) {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}
		}
		
		.tag {
			width: 40px;
			height: 20px;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			font-size: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
		}
		
		.notComplete {
			background-color: #d1d6ec;
			color: #0289ff;
		}
		
		.Complete {
			background-color: #d6f9db;
			color: #73c991;
		}
		
		.deadTime {
			background-color: #f9d6ce;
			color: #ff0000;
		}
	}
</style>