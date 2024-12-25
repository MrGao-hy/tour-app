<template>
	<up-swiper
		:list="[detail.url || '']"
		:autoplay="false"
		height="280"
	></up-swiper>
	<view class="content">
		<view class="content-title">{{ detail.name }}</view>
		<view class="content-sub">
			<view>海拔{{ detail.altitude }}米</view>
			<view>位置：{{ detail.address }}</view>
		</view>
		<view class="content-describe">&emsp;&emsp;{{ detail.introduction }}</view>
	</view>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";

interface IProps {
	detail: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	detail: () => ({ id: "" }),
});
</script>

<style lang="scss" scoped>
.content {
	margin-bottom: 40rpx;
	padding: 20rpx;

	.content-sub {
		margin: 20rpx 0;
		font-size: $gxh-font-size-base;
		color: $gxh-color-error;
	}
	&-title {
		font-weight: bold;
		font-size: 60rpx;
	}
}
</style>
