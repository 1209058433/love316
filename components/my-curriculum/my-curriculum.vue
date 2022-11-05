<template>
	<view class="curriculum-container">
		<!-- 首页的课程表组件 -->
		<view class="classList">
			<!-- 课程表 -->
			<view class="classTitle">
				<text>课程表(图片)</text>
				<view>
					<text>更新</text>
					<switch color="#FFCC33" style="transform:scale(0.7)" @change="upLoadCurriculum"
						:disabled="ifLogin" />
				</view>
			</view>
			<view class="classImg" @click="watchcurriculumUrl">
				<text>点击查看课程表图片</text>
				<text>只是一张图？能看就行了</text>
			</view>
			<!-- 更新课程表图片(上传) -->
			<view class="upLoadCurriculum" v-if="ifChangeCurriculum">
				<view class="example-body">
					<uni-file-picker limit="1" title="最多选择1张图片,仅支持png/jpg" file-mediatype="image" file-extname="png,jpg"
						@progress="uploadingImg" @success="uploadSuccess" @fail="uploadFail" v-model="newCurriculumUrl">
					</uni-file-picker>
				</view>
			</view>
			<!-- 作息时间表 -->
			<view class="classTitle">
				<text>作息时间(图片)</text>
				<view>
					<text>更新</text>
					<switch color="#FFCC33" style="transform:scale(0.7)" @change="uploadClassTime"
						:disabled="ifLogin" />
				</view>
			</view>
			<view class="classImg" @click="watchClassTimeImg">
				<text>点击查看作息时间时间图片</text>
				<text>还是一张图</text>
			</view>
			<!-- 更新作息时间表图片(上传) -->
			<view class="upLoadCurriculum" v-if="ifChangeClassTime">
				<view class="example-body">
					<uni-file-picker limit="1" title="最多选择1张图片,仅支持png/jpg" file-mediatype="image" file-extname="png,jpg"
						@progress="uploadingImg" @success="uploadSuccessTime" @fail="uploadFail"
						v-model="newClassTimeUrl">
					</uni-file-picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		props: {
			ifLogin: Boolean
		},
		data() {
			return {
				// fileID
				newCurriculumUrl: [], //更新课程表的上传图片回显数据
				newClassTimeUrl: [], //更新时间表的上传图片的回显数据
				curriculumUrl: '', //课程表图片的url
				classTimeUrl: '', //时间表的url
				ifChangeCurriculum: false, //是否上传新的课程表图片 
				ifChangeClassTime: false, //是否上传新的时间表图片 
			}
		},
		created() {
			this.getBaseData()
		},
		methods: {
			async getBaseData() {
				//读取数据库拿到课程表图片和时间安排图片的url
				const db = uniCloud.database();
				const {
					result: res
				} = await db.collection('schoolWeek').where({
					id: 1
				}).get()
				this.curriculumUrl = res.data[0].curriculumUrl
				this.classTimeUrl = res.data[0].classTimeUrl
			},
			watchcurriculumUrl() { //点击预览
				uni.previewImage({
					urls: [this.curriculumUrl]
				})
			},
			watchClassTimeImg() { //点击预览
				uni.previewImage({
					urls: [this.classTimeUrl]
				})
			},
			//图片上传时
			uploadingImg() {
				uni.showLoading({
					title: '加载中'
				});
			},
			//图片上传成功(课程表)
			async uploadSuccess() {
				uni.hideLoading()
				//删除原课程表图片，换成刚上传的图片
				//调用云对象删除图片的方法
				const delClassImg = uniCloud.importObject('delClassImg')
				const res = delClassImg.delImg(this.curriculumUrl)
				//吧新上传的图片的url更新到数据库中
				const db = uniCloud.database();
				await db.collection('schoolWeek').where({
					id: 1
				}).update({
					curriculumUrl: this.newCurriculumUrl[0].url
				})
				uni.showToast({
					icon: 'success',
					title: '上传成功',
					duration: 2000
				});
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},

			//图片上传成功(时间表)
			async uploadSuccessTime() {
				//删除原时间表图片，换成刚上传的图片
				//调用云对象删除图片的方法
				const delClassImg = uniCloud.importObject('delClassImg')
				const res = delClassImg.delImg(this.classTimeUrl)
				//删除成功
				//吧新上传的图片的url更新到数据库中
				const db = uniCloud.database();
				await db.collection('schoolWeek').where({
					id: 1
				}).update({
					classTimeUrl: this.newClassTimeUrl[0].url
				})
				uni.hideLoading()
				uni.showToast({
					icon: 'success',
					title: '上传成功',
					duration: 2000
				});
				uni.redirectTo({
					url:'/pages/index/index'
				})

			},

			//图片上传失败
			uploadFail() {
				uni.hideLoading()
				uni.showToast({
					icon: 'error',
					title: '上传失败',
					duration: 2000
				});
			},

			upLoadCurriculum() {
				this.ifChangeCurriculum = !this.ifChangeCurriculum
			},
			uploadClassTime() {
				this.ifChangeClassTime = !this.ifChangeClassTime
			},
		}
	}
</script>

<style lang="less">
	.curriculum-container {
		margin-top: 10px;

		.classList {
			background-color: #ececec;
			box-sizing: border-box;
			padding: 10px;
			font-size: 16px;
			font-weight: 700;
			border-radius: 10px;

			.classImg {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 13px;
				color: #9e9e9e;
				background-color: rgba(0, 170, 255, 0.2);
				box-sizing: border-box;
				padding: 10px;
				border-radius: 8px;
				margin-top: 5px;
				font-weight: 500;
				margin-bottom: 10px;

				:nth-child(1) {
					color: #000;
					font-size: 15px;
					margin-bottom: 2px;
				}
			}

			.classTitle {
				display: flex;
				align-items: center;
				justify-content: space-between;

				:nth-child(2) {
					:nth-child(1) {
						font-weight: 400;
						font-size: 12px;
					}
				}
			}

			.upLoadCurriculum {
				background-color: #fff;
				box-sizing: border-box;
				padding: 10px;
				border-radius: 8px;
			}
		}
	}
</style>
