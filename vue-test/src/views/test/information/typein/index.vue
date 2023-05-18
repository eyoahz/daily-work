<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="录入客户信息" :placeholder="true" bgColor="#2989FF" :border="false"
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
			@leftClick="historyBaCK"
		/>
		<!-- End 顶部导航栏 -->
		
		<view class="container">
			<view class="search u-border-bottom">
				<u-search placeholder="搜索客户名称或编码" :showAction="false" :disabled="true" @click="search" />
			</view>
			<view class="form">
				<u--form ref="uForm" :model="uFormModel" labelPosition="top" labelWidth="auto">
					<u-form-item
						label="客户名称"
						prop="customerInfo.name"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.name"
						/>
					</u-form-item>
					<u-form-item
						label="战场"
						prop="customerInfo.battlefieldLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.battlefieldLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.battlefield = true"
						/>
					</u-form-item>
					<u-form-item
						label="所属行业"
						prop="customerInfo.industryLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.industryLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.industry = true"
						/>
					</u-form-item>
					<u-form-item
						label="企业类型"
						prop="customerInfo.enterpriseTypeLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.enterpriseTypeLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.enterpriseType = true"
						/>
					</u-form-item>
					<u-form-item
						label="企业规模"
						prop="customerInfo.scaleLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.scaleLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.scale = true"
						/>
					</u-form-item>
					<u-form-item
						label="所属团队"
						prop="customerInfo.teamIdLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.teamIdLabel"
							suffixIcon="arrow-down"
							readonly
							@tap=""
						/>
					</u-form-item>
					<u-form-item
						label="所属大区"
						prop="customerInfo.regionIdLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.regionIdLabel"
							suffixIcon="arrow-down"
							readonly
							@tap=""
						/>
					</u-form-item>
					<u-form-item
						label="客户等级"
						prop="customerInfo.gradeIdLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.gradeIdLabel"
							suffixIcon="arrow-down"
							readonly
							@tap=""
						/>
					</u-form-item>
					<u-form-item
						label="统一社会信用代码"
						prop="customerInfo.unifiedSocialCreditCode"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.unifiedSocialCreditCode"
						/>
					</u-form-item>
					<u-form-item
						label="所在省"
						prop="customerInfo.province"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.province"
						/>
					</u-form-item>
					<u-form-item
						label="所在市"
						prop="customerInfo.city"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.city"
						/>
					</u-form-item>
					<u-form-item
						label="办公地址"
						prop="customerInfo.officeAddress"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.officeAddress"
						/>
					</u-form-item>
					<u-form-item
						label="注册地址"
						prop="customerInfo.companyRegisteredAddress"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.companyRegisteredAddress"
						/>
					</u-form-item>
					<u-form-item
						label="客户经营人"
						prop="customerInfo.operator"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.operator"
						/>
					</u-form-item>
					<u-form-item
						label="信息来源"
						prop="customerInfo.source"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.source"
						/>
					</u-form-item>
					<u-form-item
						label="首次签约年"
						prop="customerInfo.firstSigningYearLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.firstSigningYearLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.firstSigningYear = true"
						/>
					</u-form-item>
					<u-form-item
						label="信息化基础设施状况"
						prop="customerInfo.informationInfrastructureStatus"
					>
						<u--textarea
							autoHeight 
							v-model="uFormModel.customerInfo.informationInfrastructureStatus"
						/>
					</u-form-item>
					<u-form-item
						label="描述"
						prop="customerInfo.description"
					>
						<u--textarea
							autoHeight
							v-model="uFormModel.customerInfo.description"
						/>
					</u-form-item>
					
				</u--form>
			</view>
		</view>
		
		<!-- Region 战场 -->
		<u-picker :show="show.battlefield" :columns="columns.battlefield"
			keyName="label"
			closeOnClickOverlay
			@close="show.battlefield = false"
			@cancel="show.battlefield = false"
			@confirm="(e) => dictConfirm(e, 'battlefieldLabel', 'battlefield')"
		></u-picker>
		<!-- End 战场 -->
		
		<!-- Region 所属行业 -->
		<u-picker :show="show.industry" :columns="columns.industry"
			keyName="label"
			closeOnClickOverlay
			@close="show.industry = false"
			@cancel="show.industry = false"
			@confirm="(e) => dictConfirm(e, 'industryLabel', 'industry')"
		></u-picker>
		<!-- End 所属行业 -->
		
		<!-- Region 企业类型 -->
		<u-picker :show="show.enterpriseType" :columns="columns.enterpriseType"
			keyName="label"
			closeOnClickOverlay
			@close="show.enterpriseType = false"
			@cancel="show.enterpriseType = false"
			@confirm="(e) => dictConfirm(e, 'enterpriseTypeLabel', 'enterpriseType')"
		></u-picker>
		<!-- End 企业类型 -->
		
		<!-- Region 企业规模 -->
		<u-picker :show="show.scale" :columns="columns.scale"
			keyName="label"
			closeOnClickOverlay
			@close="show.scale = false"
			@cancel="show.scale = false"
			@confirm="(e) => dictConfirm(e, 'scaleLabel', 'scale')"
		></u-picker>
		<!-- End 企业规模 -->
		
		<!-- Region 首次签约年 -->
		<u-datetime-picker
			:show="show.firstSigningYear"
			v-model="uFormModel.customerInfo.firstSigningYear"
			mode="year-month"
			closeOnClickOverlay
			@close="show.firstSigningYear = false"
			@cancel="show.firstSigningYear = false"
			@confirm="firstSigningYearConfirm"
		/>
		<!-- End 首次签约年 -->
	
		<view class="footer">
			<u-button text="确认提交" shape="circle" color="#2989FF" 
				:customStyle="{
					margin: 0,
					marginLeft: 'auto',
					width: '200rpx',
					height: '80rpx'
				}"
				@click="submit"
			></u-button>
		</view>
	</view>
