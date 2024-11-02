<template>
	<view class="favorite">
		<up-card
			:title="item.name"
			:sub-title="`(${item.altitude}米)`"
			box-shadow="2rpx 2rpx 10rpx 4rpx rgba(0, 0, 0, 0.1)"
			v-for="item in favoriteList"
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
						<image
							src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
							mode="aspectFill"
						></image>
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

	<up-popup
		:show="showMark"
		closeable
		round="15"
		:customStyle="{
			minHeight: '30vh',
			maxHeight: '60vh',
			padding: '60rpx 10rpx 0',
		}"
		@close="showMark = false"
	>
		<scroll-view scroll-y style="max-height: 60vh">
			<the-mount-comment></the-mount-comment>
		</scroll-view>
	</up-popup>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { collectMountApi, collectMountListApi } from "@/api";
import { MountType } from "@/typing";
import TheFooterActions from "@/components/TheFooterActions.vue";
import TheMountComment from "@/components/TheMountComment.vue";
import { useCommentStore } from "@/store";

const commentStore = useCommentStore();
const favoriteList = ref<MountType[]>([]);
const showMark = ref(false);

onMounted(async () => {
	const res = await collectMountListApi();
	favoriteList.value = res.map((item) =>
		Object.assign(item, { collect: true })
	);
});

/**
 * 收藏景区
 * */
const collectMountFn = async (id: string) => {
	await collectMountApi(id);
	favoriteList.value.find((item) => {
		if (item.id === id) {
			item.collect = !item.collect;
		}
	});
};

/**
 * 打开评论区弹窗
 * */
const onOpenMark = async (id: string) => {
	await commentStore.getCommentListFn(id);
	showMark.value = !showMark.value;
};

/**
 * 跳转详情页面
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
