<template>
	<view class="container">
		<view class="theWeek">
			<uni-section :title="'开学时间：' + single" type="line"></uni-section>
			<view class="example-body" v-if="ifChangeStartDate">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" />
			</view>
			<view class="whatWeek">
				<view class="changeWeek">
					<text class="nowWeek" v-if="ifSchool">现在是第<text class="weekNum">{{week}}</text>周</text>
					<text class="nowWeek" v-else>现在是放假时间</text>
					<view class="changeWeekBtn">
						<text>更改:</text>
						<switch color="#FFCC33" style="transform:scale(0.7)" @change="toggle" :disabled="ifLogin" />
					</view>
				</view>
			</view>
		</view>
		<my-curriculum :ifLogin="ifLogin"></my-curriculum>
	</view>
</template>

<script lang="ts">
	import moment from 'moment'
	export default {
		data() {
			return {
				week: 0,   //现在是第几周
				single: '',  //开学时间
				ifSchool:true, //是否开学
				ifChangeStartDate:false  ,//是否更改开学时间
				ifLogin:true,  //是否登录了,登录了改为false,用来判断switch是否禁用
			}
		},
		created() {
			this.getSchoolStartDate()
			this.ifLog()
		},
		methods: {
			//是否展示更改开学时间的组件
			toggle() {
				this.ifChangeStartDate = !this.ifChangeStartDate
			},
			
			//加载页面时先计算这是第几周了
			async getSchoolStartDate() {
				const db = uniCloud.database();
				const {result:res} = await db.collection('schoolWeek').where({id:1}).get()
				this.single = res.data[0].goSchoolDate  //请求到的开学日期放入single
				const startDate = +new Date(this.single)   //开学时间的时间戳
				const nowDateMoment = moment().format('YYYY-MM-DD')
				const nowDate = +new Date(nowDateMoment)  //现在时间的时间戳
				const nowWeek = Math.floor((nowDate - startDate) / 1000 / 60 / 60 / 24 / 7) + 1
				if(nowWeek > 16) {
					this.ifSchool = false
				}else {
					this.week= nowWeek
				}
			}, 
			
			//检查是否登录了
			ifLog() {
				const token = uni.getStorageSync('userAccount')
				if(token) {
					this.ifLogin = false
				}
			}
		},
		watch:{
		    async single(newValue,oldValue) {
				if(oldValue !== '') {  //如果不是渲染时第一次请求的时间，是再次更改的，就更改数据库的时间
					const db = uniCloud.database();
					await db.collection('schoolWeek').where({id:1}).update({
						goSchoolDate:newValue
					})
					this.getSchoolStartDate()
					uni.showToast({
						icon:'success',
						title: '更新成功',
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.container {
		padding: 10px;
		font-size: 14px;

		.theWeek {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.whatWeek {
				margin-top: 10px;
				.changeWeek {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.nowWeek {
						font-size: 17px;
						
						.weekNum {
							font-size: 24px;
							margin: 0 2px;
							color: #ff1b07;
						}
					}
					
					.changeWeekBtn {
						background-color: #eaeaea;
						border-radius: 10px;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 3px 5px;
					}
				}
				.example-body {
					background-color: #fff;
					padding: 10px;
				}
			}

			
		}
	}
</style>
