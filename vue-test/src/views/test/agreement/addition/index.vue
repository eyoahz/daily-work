<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="合同录入" :placeholder="true" bgColor="#2989FF" :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
		/>
		<!-- End 顶部导航栏 -->
		
		<view class="container">			
			<view class="form">
				<u--form ref="uForm" :model="uFormModel" labelPosition="top" labelWidth="auto">
					<u-form-item
						label="合同名称"
						prop="agreementInfo.name"
						:required="true"
					>
						<u--input
							v-model="uFormModel.agreementInfo.name"
						/>
					</u-form-item>
					<u-form-item
						label="客户名称"
						prop="agreementInfo.customName"
						:required="true"
					>
						<u--input
							v-model="uFormModel.agreementInfo.customName"
							suffixIcon="arrow-right"
							readonly
							@tap="customerSelection"
						/>
					</u-form-item>
					<u-form-item
						label="所属商机"
						prop="agreementInfo.opportunitiesName"
						:required="true"
					>
						<u--input
							v-model="uFormModel.agreementInfo.opportunitiesName"
							suffixIcon="arrow-right"
							readonly
							@tap="businessSelection"
						/>
					</u-form-item>
					<u-form-item
						label="合同记录描述"
						prop="agreementInfo.contractRecordDescription"
					>
						<u--textarea v-model="uFormModel.agreementInfo.contractRecordDescription" autoHeight />
					</u-form-item>
					
				</u--form>
			</view>
			
			<!-- Region 附件上传 -->
			<view class="annex" v-if="!id">
				<view class="top  u-border-bottom">
					<view class="top-title  u-line-1">相关附件</view>
				</view>
				<u-upload
					accept="all"
					:fileList="uFormModel.agreementInfo.annexList"
					width="180rpx"
					height="180rpx"
					@afterRead="afterRead"
					@delete="deletePic"
					:maxCount="10"
					showFilename
				></u-upload>
			</view>
			<!-- End 附件上传 -->
		</view>
								
		<view class="footer">
			<u-button text="确认修改" shape="circle" color="#2989FF"
				v-if="id"
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="editSubmit"
			></u-button>
			<u-button shape="circle" color="#2989FF"
				text="确认提交"
				v-if="!id"
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="addSubmit"
			></u-button>
		</view>
	</view>
</template>

<script>
import { file } from '@/common/util/https';
import { insertCustomContract, getCustomContractDetail, updateCustomContract } from '@/common/api/customer.js';
	
