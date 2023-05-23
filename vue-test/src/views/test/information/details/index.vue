<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="客户详情" :placeholder="true" bgColor="#2989FF"  :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
		/>
		<!-- End 顶部导航栏 -->

		<view class="container">
			<!-- <view class="search u-border-bottom">
				<u-search placeholder="搜索客户名称或编码" actionText="搜索" @custom="search" />
			</view> -->
			<u-sticky :customNavHeight="customNavHeight">
				<view class="tabs">
					<u-tabs :list="tabsList":current="currentTabs" :scrollable="false"
						lineColor="#2989FF"
						lineWidth="90rpx"
						:activeStyle="{
							fontWeight: 'bold',
							fontSize: '32rpx',
							color: '#000'
						}"
						:inactiveStyle="{
							fontSize: '32rpx',
							color: '#000'
						}"
						@change="tabsChange"
					></u-tabs>
				</view>
			</u-sticky>
			<!-- Region 列表 -->
			<view v-show="currentTabs === 0">
				<customer-info ref="customerInfo" :keyId="user.id" />
			</view>
			<view v-show="currentTabs === 1">
				<visit-list ref="visitList" :code="user.code"/>
			</view>
			<view v-show="currentTabs === 2">
				<business-list ref="businessList" :code="user.code"/>
			</view>
			<!-- End 列表 -->
		</view>

	</view>
</template>

<script>
	import CustomerInfo from "./components/customer-info.vue"
	import VisitList from "./components/visit-list.vue"
	import BusinessList from "./components/business-list.vue"
	import { getCustomDetail } from '@/common/api/customer.js'

	export default {
		components: {
			CustomerInfo,
			VisitList,
			BusinessList
		},
		data() {
			return {
				customNavHeight: 90,
				currentTabs: 0,
				tabsList: [{
						name: '客户详情',
						type: '客户详情',
					},
					{
						name: '拜访记录',
						type: '拜访记录',
					},
					{
						name: '商机记录',
						type: '商机记录',
					},
				],
				user: {
					id: '',	// 用户id
					code: '',	// 用户编码
				}
			}
		},
		onLoad({ id, code }) {
			this.user.id = id;
			this.user.code = code;
			console.log(this.user, 7777);
		},
		/* 下拉刷新 */
		async onPullDownRefresh() {
			try {
				uni.showLoading({
					title: '加载中',
					mask: true,
				})
				switch (this.currentTabs) {
					case 0:
						await this.$refs.customerInfo.refresh();
						break;
					case 1:
						await this.$refs.visitList.refresh();
						break;
					case 2:
						await this.$refs.businessList.refresh();
						break;
				}
				uni.hideLoading();
			}catch(err) {
				uni.$u.toast(err);
			} finally {
				uni.stopPullDownRefresh();
			}
		},
		/* 触底 */
		onReachBottom() {
			switch (this.currentTabs) {
				case 1:
					this.$refs.visitList.reachBottom();
					break;
				case 2:
					this.$refs.businessList.reachBottom();
					break;
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.container').boundingClientRect(data => {
				this.customNavHeight = data?.top;
			}).exec();
		},
		methods: {
			/* search(value) {
				console.log('搜索', value);
			}, */
			tabsChange({
				index,
				type
			}) {
				if (this.currentTabs === index) return;
				this.currentTabs = index;
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