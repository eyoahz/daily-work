<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="录入客户信息" :placeholder="true" bgColor="#2989FF" :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
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
						label="所属行业"
						prop="customerInfo.industry"
						:required="true"
					>
						<u--input v-model="uFormModel.customerInfo.industry" />
					</u-form-item>
					<u-form-item
						label="企业类型"
						prop="customerInfo.enterpriseType"
						:required="true"
					>
						<u--input v-model="uFormModel.customerInfo.enterpriseType" />
					</u-form-item>
					<u-form-item
						label="企业规模"
						prop="customerInfo.scale"
						:required="true"
					>
						<u--input v-model="uFormModel.customerInfo.scale" />
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
						label="所属团队"
						prop="customerInfo.teamIdLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.teamIdLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.teamId = true"
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
							@tap="show.regionId = true"
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
							@tap="show.gradeId = true"
						/>
					</u-form-item>
					<u-form-item
						label="统一社会信用代码"
						prop="customerInfo.unifiedSocialCreditCode"
						:required="true"
					>
						<u--input
							v-model="uFormModel.customerInfo.unifiedSocialCreditCode"
							:disabled="id ? true : false"
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
		
		<!-- Region 所属团队 -->
		<u-picker :show="show.teamId" :columns="columns.teamId"
			keyName="label"
			closeOnClickOverlay
			@close="show.teamId = false"
			@cancel="show.teamId = false"
			@confirm="(e) => dictConfirm(e, 'teamIdLabel', 'teamId')"
		></u-picker>
		<!-- End 所属团队 -->
		
		<!-- Region 所属大区 -->
		<picker-tree  
			:show="show.regionId"
			ref="regionId"
			keyName="name"
			closeOnClickOverlay
			:treeData="regionTree"
			@close="show.regionId = false"
			@cancel="show.regionId = false"
			@confirm="(e) => regionIdConfirm(e, 'regionIdLabel', 'regionId')"
		></picker-tree>
		<!-- End 所属大区 -->
		
		<!-- Region 客户等级 -->
		<u-picker :show="show.gradeId" :columns="columns.gradeId"
			keyName="label"
			closeOnClickOverlay
			@close="show.gradeId = false"
			@cancel="show.gradeId = false"
			@confirm="(e) => dictConfirm(e, 'gradeIdLabel', 'gradeId')"
		></u-picker>
		<!-- End 客户等级 -->
		
		<!-- Region 首次签约年 -->
		<u-datetime-picker
			ref="firstSigningYearDatetime"
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
			<u-button text="确认提交" shape="circle" color="#2989FF"
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
import { getDict } from '@/common/api/user.js';
import { insertCustom, updateCustom, getTeamList, getRegionList, getCustomGradeList, getCustomDetail } from '@/common/api/customer.js'
import PickerTree from './components/picker-tree.vue'
	
