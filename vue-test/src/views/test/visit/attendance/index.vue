<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="拜访签到" :placeholder="true" bgColor="#2989FF" :border="false"
			autoBack
			leftIconColor="#fff"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }"
		/>
		<!-- End 顶部导航栏 -->
		
		<view class="container">
			<!-- Region 地图 -->
			<view class="map">
				<view class="top">
					<text>签到地点</text>
					<u-button text="获取定位" color="#2989FF" shape="circle"
						:customStyle="{
							margin: '0',
							width: '160rpx',
							height: '60rpx'
						}"
						@click="() => vuex_chooseLocation()"
					/>
				</view>
				<map id="map" style="height: 250rpx; width: 100%;" :latitude="vuex_location.latitude" :longitude="vuex_location.longitude" :show-location="true" />
				<view class="bottom">
					<u-icon name="map" color="#2989FF" />
					<text v-if="id">{{ uFormModel.visitInfo.signInAddress || '' }}</text>
					<text v-else>{{ vuex_geocoder.address || '' }}{{ vuex_geocoder.name || '' }}</text>
				</view>
			</view>
			<!-- End 地图 -->
			
			<view class="form">
				<u--form ref="uForm" :model="uFormModel" labelPosition="top" labelWidth="auto">
					<u-form-item
						label="拜访客户"
						prop="visitInfo.customName"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.customName"
							suffixIcon="arrow-right"
							readonly
							@tap="customerSelection"
						/>
					</u-form-item>
					<u-form-item
						label="拜访类型"
						prop="visitInfo.visitTypeLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.visitTypeLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.visitType = true"
						/>
					</u-form-item>
					<u-form-item
						label="所属商机"
						prop="visitInfo.customOpportunitiesIdLabel"
						:required="uFormModel.visitInfo.visitType == 'SJ'"
					>
						<u--input
							v-model="uFormModel.visitInfo.customOpportunitiesIdLabel"
							suffixIcon="arrow-right"
							readonly
							@tap="businessSelection"
						/>
					</u-form-item>
					<u-form-item
						label="拜访方式"
						prop="visitInfo.visitingMethodsLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.visitingMethodsLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.visitingMethods = true"
						/>
					</u-form-item>
					<u-form-item
						label="销售阶段"
						prop="visitInfo.saleStageLabel"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.saleStageLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.saleStage = true"
						/>
					</u-form-item>
					<u-form-item
						label="我方拜访人"
						prop="visitInfo.ourVisitor"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.ourVisitor"
						/>
					</u-form-item>
					<u-form-item
						label="客户方接待人"
						prop="visitInfo.customerReception"
						:required="true"
					>
						<u--input
							v-model="uFormModel.visitInfo.customerReception"
						/>
					</u-form-item>
					<u-form-item
						label="拜访日期"
						prop="visitInfo.visitTimeLabel"
						:required="true"
						v-if="id"
					>
						<u--input
							v-model="uFormModel.visitInfo.visitTimeLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.visitTime = true"
						/>
					</u-form-item>
					<u-form-item
						label="签到时间"
						prop="visitInfo.signInTimeLabel"
						v-if="id"
					>
						<u--input
							v-model="uFormModel.visitInfo.signInTimeLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.signInTime = true"
						/>
					</u-form-item>
					<u-form-item
						label="下次拜访日期"
						prop="visitInfo.nextVisitDateLabel"
					>
						<u--input
							v-model="uFormModel.visitInfo.nextVisitDateLabel"
							suffixIcon="arrow-down"
							readonly
							@tap="show.nextVisitDate = true"
						/>
					</u-form-item>
					<u-form-item
						label="商谈事项"
						prop="visitInfo.negotiateMatters"
					>
						<u--textarea v-model="uFormModel.visitInfo.negotiateMatters" autoHeight />
					</u-form-item>
					<u-form-item
						label="结果评价"
						prop="visitInfo.resultEvaluation"
					>
						<u--textarea v-model="uFormModel.visitInfo.resultEvaluation"  autoHeight />
					</u-form-item>
					<u-form-item
						label="下次拜访事项"
						prop="visitInfo.nextVisitMatters"
					>
						<u--textarea v-model="uFormModel.visitInfo.nextVisitMatters"  autoHeight />
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
					:fileList="uFormModel.visitInfo.annexList"
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
		
		<!-- Region 拜访类型 -->
		<u-picker :show="show.visitType" :columns="columns.visitType"
			keyName="label"
			closeOnClickOverlay
			@close="show.visitType = false"
			@cancel="show.visitType = false"
			@confirm="(e) => visitTypeConfirm(e, 'visitTypeLabel', 'visitType')"
		></u-picker>
		<!-- End 拜访类型 -->
		
		<!-- Region 拜访方式 -->
		<u-picker :show="show.visitingMethods" :columns="columns.visitingMethods"
			keyName="label"
			closeOnClickOverlay
			@close="show.visitingMethods = false"
			@cancel="show.visitingMethods = false"
			@confirm="(e) => dictConfirm(e, 'visitingMethodsLabel', 'visitingMethods')"
		></u-picker>
		<!-- End 拜访方式 -->
		
		<!-- Region 销售阶段 -->
		<u-picker :show="show.saleStage" :columns="columns.saleStage"
			keyName="label"
			closeOnClickOverlay
			@close="show.saleStage = false"
			@cancel="show.saleStage = false"
			@confirm="(e) => dictConfirm(e, 'saleStageLabel', 'saleStage')"
		></u-picker>
		<!-- End 销售阶段 -->
		
		<!-- Region 拜访日期 -->
		<u-datetime-picker
			ref="visitTimeDatetime"
			:show="show.visitTime"
			v-model="uFormModel.visitInfo.visitTime"
			closeOnClickOverlay
			@close="show.visitTime = false"
			@cancel="show.visitTime = false"
			@confirm="(e) => timeConfirm(e, 'visitTimeLabel', 'visitTime')"
		/>
		<!-- End 拜访日期 -->
		
		<!-- Region 签到时间 -->
		<u-datetime-picker
			ref="signInTimeDatetime"
			:show="show.signInTime"
			v-model="uFormModel.visitInfo.signInTime"
			closeOnClickOverlay
			@close="show.signInTime = false"
			@cancel="show.signInTime = false"
			@confirm="(e) => timeConfirm(e, 'signInTimeLabel', 'signInTime')"
		/>
		<!-- End 签到时间 -->
		
		<!-- Region 下次拜访日期 -->
		<u-datetime-picker
			ref="nextVisitDateDatetime"
			:show="show.nextVisitDate"
			v-model="uFormModel.visitInfo.nextVisitDate"
			closeOnClickOverlay
			@close="show.nextVisitDate = false"
			@cancel="show.nextVisitDate = false"
			@confirm="(e) => timeConfirm(e, 'nextVisitDateLabel', 'nextVisitDate')"
		/>
		<!-- End 下次拜访日期 -->
		
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
			 :text="`签到${$u.date(uFormModel.visitInfo.signInTime, 'hh:MM')}`"
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
import { mapState, mapActions } from 'vuex';
import { file } from '@/common/util/https';
import { getDict } from '@/common/api/user.js';
import { insertCustomVisit, getCustomVisitDetail, updateCustomVisit } from '@/common/api/customer.js';
	
