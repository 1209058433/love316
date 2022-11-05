<template>
	<view class="bannerSwiper">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in randomList" :key="item.id">
				<view class="swiper-item" @click="navigateToWebView(item.id)">
					<image :src="baseUrl + item.cover" mode="aspectFill" class="coverImg"></image>
					<text class="artileTitle">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="bannerNav">
		<view class="iconImg">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3665b370-f42c-4fac-9233-00f08b298dde/a895a6d5-1150-4cb1-b3ea-4f2eeacabfc2.png" mode="aspectFill" class="navImg" @click="pushUrl('http://www.xttc.edu.cn/')"></image>
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3665b370-f42c-4fac-9233-00f08b298dde/bb36148d-f5ed-4cad-8dbb-015ac749222a.png" mode="aspectFill" class="navImg" @click="pushUrl('http://portal.xttc.edu.cn/')"></image>
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3665b370-f42c-4fac-9233-00f08b298dde/6f2867bc-8802-4d4a-a15d-08c36ca9ae78.png" mode="aspectFill" class="navImg" @click="pushUrl('homework')"></image>
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3665b370-f42c-4fac-9233-00f08b298dde/a8cb34db-e4ff-4253-b1e8-8551ba254d56.png" mode="aspectFill" class="navImg" @click="pushUrl('https://www.ibukisk.top')"></image>
		</view>
		<view class="iconTitle">
			<text class="title">学校官网</text>
			<text class="title">智慧校园</text>
			<text class="title">发布作业</text>
			<text class="title">Blog</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Banner",
		onLoad() {
			this.getArticleList()
		},
		data() {
			return {
				baseUrl:'https://www.ibukisk.top:3031',
				randomList:[],
			};
		},
		methods:{
			getArticleList() {
				//请求文章列表
				uni.request({
					url:this.baseUrl + '/api/getarticle',
					success:(res) => {
						const list = res.data.data
						//随机选出来的文章列表
						const randomArticle = []
						//随机选出三个文章
						while(randomArticle.length < 5) {
							if(list.length < 5) {
								return
							}
							//生成随机数
							const randomNum = Math.floor(Math.random() * res.data.data.length)
							//判断，如果已经被添加了，就不添加，没添加的才添加
							if(randomArticle.indexOf(list[randomNum]) === -1) {
								randomArticle.push(list[randomNum])
							}else {
								continue
							}
						}
						this.randomList = randomArticle
					}
				})
			},
			
			pushUrl(val) {
				if(val === 'homework') {
					uni.navigateTo({
						url:'/pages/writehomework/writehomework'
					})
				}else {
					//先存储到localStrange
					uni.setStorageSync('pageUrl',val)
					uni.navigateTo({
						url:'/pages/urlView/urlView'
					})
				}
			},
			
			navigateToWebView(id) {
				uni.navigateTo({
					url:'/pages/blogView/blogView?id=' + id
				})
			}
		}
	}
</script>

<style lang="less">
.bannerSwiper {
	margin-top: 20px;
	.swiper-item {
		width: 100%;
		height: 100%;
		position: relative;
		
		.coverImg {
			width: 100%;
			height: 100%;
		}
		
		.artileTitle {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(255, 255, 255,.6);
			box-sizing: border-box;
			padding: 5px 10px;
			font-size: 14px;
			font-weight: 700;
		}
		
	}
}

.bannerNav {
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	
	.iconImg {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-column-gap: 10px;
		height: 80px;
		
		.navImg {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			overflow: hidden;
			background-color: #fff;
		}
	}
	
	.iconTitle {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-column-gap: 10px;
		height: 25px;
		
		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			font-weight: 700;
		}
	}
}
</style>