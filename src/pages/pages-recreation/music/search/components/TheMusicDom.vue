<template>
	<view
		class="demo-warter"
		v-for="(item, index) in list"
		:key="item.id"
		@click="jumpSongDetailFn(item)"
	>
		<up-lazy-load
			border-radius="10"
			:image="item.url"
			:index="index"
			:loading-img="config.empty"
		></up-lazy-load>
		<view class="demo-title">
			{{ item.name }}
		</view>
		<view class="demo-author">
			{{ item.author }}
		</view>
		<view class="demo-tag">
			<view class="demo-tag-owner">
				{{ item.sub }}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { config } from "@/config";

export interface ListVo {
	id: number;
	url: string;
	name: string;
	author: string;
	sub: string;
}
interface IProps {
	list: ListVo[];
}
const props = withDefaults(defineProps<IProps>(), {
	list: () => [],
});
const emit = defineEmits(["jumpPageFn"]);

/**
 * 点击dom事件
 * */
const jumpSongDetailFn = (temp: ListVo) => {
	emit("jumpPageFn", temp);
};
</script>

<style lang="scss" scoped>
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	position: relative;

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
	}

	.demo-author {
		font-size: 20rpx;
		margin-top: 5px;
		color: $gxh-text-color-grey;
	}
}

.demo-tag {
	display: flex;
	margin-top: 5px;
}

.demo-tag-owner {
	display: flex;
	align-items: center;
	padding: 4rpx 14rpx;
	border-radius: 50rpx;
	font-size: 20rpx;
	line-height: 1;
}

.demo-tag-text {
	//border: 1px solid $u-type-primary;
	margin-left: 10px;
	border-radius: 50rpx;
	line-height: 1;
	padding: 4rpx 14rpx;
	display: flex;
	align-items: center;
	border-radius: 50rpx;
	font-size: 20rpx;
}
</style>
