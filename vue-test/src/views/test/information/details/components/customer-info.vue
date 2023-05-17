<template>
	<view class="customer-info">
		<view class="list">
			<view class="list-item">
				<view class="top  u-border-bottom">
					<view class="top-title  u-line-1">基本信息</view>
				</view>
				<view class="info">
					<view class="info-item">
						<text>客户编码</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>客户名称</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>信用代码</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>所在省市</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>经营人</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>企业类型</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>所属行业</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>企业规模</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
				</view>
			</view>
			
			<view class="list-item">
				<view class="top  u-border-bottom">
					<view class="top-title  u-line-1">其他信息</view>
				</view>
				<view class="info">
					<view class="info-item">
						<text>公海客户</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>所属团队</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>所属大区</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>客户级别</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
					<view class="info-item">
						<text>首次签约年</text>
						<text class="u-line-1">厦门因驰销售A组</text>
					</view>
				</view>
			</view>
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
	props: {
		data: {	// 信息对象
			type: Object,
			default: () => {}
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
					gap: 10rpx;
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