export default {
	data() {
		return {
			id: '',
			customCode: '',
			customerOpportunitiesId: '',
			uFormModel: {
				agreementInfo: {
					name: '',	// 合同名称
					customName: '',	// 客户名称
					customCode: '',	// 客户编码
					opportunitiesName: '',	// 所属商机label
					customerOpportunitiesId: '',	// 所属商机value
					contractRecordDescription: '',	// 合同记录描述
					annexList: [],	// 附件
				}
			},
			uFormRules: {
				agreementInfo: {
					'agreementInfo.name': {
						type: 'string',
						required: true,
						message: '请填写合同名称',
						trigger: ['blur', 'change']
					},
					'agreementInfo.customName': {
						type: 'string',
						required: true,
						message: '请选择客户',
						trigger: ['blur', 'change']
					},
					'agreementInfo.opportunitiesName': {
						type: 'string',
						required: true,
						message: '请选择所属商机',
						trigger: ['blur', 'change']
					},
				}
			},
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.uFormRules.agreementInfo);
	},
	async onLoad({ id, customCode, customName, customerOpportunitiesId, opportunitiesName }) {
		try{
			this.id = id;
			this.customCode = customCode ?? '';
			this.customerOpportunitiesId = customerOpportunitiesId ?? '';
			this.uFormModel.agreementInfo.customName = customName ?? '';
			this.uFormModel.agreementInfo.customCode = customCode ?? '';
			this.uFormModel.agreementInfo.opportunitiesName = opportunitiesName ?? '';
			this.uFormModel.agreementInfo.customerOpportunitiesId = customerOpportunitiesId ?? '';
			uni.showLoading({
				title: '加载中',
				mask: true,
			})
			
			id && await this.getDetail(id);
			uni.hideLoading();
		}catch(err){
			uni.$u.toast(err);
		}
	},
	methods: {
		/* 获取拜访记录详情 */
		async getDetail(id) {
			const res = await getCustomContractDetail({ id });
			Object.assign(this.uFormModel.agreementInfo, res)
		},
		/* 客户选择 */
		customerSelection() {
			if(this.id || this.customCode) return uni.$u.toast('不可更改');
			uni.navigateTo({
				url: '/pages/sub/public/selection/customer',
				events: {
					selected: ({ name, code }) => {
						this.uFormModel.agreementInfo.customName = name ?? '';
						this.uFormModel.agreementInfo.customCode = code ?? '';
					}
				}
			})
		},
		/* 商机选择 */
		businessSelection() {
			if(this.id || this.customerOpportunitiesId) return uni.$u.toast('不可更改');
			uni.navigateTo({
				url: '/pages/sub/public/selection/business',
				events: {
					selected: ({ name, id }) => {
						this.uFormModel.agreementInfo.opportunitiesName = name ?? '';
						this.uFormModel.agreementInfo.customerOpportunitiesId = id ?? '';
					}
				}
			})
		},
		async afterRead({ file: { name, size, url } }) {
			try{
				uni.showLoading({
					title: '上传中',
					mask: true
				})
				let { data } = await file.upload({ filePath: url, options: { isReturnNativeResponse: true } });
				const response = JSON.parse(data) ?? {};
				this.uFormModel.agreementInfo.annexList.push({ 
					url: response?.data?.url,
					name,
					filename: name,
				})
				uni.hideLoading();
			}catch(err){
				uni.$u.toast(err);
			}
		},
		deletePic({ index }) {
			this.uFormModel.agreementInfo.annexList.splice(index, 1);
		},
		/* 提交表单-新增 */
		async addSubmit() {
			try{
				const eventChannel = this.getOpenerEventChannel();
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await insertCustomContract({ 
					...this.uFormModel.agreementInfo,
				});
				uni.$u.toast('提交成功');
				const preRouter = getCurrentPages()?.slice(-2);
				setTimeout(() => {
					if(preRouter?.[0]?.route == 'pages/main/home/index') {
						uni.redirectTo({
							url: '/pages/sub/customer/visit/index'
						});
						return;
					}
					uni.navigateBack({
						success() {
							eventChannel.emit('initial')
						}
					})
				}, 500)
			}catch(err){
				if(Array.isArray(err)) return uni.$u.toast(err[0]?.message ?? '校验失败');
				uni.$u.toast(err);
			}
		},
		/* 提交表单-修改 */
		async editSubmit() {
			try{
				const eventChannel = this.getOpenerEventChannel();
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await updateCustomContract({ 
					...this.uFormModel.agreementInfo,
				});
				uni.$u.toast('提交成功');
				const preRouter = getCurrentPages()?.slice(-2);
				setTimeout(() => {
					if(preRouter?.[0]?.route == 'pages/main/home/index') {
						uni.redirectTo({
							url: '/pages/sub/customer/agreement/index'
						});
						return;
					}
					uni.navigateBack({
						success() {
							eventChannel.emit('initial')
						}
					})
				}, 500)
			}catch(err){
				if(Array.isArray(err)) return uni.$u.toast(err[0]?.message ?? '校验失败');
				uni.$u.toast(err);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	$border-radius: 20rpx;
	
	.container {
		padding: 30rpx 34rpx 200rpx;
		font-size: 28rpx;
	}
		
	.form {
		margin: 0 calc(18rpx);
		
		/deep/ .u-input {
			margin: 0 -18rpx;
			background-color: #fff;
		}
		/deep/ .u-textarea {
			margin: 0 -18rpx;
			background-color: #fff;
		}
	}
	
	.annex {
		$border-radius: 20rpx;
		background-color: #fff;
		padding: 0 34rpx;
		border-radius: $border-radius;
		.top {
			display: flex;
			justify-content: space-between;
			padding: 46rpx 4rpx;
			margin-bottom: 20rpx;
		
			&-title {
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		::v-deep .u-upload__wrap__preview__other {
			flex: none;
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