<template>
	<up-card
		title="热门景点"
		:sub-title="nowDate"
		:border="false"
		margin="0"
		:foot-border-top="false"
	>
		<template #body>
			<view
				class="container"
				v-for="(item, index) in mountHot"
				:key="item.id"
				@click="toDetailPageFn(item.id)"
			>
				<image
					class="container-img"
					:src="item.url || config.empty"
					mode="aspectFill"
				>
				</image>
				<view class="ranking">{{ index + 1 }}</view>
				<view class="container-name">{{ item.name }}</view>
				<view class="container-rate">
					<the-rate v-model="item.avgMark" size="14"></the-rate>
				</view>
			</view>
		</template>
	</up-card>
</template>

<script setup lang="ts">
import TheRate from "@components/TheRate.vue";
import { onMounted, ref } from "vue";
import { hotMountListApi } from "@/api";
import { MountType } from "@/typing";
import { formatTime } from "hfyk-app";
import { config } from "@/config";

const mountHot = ref<MountType[]>([]);
const nowDate = formatTime(new Date().getTime(), "yyyy-MM-dd");

onMounted(async () => {
	mountHot.value = await hotMountListApi();
});

const toDetailPageFn = (id: string) => {
	uni.navigateTo({
		url: `/pages/pages-mount/mountDetail/Index?id=${id}`,
	});
};
</script>

<style lang="scss" scoped>
:deep(.u-card__body) {
	display: flex;
	justify-content: space-between;
}
.container {
	width: 30%;
	position: relative;
	border-radius: $gxh-border-radius-base;
	&-img {
		width: 100%;
		height: 200rpx;
	}
	overflow: hidden;
	.ranking {
		position: absolute;
		top: -20px;
		left: -20px;
		color: white;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: black;
		opacity: 0.5;
		display: flex;
		align-items: end;
		justify-content: flex-end;
		padding: 10rpx;
	}
	&-title {
		margin: $gxh-border-margin-padding-lg 0;
	}
}
</style>
