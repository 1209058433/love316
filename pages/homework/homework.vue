<template>
	<view class="homework-container">
		<button type="primary" @click="goWrite">发布新作业</button>
		<view class="homeworkList" :key="fresh">
			<uni-section title="作业列表" type="line"></uni-section>
			<homeworkBox v-for="item in homeworkList" :key="item._id" :homework="item"></homeworkBox>
		</view>
		<view class="noMore">
			<text>没有更多了~</text>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				homeworkList: [], //作业列表
				fresh: 0,
			}
		},
		created() {
			this.getHomeworkList()
		},
		onPullDownRefresh() {
			const thisPage = getCurrentPages()
			const thisPagePath = thisPage[0].$page.fullPath
			uni.redirectTo({
				url: '/pages/none/none?path=' + thisPagePath
			})
			uni.stopPullDownRefresh()
		},
		methods: {
			goWrite() {
				const tokenInfo = uni.getStorageSync('userAccount')
				if (tokenInfo) {
					uni.navigateTo({
						url: '/pages/writehomework/writehomework',
						animationType: "slide-in-right",
						animationDuration: 100
					})
				} else {
					uni.showToast({
						title: '未登录',
						icon: "error",
						duration: 2000
					});
				}

			},

			//请求作业列表
			async getHomeworkList() {
				const db = uniCloud.database();
				const {
					result: res
				} = await db.collection('homework').get()
				this.homeworkList = res.data.reverse()
			}
		}
	}
</script>

<style lang="less">
	.homework-container {
		box-sizing: border-box;
		padding: 10px;

		.homeworkList {
			margin-top: 15px;
		}

		.noMore {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
		}
	}
</style>
