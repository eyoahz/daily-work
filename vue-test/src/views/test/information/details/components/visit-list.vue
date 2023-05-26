<template>
	<view class="visit-list">
		<view class="list">
			<view class="list-item" v-for="item in list" :key="item.id" >
				<view class="top  u-border-bottom">
					<view class="top-title  u-line-1">{{ item.customName || '' }}</view>
					<u-tag bgColor="#e9f3ff" color="#2989FF" borderColor="transparent" size="mini"
						:text="visitType[item.visitType]" 
					/>
				</view>
				<view class="info" @tap="$u.route('/pages/sub/customer/visit/details/index', { id: item.id })">
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
		
		<u-loadmore :status="loadmoreStatus" />
		
		<view class="footer">
			<u-button text="拜访签到" shape="circle" color="#2989FF" 
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="toVisit"
			></u-button>
		</view>
	</view>
</template>

<script>
import { getMpCustomVisitPage } from "@/common/api/customer.js";
	
export default {
	props: {
		code: {	// 客户编码
			type: [String, Number],
			default: ''
		},
		name: {	// 客户名称
			type: [String, Number],
			default: ''
		},
	},
	data() {
		return {
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
	mounted() {
		this.listParams.searchValue = this.code;
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
				searchValue = '',
				visitType = '',
		}) {
			try{
				this.loadmoreStatus = 'loading';
				const params = {
					pageNum,
					pageSize,
					searchValue,
					visitType,
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
		toVisit() {
			uni.navigateTo({
				url: `/pages/sub/customer/visit/attendance/index?customCode=${this.code}&customName=${this.name}`,
				events: {
					// 初始化
					initial: () => {
						this.init();
						this.refresh();
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