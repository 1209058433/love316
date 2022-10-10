<template>
	<view class="writeHomework-container">
		<uni-section class="mb-10" title="标题(科目)" type="line">
			<input class="uni-input" maxlength="16" placeholder="输入标题" v-model="title" />
		</uni-section>
		<uni-section class="mb-10" title="截止日期" type="line">
			<uni-datetime-picker type="datetime" v-model="datetimesingle" />
		</uni-section>
		<uni-section class="mb-10" title="作业内容" type="line">
			<textarea class="contentText" :maxlength="1000" v-model="content"></textarea>
			<uni-file-picker ref="files" limit="9" title="最多选择9张图片" v-model="imageValue" fileMediatype="image" file-extname="jpg,png" :auto-upload="false" @success="upImagesOver" @select='addImage(0)' @delete='addImage(1)' ></uni-file-picker>
			<button type="primary" loading="true" class="sendBtn" v-if="ifUpload">点击发布</button>
			<button type="primary" @click="sendHomework" class="sendBtn" v-else>点击发布</button>
		</uni-section>
	</view>
</template>

<script lang="ts">
	import moment from 'moment'
	export default {
		data() {
			return {
				title: '', //作业标题
				datetimesingle: '', //截止日期
				content: '', //输入的作业内容
				imageValue:[],  //上传图片的回显数据
				ifUpload:false,  //是否上传
				imagesNum:0,  //文件数量
			};
		},
		methods: {
			async upImagesOver() {
				const tokenmInfo = uni.getStorageSync('userAccount')
				const sendTime = moment().format('YYYY-MM-DD hh:mm:ss')  //生成发布时间
				const tempImageArray = new Array   
				for(let i = 0;i < this.imageValue.length;i++) {   //如果上传了图片，把返回地址都放进来
					tempImageArray.push(this.imageValue[i].url)
				}
				const homework = {  //上传到数据库的obj，key要和数据库定义的一样
					title: this.title,
					author:tokenmInfo,
					time:sendTime,
					deadLine: this.datetimesingle,
					content: this.content,
					images:tempImageArray,
					completeUsers:new Array,
					notCompleteUsers:new Array
				}
				const db = uniCloud.database();
				await db.collection('homework').add(homework)
				uni.showModal({
					title:"成功",
					content:"发布成功",
					showCancel:false,
					success() {
						uni.reLaunch({
							url:'/pages/homework/homework'
						})
					}
				})
				this.ifUpload = false
			},
			sendHomework() {
				this.ifUpload = true
				if(this.title === '' || this.datetimesingle === '' || this.content === '') {
					uni.showToast({
						title: '请完整填写表单',
						icon:"error",
						duration: 2000
					});
					this.ifUpload = false
				}else {
					//如果上传图片了，就调用更新图片的方法
					if(this.imagesNum > 0) {
						this.$refs.files.upload()
					}else {
						//没有上传图片就直接上传数据库
						this.upImagesOver()
					}
				}
				
			},
			addImage(val:number) {
				//选择文件和删除文件的时候触发，0是选择了文件，1是删除了文件
				if(val === 0) {
					this.imagesNum += 1
				}else {
					this.imagesNum -= 1
				}
			}
		}
	}
</script>

<style lang="less">
	.writeHomework-container {
		box-sizing: border-box;
		padding: 10px;

		.uni-input {
			font-size: 17px;
		}

		.contentText {
			width: 100%;
			height: 200px;
			font-size: 16px;
		}

		.sendBtn {
			margin-top: 15px;
		}


	}
</style>
