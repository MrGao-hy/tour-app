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
		<view class="demo-title"> {{ item.name }} - {{ item.title }} </view>
		<view class="demo-author">
			{{ ArrToString(item.authors) }}
		</view>
		<view class="demo-tag">
			<up-tag
				v-for="(trm, y) in item.subs"
				:key="y"
				:text="trm"
				type="warning"
				size="mini"
				plain
				plainFill
			>
			</up-tag>
		</view>
	</view>
</template>

<script setup lang="ts">
import { config } from "@/config";
import { computed } from "vue";

export interface ListVo {
	id: number;
	url: string;
	name: string;
	title: string;
	authors: any[];
	subs: string[];
}
interface IProps {
	list: ListVo[];
}
const props = withDefaults(defineProps<IProps>(), {
	list: () => [],
});
const emit = defineEmits(["jumpPageFn"]);

const ArrToString = computed(() => {
	return (temp: any[]) => {
		if (Array.isArray(temp) && temp.length >= 1) {
			const res = temp.map((item) => {
				return item.name;
			});
			return res.join(",");
		}
	};
});

/**
 * @description 点击页面dom传值
 * @param temp 音乐数据
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
	.up-tag {
		width: 100rpx;
	}
}
</style>
