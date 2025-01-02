<template>
	<view class="favorite">
		<up-card
			:title="item.name"
			:sub-title="`(${item.altitude}米)`"
			box-shadow="2rpx 2rpx 10rpx 4rpx rgba(0, 0, 0, 0.1)"
			v-for="item in list"
			:key="item.id"
			@body-click="toPageFn(item)"
		>
			<template #body>
				<view class="" slot="body">
					<view
						class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0"
					>
						<view class="u-body-item-title u-line-2">{{
							item.introduction
						}}</view>
						<image :src="item.url" mode="aspectFill"></image>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2"
							>釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放</view
						>
						<image
							src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
							mode="aspectFill"
						></image>
					</view>
				</view>
			</template>
			<template #foot>
				<the-footer-actions
					:MountData="item"
					@handleCollect="collectMountFn"
					@handleOpenMark="onOpenMark"
				></the-footer-actions>
			</template>
		</up-card>
	</view>

	<!-- 分享海报 -->
	<the-share-poster></the-share-poster>
	<up-popup
		:show="showMark"
		closeable
		round="15"
		:customStyle="{
			minHeight: '30vh',
			maxHeight: '60vh',
			padding: '60rpx 10rpx 0',
		}"
		@close="onCloseMark"
	>
		<scroll-view
			scroll-y
			style="max-height: 60vh"
			@scrolltolower="onScrollToLower"
		>
			<the-mount-comment></the-mount-comment>
		</scroll-view>
	</up-popup>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { collectMountApi } from "@/api";
import { MountType } from "@/typing";
import TheFooterActions from "@/components/TheFooterActions.vue";
import TheMountComment from "@/components/TheMountComment.vue";
import { useCommentStore } from "@/store";
import TheSharePoster from "@components/TheSharePoster.vue";

interface IProps {
	list: MountType[];
}
const props = withDefaults(defineProps<IProps>(), {
	list: () => [],
});
const { list } = toRefs(props);
const commentStore = useCommentStore();
const showMark = ref<boolean>(false);
const selectMountId = ref<string>("");
const page = reactive({
	current: 1,
	size: 5,
});

/**
 * @description 收藏景区
 * @param id 景区id
 * */
const collectMountFn = async (id: string) => {
	await collectMountApi(id);
	list.value.find((item) => {
		if (item.id === id) {
			if (item.collect) {
				item.collectCount!--;
			} else {
				item.collectCount!++;
			}
			item.collect = !item.collect;
		}
	});
};

/**
 * @description 评论滚动加载更多
 * */
const onScrollToLower = () => {
	page.current++;
	commentStore
		.getCommentListFn(page.current, page.size, selectMountId.value)
		.then()
		.catch(() => {
			page.current--;
		});
};

/**
 * @description 打开评论区弹窗
 * @param id 景区id
 * */
const onOpenMark = async (id: string) => {
	selectMountId.value = id;
	await commentStore.getCommentListFn(page.current, page.size, id);
	showMark.value = !showMark.value;
};

/**
 * @description 关闭评论区
 * */
const onCloseMark = async () => {
	commentStore.setCommentList();
	showMark.value = false;
	page.current = 1;
};

/**
 * @description 跳转详情页面
 * @param temp 景区数据
 * */
const toPageFn = (temp: MountType) => {
	uni.navigateTo({
		url: `/pages/pages-mount/mountDetail/Index?id=${temp.id}`,
	});
};
</script>

<style scoped lang="scss">
.favorite {
	&-footer {
		display: flex;
		justify-content: space-around;
	}
}
.u-card-wrap {
	padding: 1px;
}

.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}

.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
	box-shadow: 5rpx 5rpx 20rpx 20rpx rgba(0, 0, 0, 0.1);
}
</style>
