<template>
	<up-subsection
		:list="list"
		:current="current"
		@change="changeSubSectionFn"
	></up-subsection>
	<scroll-view
		scroll-y
		:scroll-top="scrollTop"
		scroll-with-animation
		@scroll="scrollPageFn"
	>
		<view class="detail" id="detail">
			<the-mount-detail :detail="mountDetail"></the-mount-detail>
		</view>
		<up-line></up-line>
		<view class="strategy" id="strategy">
			<up-steps current="1" direction="column">
				<up-steps-item title="已下单" desc="10:30"> </up-steps-item>
				<up-steps-item title="已出库" desc="10:35"></up-steps-item>
				<up-steps-item title="运输中" desc="11:40"></up-steps-item>
			</up-steps>
		</view>
		<up-line></up-line>
		<the-mount-comment :id="mountId"></the-mount-comment>
	</scroll-view>

	<!-- 分享海报 -->
	<the-share-poster></the-share-poster>
	<the-actions-bottom :detail="mountDetail"></the-actions-bottom>
</template>
<script setup lang="ts">
import { getCurrentInstance, nextTick, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import TheMountDetail from "@/pages/pages-mount/mountDetail/components/TheMountDetail.vue";
import TheMountComment from "@/components/TheMountComment.vue";
import { queryMountDetailApi } from "@/api";
import TheActionsBottom from "@/pages/pages-mount/mountDetail/components/TheActionsBottom.vue";
import { useCommentStore } from "@/store";
import TheSharePoster from "@components/TheSharePoster.vue";

const commentStore = useCommentStore();
const list = ["详情", "攻略", "评论"];
const mountId = ref("");
const current = ref(0);
const detailHeight = ref(0);
const strategyHeight = ref(0);
const scrollTop = ref(0);
const mountDetail = ref();
const instance = getCurrentInstance();
const query = uni.createSelectorQuery().in(instance);

onLoad(async (options: any) => {
	const { id } = options;
	if (id) {
		mountId.value = id;
		mountDetail.value = await queryMountDetailApi(id);
		await commentStore.getCommentListFn(id);

		// 计算高度
		await nextTick(() => {
			query
				.select("#detail")
				.boundingClientRect((data: any) => {
					detailHeight.value = data.height;
				})
				.exec();

			query
				.select("#strategy")
				.boundingClientRect((data: any) => {
					strategyHeight.value = data.height;
				})
				.exec();
		});
	}
});

/**
 * 点击选项卡
 * */
const changeSubSectionFn = (index: number) => {
	switch (index) {
		case 0:
			scrollTop.value = 0;
			break;
		case 1:
			scrollTop.value = detailHeight.value;
			break;
		case 2:
			scrollTop.value = strategyHeight.value + detailHeight.value;
			break;
		default:
			break;
	}
};

/**
 * 滚动页面执行
 * */
const scrollPageFn = (e: any) => {
	if (
		e.detail.scrollTop > detailHeight.value - 1 &&
		e.detail.scrollTop < strategyHeight.value + detailHeight.value - 1
	) {
		current.value = 1;
	} else if (
		e.detail.scrollTop >=
		strategyHeight.value + detailHeight.value - 1
	) {
		current.value = 2;
	} else {
		current.value = 0;
	}
};
</script>

<style lang="scss" scoped>
.scroll-y {
	height: calc(100vh - 40px);
}
</style>
