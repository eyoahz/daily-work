<template>
	<view class="page">
		<u-picker
			ref='pickerTree'
			:show="show"
			:showToolbar="showToolbar"
			:title="title"
			:columns="columns"
			:loading="loading"
			:itemHeight="itemHeight"
			:cancelText="cancelText"
			:confirmText="confirmText"
			:cancelColor="cancelColor"
			:confirmColor="confirmColor"
			:visibleItemCount="visibleItemCount"
			:keyName="keyName"
			:closeOnClickOverlay="closeOnClickOverlay"
			:defaultIndex="defaultIndex"
			:immediateChange="immediateChange"
			@close="pcikerTreeClose"
			@cancel="pcikerTreeCancel"
			@change="pcikerTreeChange"
			@confirm="pcikerTreeConfirm"
		></u-picker>
	</view>
</template>

<script>
/**
 * u-picker
 * @description 选择器
 * @property {Array}			treeData				树形数组，例如： [ { children: [ children: [] ] } ]
 * @property {Boolean}			show				是否显示picker弹窗（默认 false ）
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏（默认 true ）
 * @property {String}			title				顶部标题
 * @property {Array}			columns				对象数组，设置每一列的数据
 * @property {Boolean}			loading				是否显示加载中状态（默认 false ）
 * @property {String | Number}	itemHeight			各列中，单个选项的高度（默认 44 ）
 * @property {String}			cancelText			取消按钮的文字（默认 '取消' ）
 * @property {String}			confirmText			确认按钮的文字（默认 '确定' ）
 * @property {String}			cancelColor			取消按钮的颜色（默认 '#909193' ）
 * @property {String}			confirmColor		确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量（默认 5 ）
 * @property {String}			keyName				选项对象中，需要展示的属性键名（默认 'text' ）
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器（默认 false ）
 * @property {Array}			defaultIndex		各列的默认索引
 * @property {Boolean}			immediateChange		是否在手指松开时立即触发change事件（默认 false ）
 * @event {Function} close		关闭选择器时触发
 * @event {Function} cancel		点击取消按钮触发
 * @event {Function} confirm	点击确定按钮，返回当前选择的值
 */

import props from './props.js';
export default {
	name: 'picker-tree',
	mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
	data() {
		return {
			columns: [], // 每一列数据  [[第1列], [第2列], [第3列]]
			defaultIndex: [], // 各列的默认索引
			tree: [],
			treeFlatMap: new Map(),		// tree 的扁平化Map数据
		}
	},
	mounted() {
		this.tree = uni.$u.deepClone(this.treeData);
		// 初始化 picker组件 每一列数据
		const initial = (data = []) => {
			this.columns.push(data)
			if(Array.isArray(data[0].children)) initial(data[0].children);
		}
		initial(this.tree);
		
		// 扁平化
		const treeFlat = (data = [], column = 0) => {
			data.forEach((item, index) => {
				if(item.parentId == 0) column = 0;
				this.treeFlatMap.set(item.id, { ...item, column, index })
				if(Array.isArray(item.children)) {
					treeFlat(item.children, ++column);
				} 
			})
		}
		treeFlat(this.tree);
	},
	methods: {
		pcikerTreeClose() {
			this.$emit('close');
		},
		pcikerTreeCancel() {
			this.$emit('cancel');
		},
		pcikerTreeConfirm(e) {
			this.$emit('confirm', e);
		},
		pcikerTreeChange(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.pickerTree
			} = e;
			// 当某一列变化时，改变其后一列对应的选项
			// value[columnIndex] 当前变化项
			this.columns.splice(columnIndex + 1);
			const linkage = (currentValue) => {
				if(Array.isArray(currentValue.children)) {
					this.columns.push(currentValue.children);
					linkage(currentValue.children[0])
				}
			}
			linkage(value[columnIndex]);
		},
		/* 用于改变 columns			对象数组，设置每一列的数据 */
		changeColumns(columns) {
			if(columns) return this.columns = columns;
			const code = this.code;
			this.columns.splice(0);
			// this.columns.unshift(this.treeFlatMap.get)
			const setColumns = (code) => {
				const { parenetId, index } = this.treeFlatMap.get(code);	// 获取父id以及在当前列中的位置索引
				const parent = this.treeFlatMap.get(parenetId);	// 获取父元素
				this.columns.unshift(parent.children);	// 压入code所在的父元素的children
				this.defaultIndex.unshift(index);		// 压入code所在元素在当前列的位置
				if(parent.parenetId > 0) {
					setColumns(parent.id);
				} else {
					this.columns.unshift(this.tree);
				}
			}
			// setColumns()
		}
	}
}
</script>

<style lang="scss" scoped>
</style>