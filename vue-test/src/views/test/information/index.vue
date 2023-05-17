<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="客户信息" :placeholder="true" bgColor="#2989FF" :leftIcon="null" :border="false"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }" />
		<!-- End 顶部导航栏 -->

		<view class="container">
			<view class="search u-border-bottom">
				<u-search placeholder="搜索客户名称或编码" actionText="搜索" @custom="search" />
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
				<view class="list-item" v-for="item in 6">
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">福建省梦娇兰日用化学品有限公司</view>
						<u-tag text="标签" bgColor="#e9f3ff" color="#2989FF" borderColor="transparent" size="mini" />
					</view>
					<view class="info">
						<view class="info-item">
							<text>所属团队</text>
							<text class="u-line-1">厦门因驰销售A组</text>
						</view>
						<view class="info-item">
							<text>商机数量</text>
							<text class="u-line-1">
								<text style="color: #2989FF;">3</text>个
							</text>
						</view>
						<view class="info-item">
							<text>所在省市</text>
							<text class="u-line-1">福建漳州</text>
						</view>
						<view class="info-item">
							<text>所在行业</text>
							<text class="u-line-1">食品</text>
						</view>
					</view>
				</view>
			</view>
			<!-- End 列表 -->
		</view>

		<view class="footer">
			<u-button text="新增客户" shape="circle" color="#2989FF" :customStyle="{
				margin: 0,
				marginLeft: 'auto',
				width: '200rpx',
				height: '80rpx'
			}"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customNavHeight: 90,
				currentTabs: 0,
				tabsList: [{
						name: '全部',
						type: '全部',
					},
					{
						name: '公海客户',
						type: '公海',
					},
					{
						name: '非公海客户',
						type: '非公海',
					},
				],
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.container').boundingClientRect(data => {
				this.customNavHeight = data?.top;
			}).exec();
		},
		onReachBottom() {
			console.log('触底');
		},
		methods: {
			search(value) {
				console.log('搜索', value);
			},
			tabsChange({
				index,
				type
			}) {
				if (this.currentTabs === index) return;
				this.currentTabs = index;
				console.log(type);
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
					justify-content: space-between;

					text {
						&:nth-of-type(1) {
							color: #888888;
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