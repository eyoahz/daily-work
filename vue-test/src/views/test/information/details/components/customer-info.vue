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
						<text>{{ data.code || '' }}</text>
					</view>
					<view class="info-item">
						<text>客户名称</text>
						<text>{{ data.name || '' }}</text>
					</view>
					<view class="info-item">
						<text>信用代码</text>
						<text>{{ data.unifiedSocialCreditCode || '' }}</text>
					</view>
					<view class="info-item">
						<text>所在省市</text>
						<text>{{ `${data.province || ''}${data.city || ''}` }}</text>
					</view>
					<view class="info-item">
						<text>经营人</text>
						<text>{{ data.operator || '' }}</text>
					</view>
					<view class="info-item">
						<text>企业类型</text>
						<text>{{ data.enterpriseType || '' }}</text>
					</view>
					<view class="info-item">
						<text>所属行业</text>
						<text>{{ data.industry || '' }}</text>
					</view>
					<view class="info-item">
						<text>企业规模</text>
						<text>{{ data.scale || '' }}</text>
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
						<text class="u-line-1">{{ data.isHighSeas == '1' ? '是' : '否' }}</text>
					</view>
					<view class="info-item">
						<text>所属团队</text>
						<text class="u-line-1">{{ data.teamName || '' }}</text>
					</view>
					<view class="info-item">
						<text>所属大区</text>
						<text class="u-line-1">{{ data.regionName || '' }}</text>
					</view>
					<view class="info-item">
						<text>客户级别</text>
						<text class="u-line-1">{{ data.gradeName || '' }}</text>
					</view>
					<view class="info-item">
						<text>首次签约年</text>
						<text class="u-line-1">{{ (data.firstSigningYear || '').slice(0, 4) }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<u-button text="修改详情" shape="circle" color="#2989FF" 
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="toEdit"
			></u-button>
		</view>
	</view>
</template>

<script>
import { getCustomDetail } from "@/common/api/customer.js";
	
export default {
	props: {
		// ID
		keyId: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			data: {},
		}
	},
	mounted() {
		this.getDetail();
	},
	methods: {
		init() {
			this.data = {};
		},
		async getDetail() {
			try{
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				const res = await getCustomDetail({ id: this.keyId });
				this.data = res;
				uni.hideLoading();
			}catch(err){
				uni.$u.toast(err);
			}
		},
		/* 刷新 */
		async refresh() {
			await this.getDetail();
		},
		toEdit() {
			uni.navigateTo({
				url: `/pages/sub/customer/information/typein/index?id=${this.keyId}`,
				events: {
					// 初始化
					initial: () => {
						this.init();
						this.getDetail();
					}
				}
			})
		}
	}
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