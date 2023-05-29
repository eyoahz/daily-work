<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="拜访记录" :placeholder="true" bgColor="#2989FF" :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
		/>
		<!-- End 顶部导航栏 -->

		<view class="container">
			<view class="search u-border-bottom">
				<u-search v-model="listParams.searchValue" placeholder="搜索客户名称或编码" actionText="搜索"
					@custom="search" 
					@clear="searchClear"
				/>
			</view>
			<u-sticky :customNavHeight="customNavHeight">
				<view class="tabs">
					<u-tabs lineWidth="90rpx" lineColor="#2989FF" :scrollable="false"
						:activeStyle="{
							fontWeight: 'bold',
							fontSize: '32rpx',
							color: '#000'
						}" 
						:inactiveStyle="{
							fontSize: '32rpx',
							color: '#000'
						}"
						:list="tabsList"
						:current="currentTabs" 
						@change="tabsChange"
					></u-tabs>
				</view>
			</u-sticky>
			<!-- Region 列表 -->
			<view class="list">
				<view class="list-item" v-for="item in list" :key="item.id" >
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">{{ item.customName || '' }}</view>
						<u-tag bgColor="#e9f3ff" color="#2989FF" borderColor="transparent" size="mini"
							:text="visitType[item.visitType]" 
						/>
					</view>
					<view class="info" @tap="() => toDetails(item.id)">
						<view class="info-item">
							<text>所属团队</text>
							<text>{{ item.teamName || '' }}</text>
						</view>
						<view class="info-item">
							<text>拜访人员</text>
							<text>{{ item.ourVisitor || '' }}</text>
						</view>
						<view class="info-item">
							<text>所属商机</text>
							<text>{{ item.customOpportunitiesName || '' }}</text>
						</view>
						<view class="info-item">
							<text>拜访日期</text>
							<text>{{ item.visitTime | date }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- End 列表 -->
			<u-loadmore :status="loadmoreStatus" />
		</view>

		<view class="footer">
			<u-button text="拜访签到" shape="circle" color="#2989FF" 
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="toAttendance"
			/>
		</view>
	</view>
</template>

<script>
	import { getMpCustomVisitPage } from '@/common/api/customer.js';
	
	export default {
		data() {
			return {
				customNavHeight: 90,
				currentTabs: 0,
				tabsList: [{
						name: '全部',
						type: '',
					},
					{
						name: '日常拜访',
						type: 'RC',
					},
					{
						name: '商机拜访',
						type: 'SJ',
					},
				],
				listParams: {
					pageNum: 1,
					pageSize: 10,
					searchValue: '',
					visitType: '',
				},
				isLast: false,
				loadmoreStatus: 'loadmore',
				list: [],
				// 拜访类型
				visitType: {
					RC: '日常',
					SJ: '商机',
				}
			}
		},
		onLoad() {
			this.getList(this.listParams);
		},
		/* 下拉刷新 */
		async onPullDownRefresh() {
			this.init();
			await this.getList(this.listParams);;
			uni.stopPullDownRefresh();
		},
		/* 触底 */
		async onReachBottom() {
			if(this.isLast) return;
			this.listParams.pageNum++;
			await this.getList(this.listParams);
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.container').boundingClientRect(data => {
				this.customNavHeight = data?.top;
			}).exec();
		},
		methods: {
			/* 列表初始化 */
			init() {
				this.listParams.pageNum = 1;
				this.isLast = false;
				this.list = [];
			},
			search(value) {
				if(!uni.$u.trim(value)) return uni.$u.toast('请输入客户名称或客户编码');
				this.init();
				this.listParams.searchValue = uni.$u.trim(value);
				this.getList(this.listParams);
			},
			searchClear() {
				this.init();
				this.getList(this.listParams);
			},
			tabsChange({
				index,
				type
			}) {
				if (this.currentTabs === index) return;
				this.init();
				this.currentTabs = index;
				this.listParams.visitType = type;
				this.getList(this.listParams);
			},
			async getList({
					pageNum = 1,
					pageSize = 10,
					searchValue = '',
					visitType = '',
			}) {
				try{
					this.loadmoreStatus = 'loading';
					const params = {
						pageNum,
						pageSize,
						searchValue,
						visitType
					}
					let { rows: data, total } = await getMpCustomVisitPage(params);
					total ??= 0;
					data ??= [];
					this.list.push(...data);
					if(pageNum * pageSize >= total) {
						this.loadmoreStatus = 'nomore';
						this.isLast = true;
						return;
					}
					this.loadmoreStatus = 'loadmore';
				}catch(err){
					uni.$u.toast(err);
					this.loadmoreStatus = 'loadmore';
				}
			},
			toDetails(id) {
				uni.navigateTo({
					url: `/pages/sub/customer/visit/details/index?id=${id}`,
					/* events: {
						initial: () => {
							this.init();
							this.getList(this.listParams);
						}
					} */
				})
			},
			toAttendance() {
				uni.navigateTo({
					url: '/pages/sub/customer/visit/attendance/index',
					events: {
						initial: () => {
							this.init();
							this.getList(this.listParams);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 200rpx;
		font-size: 28rpx;
	}

	.search {
		padding: 24rpx 34rpx;
		background-color: #fff;
	}

	.tabs {
		padding: 10rpx 0 30rpx;
		background-color: #fff;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
	}

	.list {
		$border-radius: 20rpx;
		margin: 34rpx;

		&-item {
			margin-bottom: 30rpx;
			padding: 0 34rpx;
			border-radius: $border-radius;
			background-color: #fff;

			.top {
				display: flex;
				justify-content: space-between;
				padding: 46rpx 4rpx;

				&-title {
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				gap: 10rpx;
				padding: 36rpx 4rpx;

				&-item {
					display: flex;
					gap: 10rpx;
					justify-content: space-between;

					text {
						&:nth-of-type(1) {
							flex-shrink: 0;
							color: #888888;
						}
						&:nth-of-type(2) {
							word-break: break-all;
						}
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 30rpx 50rpx;
		background-color: #fff;
		box-shadow: 0 -1px 2px rgba(0, 0, 0, .2);
		z-index: 99;
	}
</style>