</template>

<script>
import { getDict } from '@/common/api/user.js';
import { insertCustom } from '@/common/api/customer.js'
	
export default {
	data() {
		return {
			uFormModel: {
				customerInfo: {
					name: "测试",
					battlefieldLabel: "",	// 战场label
					battlefield: "",	// 战场value
					industryLabel: "",	// 所属行业label
					industry: "",	// 所属行业value
					enterpriseTypeLabel: "",	// 企业类型label
					enterpriseType: "",	// 企业类型value
					scaleLabel: "",	// 企业规模label
					scale: "",	// 企业规模value
					teamIdLabel: "",	// 所属团队label
					teamId: "",	// 所属团队value
					regionIdLabel: "",	// 所属大区label
					regionId: "",	// 所属大区value
					gradeIdLabel: "",	// 客户等级label
					gradeId: "",	// 客户等级value
					unifiedSocialCreditCode: "CSH208421831535140",
					province: "福建省",
					city: "厦门市",
					officeAddress: "淮海路小猪佩奇有限公司",
					companyRegisteredAddress: "淮海路小猪佩奇有限公司",
					operator: "西门庆",
					source: "武大郎",
					firstSigningYearLabel: "",	// 首次签约年Label
					firstSigningYear: Number(new Date()),	// 首次签约年value
					informationInfrastructureStatus: "",
					description: "",
				}
			},
			uFormRules: {
				customerInfo: {
					'customerInfo.name': {
						type: 'string',
						required: true,
						message: '请填写客户名称',
						trigger: ['blur', 'change']
					},
					'customerInfo.battlefieldLabel': {
						type: 'string',
						required: true,
						message: '请选择战场',
						trigger: ['blur', 'change']
					},
					'customerInfo.industryLabel': {
						type: 'string',
						required: true,
						message: '请选择所属行业',
						trigger: ['blur', 'change']
					},
					'customerInfo.enterpriseTypeLabel': {
						type: 'string',
						required: true,
						message: '请选择企业类型',
						trigger: ['blur', 'change']
					},
					'customerInfo.scaleLabel': {
						type: 'string',
						required: true,
						message: '请选择企业规模',
						trigger: ['blur', 'change']
					},
					'customerInfo.unifiedSocialCreditCode': {
						type: 'string',
						required: true,
						message: '请填写统一社会信用代码',
						trigger: ['blur', 'change']
					},
					'customerInfo.province': {
						type: 'string',
						required: true,
						message: '请选所在省',
						trigger: ['blur', 'change']
					},
					'customerInfo.city': {
						type: 'string',
						required: true,
						message: '请选择所在市',
						trigger: ['blur', 'change']
					},
					'customerInfo.officeAddress': {
						type: 'string',
						required: true,
						message: '请填写办公地址',
						trigger: ['blur', 'change']
					},
					'customerInfo.companyRegisteredAddress': {
						type: 'string',
						required: true,
						message: '请填写注册地址',
						trigger: ['blur', 'change']
					},
					'customerInfo.operator': {
						type: 'string',
						required: true,
						message: '请填写客户经营人',
						trigger: ['blur', 'change']
					},
					'customerInfo.source': {
						type: 'string',
						required: true,
						message: '请填写信息来源',
						trigger: ['blur', 'change']
					},
					'customerInfo.firstSigningYearLabel': {
						type: 'string',
						required: true,
						message: '请选择首次签约年',
						trigger: ['blur', 'change']
					},
					// 'customerInfo.informationInfrastructureStatus': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写信息化基础设施状况',
					// 	trigger: ['blur', 'change']
					// },
					// 'customerInfo.description': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写描述',
					// 	trigger: ['blur', 'change']
					// },
				},
			},
			show: {
				battlefield: false,
				industry: false,
				enterpriseType: false,
				scale: false,
				firstSigningYear: false
			},
			columns: {
				battlefield: [[]],
				industry: [[]],
				enterpriseType: [[]],
				scale: [[]],
			},
		}
	},
	onLoad() {
		console.log('请求客户详情，非新增客户情况下');
		uni.showLoading({
			title: '加载中',
			mask: true,
		})
		this.dictPickerPromise().then(res => {
			const [crm_zc, crm_hy, crm_qylx, crm_qygm] = res;
			this.columns.battlefield[0] = crm_zc;
			this.columns.industry[0] = crm_hy;
			this.columns.enterpriseType[0] = crm_qylx;
			this.columns.scale[0] = crm_qygm;
			uni.hideLoading();
		}).catch(err => {
			uni.$u.toast(err);
		})
	},
	onReady() {
		this.$refs.uForm.setRules(this.uFormRules.customerInfo)
	},
	methods: {
		search() {
			console.log('搜索');
		},
		dictExtract(dictArr) {
			return (dictArr ?? []).reduce((arr, cur) => {
				arr.push({ label: cur.dictLabel, value: cur.dictValue })
				return arr;
			}, [])
		},
		dictPickerPromise() {
			return new Promise((resolve, reject) => {
				const crm_zc = getDict('crm_zc');
				const crm_hy = getDict('crm_hy');
				const crm_qylx = getDict('crm_qylx');
				const crm_qygm = getDict('crm_qygm');
				Promise.all([crm_zc, crm_hy, crm_qylx, crm_qygm])
					.then(res => {
						const [crm_zc, crm_hy, crm_qylx, crm_qygm] = res;
						resolve([
							this.dictExtract(crm_zc),
							this.dictExtract(crm_hy),
							this.dictExtract(crm_qylx),
							this.dictExtract(crm_qygm)
						])
					})
					.catch(err => {
						reject(err);
					})
			})
		},
		dictConfirm({ value: [{ label, value }] }, fieldLabel, field) {
			this.show[field] = false;
			this.uFormModel.customerInfo[fieldLabel] = label ?? '';
			this.uFormModel.customerInfo[field] = value ?? '';
		},
		firstSigningYearConfirm({ value }) {
			this.show.firstSigningYear = false;
			this.uFormModel.customerInfo.firstSigningYearLabel = this.$u.timeFormat(value, 'yyyy年mm月');
			this.uFormModel.customerInfo.firstSigningYear = this.$u.timeFormat(value, 'yyyy年');
		},
		// * 提交表单
		async submit() {
			console.log('提交表单');
			try{
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await insertCustom(this.uFormModel.customerInfo);
				uni.$u.toast('提交成功');
				setTimeout(() => {
					uni.navigateBack();
				}, 500)
			}catch(err){
				if(Array.isArray(err)) return uni.$u.toast(err[0]?.message ?? '校验失败111');
				uni.$u.toast(err);
			}
		},
		historyBaCK() {
			const eventChannel = this.getOpenerEventChannel();
			uni.navigateBack({
				success() {
					eventChannel.emit('init')
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
	
	.form {
		margin: 0 calc(34rpx + 18rpx);
		
		/deep/ .u-input {
			margin: 0 -18rpx;
			background-color: #fff;
		}
		/deep/ .u-textarea {
			margin: 0 -18rpx;
			background-color: #fff;
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