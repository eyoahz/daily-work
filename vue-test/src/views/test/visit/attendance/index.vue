<template>
	<view class="page">
		<!-- Region 顶部导航栏 -->
		<u-navbar title="拜访签到" :placeholder="true" bgColor="#2989FF" :leftIcon="null" :border="false"
			:titleStyle="{ color: 'rgba(255, 255, 255, 1)', 'font-weight': 'bold' }" />
		<!-- End 顶部导航栏 -->
		
		<!-- Region 地图 -->
		<view class="map">
			
			<map id="map" style="height: 100%; width: 100%;" :latitude="vuex_location.latitude" :longitude="vuex_location.longitude" :show-location="true" />
		</view>
		<!-- End 地图 -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
	
export default {
	data() {
		return {
			
		}
	},
	computed: {
		...mapState({
			vuex_location: state => state.init.vuex_location
		})
	},
}
</script>

<style lang="scss" scoped>
	.map {
		height: 600rpx;
		width: 100%;
		position: fixed;
		z-index: 2;
	}
</style>