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

const imageList = [
	"https://img1.baidu.com/it/u=219170186,2668466130&fm=253&fmt=auto?w=750&h=500",
];
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
