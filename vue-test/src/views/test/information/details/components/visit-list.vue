<template>
	<view class="visit-list">
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
						<text>拜访人员</text>
						<text class="u-line-1">
							<text style="color: #2989FF;">3</text>个
						</text>
					</view>
					<view class="info-item">
						<text>所属商机</text>
						<text class="u-line-1">福建漳州</text>
					</view>
					<view class="info-item">
						<text>拜访日期</text>
						<text class="u-line-1">食品</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<u-button text="拜访签到" shape="circle" color="#2989FF" :customStyle="{
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
	props: {
		data: {	// 列表数组
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			
		}
	},
}
</script>

<style lang="scss" scoped>
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
							flex-shrink: 0;
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