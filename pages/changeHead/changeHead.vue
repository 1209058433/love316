<template>
	<view class="changeHead-container">
		<text>上传新头像,只能上传jpg/png格式的图片</text>
		<view class="example-body">
			<uni-file-picker limit="1" title="最多选择1张图片" v-model="imageValue" fileMediatype="image"
				file-extname="png,jpg" :auto-upload="false" ref="files" :image-styles="imageStyles"
				:list-styles="listStyles" @success="uploadHeadImg"></uni-file-picker>
		</view>
		<button type="primary" loading="true"  class="changeBtn" v-if="ifUploading">上传中</button>
		<button type="primary" class="changeBtn"  v-else   @click="upload">上传</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [], //上传图片的回显信息
				imageStyles: {  //上传图片框的样式
					width: 120,
					height: 120,
					border: {
						color: "#cfcfcf",
						width: 2,
						style: 'dashed',
						radius: '2px'
					}
				},
				ifUploading:false //是否正在上传
			};
		},
		methods:{
			upload() {
				// 点击上传头像
				this.ifUploading = true
				//上传新的头像
				this.$refs.files.upload()
			},
			async uploadHeadImg() {
				//先拿到目前头像的地址并且删除，然后上传新的头像并且拿到新地址替换数据库中的旧地址
				const tokenInfo = uni.getStorageSync('userAccount')
				const db = uniCloud.database();
				const {result:res} = await db.collection('users').where({account:tokenInfo}).get()
				const oldHeadUrl = res.data[0].headImg
				//调用云对象方法删除旧的头像
				const delClassImg = uniCloud.importObject('delClassImg')
				const delObj = delClassImg.delImg(oldHeadUrl)
				
				// 修改数据库的头像url
				await db.collection('users').where({account:tokenInfo}).update({
					headImg:this.imageValue[0].url
				})
				
				this.ifUploading = false
				
				uni.reLaunch({
					url:"/pages/myself/myself"
				})
				
			}
		}
	}
</script>

<style lang="less">
	.changeHead-container {
		box-sizing: border-box;
		padding: 5px;

		.example-body {
			padding: 10px;
			padding-top: 0;
		}
		
		.changeBtn {
			margin-top: 20px;
		}
	}
</style>
