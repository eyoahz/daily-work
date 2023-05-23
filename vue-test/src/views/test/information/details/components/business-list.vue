<template>
	<view class="business-list">
		<view class="list">
			<view class="list-item" v-for="item in list" :key="item.id">
				<view class="top  u-border-bottom">
					<view class="top-title  u-line-1">{{ item.name || '' }}</view>
					<u-tag bgColor="#e9f3ff" color="#2989FF" borderColor="transparent" size="mini"
						:text="currentStatus[item.currentStatus]"
					/>
				</view>
				<view class="info" @tap="$u.route('/pages/sub/opportunities/details/index', { id: item.id })">
					<view class="info-item">
						<text>客户名称</text>
						<text class="u-line-1">{{ item.customName || '' }}</text>
					</view>
					<view class="info-item">
						<text>所属团队</text>
						<text class="u-line-1">{{ item.teamName || '' }}</text>
					</view>
					<view class="info-item">
						<text>对接人员</text>
						<text class="u-line-1">{{ item.projectIndividual || '' }}</text>
					</view>
					<!-- <view class="info-item">
						<text>商机报价</text>
						<text class="u-line-1">{{ item.name || '' }}</text>
					</view> -->
				</view>
			</view>
		</view>
		
		<u-loadmore :status="loadmoreStatus" />
		
		<view class="footer">
			<u-button text="新增商机" shape="circle" color="#2989FF" :customStyle="{
				margin: 0,
				marginLeft: 'auto',
				width: '200rpx',
				height: '80rpx'
			}"></u-button>
		</view>
	</view>
</template>

<script>
import { getMpCustomOpportunitiesPage } from "@/common/api/customer.js";
	
export default {
	props: {
		code: {	// 用户编码
			type: [String, Number],
			default: ''
		},
	},
	data() {
		return {
			listParams: {
				pageNum: 1,
				pageSize: 10,
				customCode: '',
				searchValue: '',
				currentStatus: '',
			},
			isLast: false,
			loadmoreStatus: 'loadmore',
			list: [],
			// 项目状态
			currentStatus: {
				DSH: "待审核",
				SHTG: "审核通过",
				SHBTG: "审核不通过",
				YWC: "已完成",
				YSF: "已释放"
			}
		}
	},
	mounted() {
		this.listParams.customCode = this.code;
		this.getList(this.listParams);
	},
	methods: {
		/* 列表初始化 */
		init() {
			this.listParams.pageNum = 1;
			this.isLast = false;
			this.list = [];
		},
		async getList({
				pageNum = 1,
				pageSize = 10,
				customCode = '',
				searchValue = '',
				currentStatus = '',
		}) {
			try{
				this.loadmoreStatus = 'loading';
				const params = {
					pageNum,
					pageSize,
					customCode,
					searchValue,
					currentStatus
				}
				let { rows: data, total } = await getMpCustomOpportunitiesPage(params);
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
		/* 刷新 */
		async refresh() {
			this.init();
			await this.getList(this.listParams);
		},
		/* 触底 */
		async reachBottom() {
			if(this.isLast) return;
			this.listParams.pageNum++;
			await this.getList(this.listParams);
		},
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