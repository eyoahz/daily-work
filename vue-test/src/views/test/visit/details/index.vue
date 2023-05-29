<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="拜访详情" :placeholder="true" bgColor="#2989FF" :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
		/>
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
							<text class="u-line-1">{{ data.customCode || '' }}</text>
						</view>
						<view class="info-item">
							<text>客户名称</text>
							<text class="u-line-1">{{ data.customName || '' }}</text>
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
							<text>{{ data.code || '' }}</text>
						</view>
						<view class="info-item">
							<text>拜访类型</text>
							<text>{{ visitType[data.visitType] || '' }}</text>
						</view>
						<view class="info-item">
							<text>所属商机</text>
							<text>{{ data.customOpportunitiesName || '' }}</text>
						</view>
						<!-- <view class="info-item">
							<text>拜访方式</text>
							<text>{{ data.visitingMethods || '' }}</text>
						</view> -->
						<view class="info-item">
							<text>拜访日期</text>
							<text>{{ data.visitTime | date }}</text>
						</view>
						<view class="info-item">
							<text>拜访人员</text>
							<text>{{ data.ourVisitor || '' }}</text>
						</view>
						<view class="info-item">
							<text>签到时间</text>
							<text>{{ data.signInTime || '' }}</text>
						</view>
						<view class="info-item">
							<text>客户方接待人</text>
							<text>{{ data.customerReception || '' }}</text>
						</view>
						<view class="info-item">
							<text>商谈事项</text>
							<text>{{ data.negotiateMatters || '' }}</text>
						</view>
						<view class="info-item">
							<text>结果评价</text>
							<text>{{ data.resultEvaluation || '' }}</text>
						</view>
						<view class="info-item">
							<text>签到地址</text>
							<text>{{ data.signInAddress || '' }}</text>
						</view>
					</view>
				</view>
				
				<view class="list-item">
					<view class="top  u-border-bottom">
						<view class="top-title  u-line-1">相关附件</view>
						<view style="color: #2989ff" @tap="upload">上传</view>
					</view>
					<view class="info" v-if="list.length">
						<view class="info-item" v-for="item in list" :key="item.id">
							<text>{{ item.name || '' }}</text>
							<view style="color: #2989FF;" @tap="() => download(item.name, item.url)">下载</view>
						</view>
					</view>
					<u-empty mode="data" v-else/>
					<view v-show="false">
						<u-upload
							ref="uUpload"
							accept="all"
							@afterRead="afterRead"
						></u-upload>
					</view>
				</view>
			</view>
			<!-- End 列表 -->
			
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
			/>
		</view>
	</view>
</template>

<script>
	import { getCustomVisitDetail, getAnnexList, insertBatchAnnex } from '@/common/api/customer.js';
	import { file } from '@/common/util/https';
	
	export default {
		data() {
			return {
				// 详情数据
				data: {},
				// 拜访类型
				visitType: {
					RC: '日常',
					SJ: '商机',
				},
				listParams: {
					sourceId: '',
					type: 'KHBF',
				},
				list: [],
			}
		},
		async onLoad({ id }) {
			this.listParams.sourceId = id;
			this.getDetail();
		},
		methods: {
			/* 初始化数据 */
			init() {
				this.data = {};
				this.list = [];
			},
			getDetailPromise() {
				const promises = [
					getCustomVisitDetail({ id: this.listParams.sourceId }),
					getAnnexList(this.listParams)
				]
				return Promise.allSettled(promises);
			},
			async getDetail(id) {
				try{
					uni.showLoading({
						title: '加载中',
						mask: true
					})
					const [ data, list ] = await this.getDetailPromise();
					this.data = data?.value ?? {};
					this.list = list?.value?.rows ?? [];
					uni.hideLoading();
				}catch(err){
					uni.$u.toast(err);
				}
			},
			async afterRead({ file: { name, size, url } }) {
				try{
					uni.showLoading({
						title: '上传中',
						mask: true
					})
					let { data } = await file.upload({ filePath: url, options: { isReturnNativeResponse: true } });
					const response = JSON.parse(data) ?? {};
					await insertBatchAnnex([{
						...this.listParams,
						name,
						url: response?.data?.url,
					}])
					this.list.push({ url: response?.data?.url, name })
					uni.$u.toast('上传成功');
				}catch(err){
					uni.$u.toast(err);
				}
			},
			/* 上传 */
			upload() {
				this.$refs.uUpload.chooseFile();
			},
			/* 下载 */
			download(name, url) {
				const docSuffix = ['.doc', '.xls', '.ppt', '.pdf', '.docx', '.xlsx', '.pptx'];
				uni.showLoading({
					title: '下载中',
					mask: true
				})
				uni.downloadFile({
					url,
					success: (res) => {
						const tempFilePath = res?.tempFilePath;
						const suffix = res?.tempFilePath.match(/\.([^./\\]+)$/g)[0];
						if(docSuffix.includes(suffix)) {
							uni.openDocument({
								filePath: res?.tempFilePath,
								showMenu: true,
								fail: () => {
									uni.$u.toast('打开失败');
								}
							})
						} else {
							uni.previewImage({
								current: 0,
								urls: [res?.tempFilePath],
								fail: () => {
									uni.$u.toast('打开失败');
								}
							})
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.$u.toast('下载失败');
					}
				})
			},
			toEdit() {
				uni.navigateTo({
					url: `/pages/sub/customer/visit/attendance/index?id=${this.listParams.sourceId}`,
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
			padding: 0 34rpx 30rpx;
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