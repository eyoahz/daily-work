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
				<customer-info :keyId="id" />
			</view>
			<view v-show="currentTabs === 1">
				<visit-list />
			</view>
			<view v-show="currentTabs === 2">
				<business-list />
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
				id: '',	// 用户id
			}
		},
		onLoad({ id }) {
			this.id = id;
		},
		onReachBottom() {
			console.log('触底');
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.container').boundingClientRect(data => {
				this.customNavHeight = data?.top;
			}).exec();
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