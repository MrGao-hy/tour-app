<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 景区详情列表页面
  FilePath: \src\pages-mount\mountDetail\Index.vue
-->
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
		@scrolltolower="onScrollToLower"
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
		<!-- 评论区 -->
		<the-mount-comment></the-mount-comment>
		<up-gap height="50"></up-gap>
	</scroll-view>

	<!-- 分享海报 -->
	<the-share-poster></the-share-poster>
	<the-actions-bottom :detail="mountDetail"></the-actions-bottom>
</template>
<script setup lang="ts">
import { getCurrentInstance, nextTick, onUnmounted, reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import TheMountDetail from "@/pages/pages-mount/mountDetail/components/TheMountDetail.vue";
import TheMountComment from "@/components/TheMountComment.vue";
import { queryMountDetailApi } from "@/api";
import TheActionsBottom from "@/pages/pages-mount/mountDetail/components/TheActionsBottom.vue";
import { useCommentStore } from "@/store";
import TheSharePoster from "@components/TheSharePoster.vue";
import { config } from "@/config";

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
const page = reactive({
	current: 1,
	size: config.pageSize,
});

onLoad(async (options: any) => {
	const { id } = options;
	if (id) {
		mountId.value = id;
		mountDetail.value = await queryMountDetailApi(id);
		await commentStore.getCommentListFn(page.current, page.size, id);

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

onUnmounted(() => {
	commentStore.setCommentList();
});

/**
 * 滚动到底部触发加载
 * */
const onScrollToLower = () => {
	page.current++;
	commentStore
		.getCommentListFn(page.current, page.size, mountId.value)
		.then()
		.catch(() => {
			page.current--;
		});
};

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
:deep(.u-subsection) {
	position: sticky;
	top: 0;
	z-index: 1000;
}
.scroll-y {
	height: calc(100vh - 84px);
	.strategy {
		padding: $gxh-border-margin-padding-lg;
	}
}
</style>