export default {
	data() {
		return {
			id: '',
			customCode: '',
			signInTimeInterval: '',
			uFormModel: {
				visitInfo: {
					signInAddress: '',	// 签到地址
					
					customName: '',	// 客户名称
					customCode: '',	// 客户编码
					visitTypeLabel: '',	// 拜访类型label
					visitType: '',	// 拜访类型value
					customOpportunitiesIdLabel: '',	// 所属商机label
					customOpportunitiesId: '',	// 所属商机value
					visitingMethodsLabel: '',	// 拜访方式label
					visitingMethods: '',	// 拜访方式value
					saleStageLabel: '',	// 销售阶段label
					saleStage: '',	// 销售阶段value
					ourVisitor: '佩奇',	// 我方拜访人
					customerReception: '黑小虎',	// 客户方接待人
					visitTimeLabel: '',	// 拜访日期label
					visitTime: Number(new Date()),	// 拜访日期value
					signInTimeLabel: '',	// 签到时间label
					signInTime: '',	// 签到时间value
					nextVisitDateLabel: '',	// 下次拜访日期label
					nextVisitDate: Number(new Date()),	// 下次拜访日期value
					negotiateMatters: '',	// 商谈事项
					resultEvaluation: '',	// 结果评价
					nextVisitMatters: '',	// 下次拜访事项
					annexList: [],	// 附件
				}
			},
			uFormRules: {
				visitInfo: {
					'visitInfo.customName': {
						type: 'string',
						required: true,
						message: '请选择客户',
						trigger: ['blur', 'change']
					},
					'visitInfo.visitTypeLabel': {
						type: 'string',
						required: true,
						message: '请选择拜访类型',
						trigger: ['blur', 'change']
					},
					'visitInfo.customOpportunitiesIdLabel': {
						type: 'string',
						required: false,
						message: '请选择所属商机',
						trigger: ['blur', 'change']
					},
					'visitInfo.visitingMethodsLabel': {
						type: 'string',
						required: true,
						message: '请选择拜访方式',
						trigger: ['blur', 'change']
					},
					'visitInfo.saleStageLabel': {
						type: 'string',
						required: true,
						message: '请选择销售阶段',
						trigger: ['blur', 'change']
					},
					'visitInfo.ourVisitor': {
						type: 'string',
						required: true,
						message: '请填写我方拜访人',
						trigger: ['blur', 'change']
					},
					'visitInfo.customerReception': {
						type: 'string',
						required: true,
						message: '请填写客方接待人',
						trigger: ['blur', 'change']
					},
					'visitInfo.visitTimeLabel': {
						type: 'string',
						required: true,
						message: '请选择拜访日期',
						trigger: ['blur', 'change']
					},
				}
			},
			show: {
				visitType: false,
				visitingMethods: false,
				saleStage: false,
				visitTime: false,
				signInTime: false,
				nextVisitDate: false,
			},
			columns: {
				visitType: [[
					{
						label: '日常拜访',
						value: 'RC',
					},
					{
						label: '商机拜访',
						value: 'SJ',
					}
				]],
				visitingMethods: [[]],
				saleStage: [[]]
			},
			dictMap: {
				visitType: new Map(),
				visitingMethods: new Map(),
				saleStage: new Map(),
			},
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.uFormRules.visitInfo);
	},
	async onLoad({ id, customCode, customName }) {
		try{
			this.id = id;
			this.customCode = customCode ?? '';
			this.uFormModel.visitInfo.customName = customName ?? '';
			this.uFormModel.visitInfo.customCode = customCode ?? '';
			if(!this.id) this.vuex_getGeocoder();
			!this.id && (this.signInTimeInterval = setInterval(() => {
				const currentTime = Number(new Date());
				this.uFormModel.visitInfo.signInTime = currentTime;
				this.uFormModel.visitInfo.signInTimeLabel = uni.$u.timeFormat(currentTime, 'yyyy-mm-dd hh:MM');
				this.uFormModel.visitInfo.visitTime = currentTime;
				this.uFormModel.visitInfo.visitTimeLabel = uni.$u.timeFormat(currentTime, 'yyyy-mm-dd hh:MM');
			}, 1000))
			uni.showLoading({
				title: '加载中',
				mask: true,
			})
			const [crm_bffs, crm_xsjd] = await this.dictPickerPromise();
			this.columns.visitingMethods[0] = crm_bffs;
			this.columns.saleStage[0] = crm_xsjd;
			
			this.initDictMap({ visitType: this.columns.visitType[0] });
			this.initDictMap({ visitingMethods: crm_bffs });
			this.initDictMap({ saleStage: crm_xsjd });
			id && await this.getDetail(id);
			uni.hideLoading();
		}catch(err){
			uni.$u.toast(err);
		}
	},
	onUnload() {
		!this.id && clearInterval(this.signInTimeInterval);
	},
	watch: {
		vuex_geocoder: function() {
			this.uFormModel.visitInfo.signInAddress = (this.vuex_geocoder.address ?? '') + (this.vuex_geocoder.name ?? '');
		}
	},
	computed: {
		...mapState({
			vuex_location: state => state.init.vuex_location,
			vuex_geocoder: state => state.init.vuex_geocoder
		}),
	},
	methods: {
		...mapActions(['vuex_chooseLocation', 'vuex_getGeocoder']),
		/* 打开地图 */
		openMap() {
			uni.chooseLocation()
		},
		// 初始化字典 值-键 映射
		initDictMap(data) {
			Object.keys(data).forEach(key => {
				data[key]?.forEach(item => {
					this.dictMap[key].set(item.value, item.label);
				})
			})
		},
		dictExtract(initialArr) {
			return (initialArr ?? []).reduce((arr, cur) => {
				arr.push({ label: cur.dictLabel, value: cur.dictValue })
				return arr;
			}, [])
		},
		dictPickerPromise() {
			return new Promise((resolve, reject) => {
				const crm_bffs = getDict('crm_bffs');
				const crm_xsjd = getDict('crm_xsjd');
				Promise.all([crm_bffs, crm_xsjd])
					.then(res => {
						const [crm_bffs, crm_xsjd] = res;
						resolve([
							this.dictExtract(crm_bffs),
							this.dictExtract(crm_xsjd),
						])
					})
					.catch(err => {
						reject(err);
					})
			})
		},
		dictConfirm({ value: [{ label, value }] }, fieldLabel, field) {
			this.show[field] = false;
			this.uFormModel.visitInfo[fieldLabel] = label ?? '';
			this.uFormModel.visitInfo[field] = value ?? '';
		},
		setOpportunitiesRequire(value) {
			switch(value) {
				case 'RC':
					delete this.uFormRules.visitInfo['visitInfo.customOpportunitiesIdLabel'];
					break;
				case 'SJ':
					this.uFormRules.visitInfo['visitInfo.customOpportunitiesIdLabel'] = {
						type: 'string',
						required: true,
						message: '请选择所属商机',
						trigger: ['blur', 'change']
					}
					break;
			}
			this.$refs.uForm.setRules(this.uFormRules.visitInfo);
		},
		visitTypeConfirm({ value: [{ label, value }] }, fieldLabel, field) {
			this.show[field] = false;
			this.uFormModel.visitInfo[fieldLabel] = label ?? '';
			this.uFormModel.visitInfo[field] = value ?? '';
			this.setOpportunitiesRequire(value);
		},
		timeConfirm({ value }, fieldLabel, field) {
			this.show[field] = false;
			this.uFormModel.visitInfo[fieldLabel] = this.$u.timeFormat(value, 'yyyy-mm-dd hh:MM');
			this.uFormModel.visitInfo[field] = value;
		},
		selectionConfirm({ name: label, id: value }, fieldLabel, field) {
			this.uFormModel.visitInfo[fieldLabel] = label ?? '';
			this.uFormModel.visitInfo[field] = value ?? '';
		},
		/* 获取拜访记录详情 */
		async getDetail(id) {
			const res = await getCustomVisitDetail({ id });
			Object.assign(this.uFormModel.visitInfo, res, {
				visitTypeLabel: this.dictMap.visitType.get(res?.visitType),
				customOpportunitiesIdLabel: res?.customOpportunitiesName,
				visitingMethodsLabel: this.dictMap.visitingMethods.get(res?.visitingMethods),
				saleStageLabel: this.dictMap.saleStage.get(res?.saleStage),
				visitTimeLabel: uni.$u.timeFormat(res?.visitTime, 'yyyy-mm-dd hh:MM'),
				visitTime: Number(new Date(res?.visitTime)),
				signInTimeLabel: uni.$u.timeFormat(res?.signInTime, 'yyyy-mm-dd hh:MM'),
				signInTime: Number(new Date(res?.signInTime)),
				nextVisitDateLabel: uni.$u.timeFormat(res?.nextVisitDate, 'yyyy-mm-dd hh:MM'),
				nextVisitDate: Number(new Date(res?.nextVisitDate)),
			})
			this.$nextTick(() => {
				this.$refs.visitTimeDatetime.init();
				this.$refs.signInTimeDatetime.init();
				this.$refs.nextVisitDateDatetime.init();
			})
		},
		/* 客户选择 */
		customerSelection() {
			if(this.id || this.customCode) return uni.$u.toast('不可更改');
			uni.navigateTo({
				url: '/pages/sub/public/selection/customer',
				events: {
					selected: ({ name, code }) => {
						this.uFormModel.visitInfo.customName = name ?? '';
						this.uFormModel.visitInfo.customCode = code ?? '';
					}
				}
			})
		},
		/* 商机选择 */
		businessSelection() {
			uni.navigateTo({
				url: '/pages/sub/public/selection/business',
				events: {
					selected: ({ name, id }) => {
						this.uFormModel.visitInfo.customOpportunitiesIdLabel = name ?? '';
						this.uFormModel.visitInfo.customOpportunitiesId = id ?? '';
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
				this.uFormModel.visitInfo.annexList.push({ 
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
			this.uFormModel.visitInfo.annexList.splice(index, 1);
		},
		/* 提交表单-新增 */
		async addSubmit() {
			try{
				if(!this.uFormModel.visitInfo.signInAddress) return uni.$u.toast('请获取签到地址');
				const eventChannel = this.getOpenerEventChannel();
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await insertCustomVisit({ 
					...this.uFormModel.visitInfo,
					visitTime: uni.$u.timeFormat(this.uFormModel.visitInfo.visitTime, 'yyyy-mm-dd hh:MM:ss'),
					signInTime: uni.$u.timeFormat(this.uFormModel.visitInfo.signInTime, 'yyyy-mm-dd hh:MM:ss'),
					nextVisitDate: uni.$u.timeFormat(this.uFormModel.visitInfo.nextVisitDate, 'yyyy-mm-dd hh:MM:ss')
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
				if(!this.uFormModel.visitInfo.signInAddress) return uni.$u.toast('请获取签到地址');
				const eventChannel = this.getOpenerEventChannel();
				uni.showLoading({
					title: '提交中',
					mask: true,
				})
				const res = await this.$refs.uForm.validate();
				await updateCustomVisit({ 
					...this.uFormModel.visitInfo,
					visitTime: uni.$u.timeFormat(this.uFormModel.visitInfo.visitTime, 'yyyy-mm-dd hh:MM:ss'),
					signInTime: uni.$u.timeFormat(this.uFormModel.visitInfo.signInTime, 'yyyy-mm-dd hh:MM:ss'),
					nextVisitDate: uni.$u.timeFormat(this.uFormModel.visitInfo.nextVisitDate, 'yyyy-mm-dd hh:MM:ss')
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
	
	.map {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding: 40rpx 30rpx;
		width: 100%;
		border-radius: $border-radius;
		box-sizing: border-box;
		background-color: #fff;
		
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			text {
				font-weight: bold;
			}
		}
		.bottom {
			display: flex;
			gap: 20rpx;
		}
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