export default {
	components: { PickerTree },
	data() {
		return {
			id: '',
			uFormModel: {
				customerInfo: {
					name: "",
					battlefieldLabel: "",	// 战场label
					battlefield: "",	// 战场value
					industry: "",	// 所属行业value
					enterpriseType: "",	// 企业类型value
					scale: "",	// 企业规模value
					teamIdLabel: "",	// 所属团队label
					teamId: "",	// 所属团队value
					regionIdLabel: "",	// 所属大区label
					regionId: "",	// 所属大区value
					gradeIdLabel: "",	// 客户等级label
					gradeId: "",	// 客户等级value
					unifiedSocialCreditCode: "",
					province: "",
					city: "",
					officeAddress: "",
					companyRegisteredAddress: "",
					operator: "",
					source: "",
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
					'customerInfo.teamIdLabel': {
						type: 'string',
						required: true,
						message: '请选择所属团队',
						trigger: ['blur', 'change']
					},
					'customerInfo.regionIdLabel': {
						type: 'string',
						required: true,
						message: '请选择所属大区',
						trigger: ['blur', 'change']
					},
					'customerInfo.gradeIdLabel': {
						type: 'string',
						required: true,
						message: '请选择客户等级',
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
				teamId: false,
				regionId: false,
				gradeId: false,
				firstSigningYear: false
			},
			columns: {
				battlefield: [[]],
				teamId: [[]],
				// regionId: [],
				gradeId: [[]],
			},
			dictMap: {
				battlefield: new Map()
			},
			regionTree: [],	// 大区树形原始数据
			regionMap: new Map(), // 扁平化大区Map数据
		}
	},
	async onLoad({ id }) {
		console.log('非新增客户情况下需请求客户详情');
		try{
			this.id = id;
			uni.showLoading({
				title: '加载中',
				mask: true,
			})
			const [crm_zc, teamList, customGradeList, regionList] = await this.dictPickerPromise();
			this.columns.battlefield[0] = crm_zc;
			this.columns.teamId[0] = teamList;
			this.columns.gradeId[0] = customGradeList;
			this.regionTree = regionList;
			
			this.initDictMap({ battlefield: crm_zc });
			id && await this.getDetail(id);
			uni.hideLoading();
		}catch(err){
			uni.$u.toast(err);
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.uFormRules.customerInfo);
	},
	methods: {
		search() {
			console.log('搜索');
		},
		/* 获取详情 */
		async getDetail(id) {
			const res = await getCustomDetail({ id });
			Object.assign(this.uFormModel.customerInfo, res, {
				battlefieldLabel: this.dictMap.battlefield.get(res?.battlefield),
				teamIdLabel: res?.teamName,
				regionIdLabel: res?.regionName,
				gradeIdLabel: res?.gradeName,
				firstSigningYearLabel: uni.$u.timeFormat(res?.firstSigningYear, 'yyyy'),
				firstSigningYear: uni.$u.timeFormat(res?.firstSigningYear, 'yyyy-mm-dd')
			});
			this.$nextTick(() => {
				this.$refs.regionId.changeCode(this.uFormModel.customerInfo.regionId);
				this.$refs.firstSigningYearDatetime.init();
			})
		},
		dictExtract(initialArr) {
			return (initialArr ?? []).reduce((arr, cur) => {
				arr.push({ label: cur.dictLabel, value: cur.dictValue })
				return arr;
			}, [])
		},
		defaultExtract(initialArr) {
			return (initialArr ?? []).reduce((arr, cur) => {
				arr.push({ label: cur.name, value: cur.id })
				return arr;
			}, [])
		},
		/* 大区确认 */
		regionIdConfirm({ value = [] }, fieldLabel, field) {
			this.show[field] = false;
			const { name, id } = value[value.length - 1];
			this.uFormModel.customerInfo[fieldLabel] = name ?? '';
			this.uFormModel.customerInfo[field] = id ?? '';
		},
		dictPickerPromise() {
			return new Promise((resolve, reject) => {
				const crm_zc = getDict('crm_zc');
				const teamList = getTeamList();
				const customGradeList = getCustomGradeList();
				const regionList = getRegionList();
				Promise.all([crm_zc, teamList, customGradeList, regionList])
					.then(res => {
						const [crm_zc, teamList, customGradeList, regionList] = res;
						resolve([
							this.dictExtract(crm_zc),
							this.defaultExtract(teamList),
							this.defaultExtract(customGradeList),
							regionList
						])
					})
					.catch(err => {
						reject(err);
					})
			})
		},
		// 初始化字典 值-键 映射
		initDictMap(data) {
			Object.keys(data).forEach(key => {
				data[key]?.forEach(item => {
					this.dictMap[key].set(item.value, item.value)
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
			this.uFormModel.customerInfo.firstSigningYearLabel = this.$u.timeFormat(value, 'yyyy');
			this.uFormModel.customerInfo.firstSigningYear = this.$u.timeFormat(value, 'yyyy-mm-dd');
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
				await insertCustom({ ...this.uFormModel.customerInfo });
				uni.$u.toast('提交成功');
				setTimeout(() => {
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
		/* 提交表单-编辑 */
		async editSubmit() {
			try{
				const eventChannel = this.getOpenerEventChannel();
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await updateCustom({
					...this.uFormModel.customerInfo,
					firstSigningYear: uni.$u.timeFormat(this.uFormModel.customerInfo.firstSigningYear, 'yyyy-mm-dd')
				});
				uni.$u.toast('提交成功');
				setTimeout(() => {
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