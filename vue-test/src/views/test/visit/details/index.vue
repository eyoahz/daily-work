<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="拜访详情" :placeholder="true" bgColor="#2989FF" :leftIcon="null" :border="false"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }" />
		<!-- End 顶部导航栏 -->

		<view class="container">
			<!-- Region 列表 -->
			<view class="list">
				<view class="list-item">
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">客户信息</view>
					</view>
					<view class="info">
						<view class="info-item">
							<text>客户编码</text>
							<text class="u-line-1">KH2023051214355601</text>
						</view>
						<view class="info-item">
							<text>客户名称</text>
							<text class="u-line-1">福建省梦娇兰日用化学品有限公司A组</text>
						</view>
					</view>
				</view>
				
				<view class="list-item">
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">拜访信息</view>
					</view>
					<view class="info">
						<view class="info-item">
							<text>拜访编号</text>
							<text class="u-line-1">BF2023051009342134</text>
						</view>
						<view class="info-item">
							<text>拜访类型</text>
							<text class="u-line-1">日常</text>
						</view>
						<view class="info-item">
							<text>所属商机</text>
							<text class="u-line-1">ERP</text>
						</view>
						<view class="info-item">
							<text>拜访方式</text>
							<text class="u-line-1">面谈</text>
						</view>
						<view class="info-item">
							<text>拜访日期</text>
							<text class="u-line-1">2023年5月10日</text>
						</view>
						<view class="info-item">
							<text>拜访人员</text>
							<text class="u-line-1">何志楠</text>
						</view>
						<view class="info-item">
							<text>签到地址</text>
							<text class="u-line-1">福建省龙海市港公路8号</text>
						</view>
						<view class="info-item">
							<text>签到时间</text>
							<text class="u-line-1">09:34</text>
						</view>
						<view class="info-item">
							<text>客户方接待人</text>
							<text class="u-line-1">经理</text>
						</view>
						<view class="info-item">
							<text>商谈事项</text>
							<text class="u-line-1">ERP平台细节</text>
						</view>
						<view class="info-item">
							<text>结果评价</text>
							<text class="u-line-1">无</text>
						</view>
					</view>
				</view>
				
				<view class="list-item">
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">相关附件</view>
					</view>
					<view class="info">
						<view class="info-item" v-for="item in 3">
							<text>附件</text>
							<a href="" style="color: #2989FF;">下载</a>
						</view>
					</view>
				</view>
			</view>
			<!-- End 列表 -->
		</view>

		<view class="footer">
			<u-button text="修改详情" shape="circle" color="#2989FF" :customStyle="{
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
			}
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