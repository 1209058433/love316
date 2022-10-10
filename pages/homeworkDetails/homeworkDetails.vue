<template>
	<view class="details-container">
		<view class="title">
			<text class="homeworkTitle">{{homeworkInfo.title}}</text>
			<text class="deadTime">截止日期:{{homeworkInfo.deadLine}}</text>
			<radio-group class="checkRadio" @change="changeRandio" >
				<label>
					<radio value="0" :checked="!ifCheckRadio" :disabled="canNotRadio" /><text>未完成</text>
				</label>
				<label>
					<radio value="1" :checked="ifCheckRadio" :disabled="canNotRadio" /><text>已完成</text>
				</label>
			</radio-group>
		</view>
		<view class="content">
			<text>{{homeworkInfo.content}}</text>
		</view>
		<view class="images">
			<image v-for="item in homeworkInfo.images" :key="item" :src="item" mode="aspectFit" @click="preview(item)"></image>
		</view>
		
		<view class="authorInfo">
			<view class="headBox">
				<img :src="authorInfo.headImg" alt="head" class="head" mode="aspectFill" >
			</view>
			<text class="authorNick">{{authorInfo.nickName}}</text>
			<text class="sendTime">发布日期:{{homeworkInfo.time}}</text>
		</view>
		
		<button type="warn" @click="delThis" :disabled="canNotRadio" class="delBtn">删除此作业</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeworkInfo: {},
				canNotRadio:true,
				ifCheckRadio:false,  //先判断是否完成了
				authorInfo:{},  //作者的信息
			};
		},
		async onLoad(option) {
			//接收路由传参传过来的id
			const homeworkId = option.id
			const db = uniCloud.database();
			const {result: res} = await db.collection('homework').where({_id: homeworkId}).get()
			//请求出文章的内容
			this.homeworkInfo = res.data[0]
			
			//判断有没有完成
			const tokenInfo = uni.getStorageSync('userAccount')
			if(tokenInfo) {
				this.canNotRadio = false
				const db = uniCloud.database();
				const {result: res} = await db.collection('homework').where({_id: this.homeworkInfo._id}).get()
				const tempArray = res.data[0].completeUsers
				tempArray.indexOf(tokenInfo)
				if(tempArray.indexOf(tokenInfo) !== -1) {
					this.ifCheckRadio = true
				}else {
					this.ifCheckRadio = false
				}
			}
			
			//请求作者的信息
			const rasult = await db.collection('users').where({account:this.homeworkInfo.author}).get()
			const authorInfo = rasult.result.data[0]
			this.authorInfo = authorInfo
		},
		methods: {
			//点击预览图片
			preview(url) {
				uni.previewImage({
					urls:[url]
				})
			},
			//是否完成的单选框改变
			async changeRandio(val) {
				if(val.detail.value === '1') {
					//完成了作业
					const tokenInfo = uni.getStorageSync('userAccount')
					const db = uniCloud.database();
					const {result: res} = await db.collection('homework').where({_id: this.homeworkInfo._id}).get()
					const tempArray = res.data[0].completeUsers
					if(tempArray.indexOf(tokenInfo) === -1) {
						tempArray.push(tokenInfo)
						await db.collection('homework').where({_id: this.homeworkInfo._id}).update({completeUsers:tempArray})
						uni.showToast({
							title: '修改成功',
							duration: 2000
						});
					}else {
						uni.showToast({
							title: '已经在完成列表中',
							duration: 2000
						});
					}
				}else {
					//未完成作业
					//找到在数组中的索引
					const tokenInfo = uni.getStorageSync('userAccount')
					const db = uniCloud.database();
					const {result: res} = await db.collection('homework').where({_id: this.homeworkInfo._id}).get()
					const tempArray = res.data[0].completeUsers
					const arrIndex = tempArray.indexOf(tokenInfo)
					tempArray.splice(arrIndex,1)
					await db.collection('homework').where({_id: this.homeworkInfo._id}).update({completeUsers:tempArray})
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
				}
			},
			delThis() {
				const info = this.homeworkInfo
				uni.showModal({
					title:'删除',
					content:'确定要删除吗',
					success(val) {
						if(val.confirm === true) {
							uni.showModal({
								title:'再次确认',
								content:'确定要删除此作业吗',
								async success(val) {
									if(val.confirm === true) {
										console.log(info);
										//先删除图片
										const delImg = uniCloud.importObject('delClassImg')
										info.images.map(async (item) => {
											await delImg.delImg(item)
										})
										//删除相应的数据
										const db = uniCloud.database();
										await db.collection('homework').where({_id:info._id}).remove()
										uni.showModal({
											title:"完成",
											content:"删除完成",
											showCancel:false,
											success() {
												uni.navigateBack({
													delta:1
												})
											}
										})
									}
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.details-container {
		box-sizing: border-box;
		padding: 10px;
		
		.title {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.homeworkTitle{
				font-size: 24px;
				font-weight: 700;
			}
			
			.deadTime {
				font-size: 14px;
				margin-top: 5px 0;
			}
			
			.checkRadio {
				margin: 10px 0;
			}
		}
		
		.content {
			padding: 5px;
			border-top: 1px solid #bdbdbd;
		}
		
		
		
		.authorInfo {
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-top: 1px solid #bebebe;
			
			.headBox {
				margin-top: 10px;
				width: 100px;
				height: 100px;
				border-radius: 50%;
				background-color: aquamarine;
				overflow: hidden;
				
				.head {
					width: 100%;
					height: 100%;
				}
			}
			
			.authorNick {
				margin-top: 10px;
				font-size: 18px;
				font-weight: 600;
			}
			
			.sendTime {
				margin-top: 20px;
				color: #989898;
			}
		}
		
		.delBtn {
			margin-top: 30px;
		}
	}
</style>
