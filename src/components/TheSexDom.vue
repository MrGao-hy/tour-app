<template>
	<view
		class="sex"
		:style="{
			background: sex === '0' ? '#F07471' : '#5FADD5',
		}"
	>
		<up-icon
			:name="sex === '0' ? 'woman' : sex === '1' ? 'man' : ''"
			size="10"
			color="#fff"
		></up-icon>
	</view>
</template>

<script setup lang="ts">
interface IProps {
	sex: string;
}

const props = withDefaults(defineProps<IProps>(), {
	sex: "0",
});
</script>

<style lang="scss" scoped>
.sex {
	transform: rotate(45deg);
	width: 20rpx;
	height: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10rpx;
	.u-icon {
		transform: rotate(-45deg);
	}
}
</style>
