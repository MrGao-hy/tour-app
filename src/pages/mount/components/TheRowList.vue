<template>
	<view class="main-container">
		<up-checkbox-group
			v-model="changeList"
			@change="checkDataFn"
			activeColor="#bababa"
		>
			<scroll-view
				id="list"
				class="list"
				scroll-y
				@scrolltolower="scrollBottomFn"
			>
				<view
					:class="[
						'list__li',
						item.isFinish && !showAll ? 'mask' : '',
						item.isFinish ? 'mask_1' : '',
					]"
					v-for="(item, i) in list"
					:key="item.id"
					@tap="toPageFn(item)"
				>
					<view class="task">
						<view class="task__description">
							<view class="task__description-action">
								<up-checkbox :name="item.id"></up-checkbox>
								<view class="title">{{ item.name }}</view>
							</view>
							<view class="menu" @tap.stop="openPopupFn(item)">
								<up-icon name="more-dot-fill"></up-icon>
							</view>
						</view>
						<view class="task__info">
							<the-footer-actions
								:MountData="item"
								@handleCollect="collectMountFn"
								@handleOpenMark="onOpenMark"
							></the-footer-actions>
						</view>
					</view>
				</view>
				<up-gap height="50" bgColor="#f7f7f7"></up-gap>
			</scroll-view>
		</up-checkbox-group>
	</view>

	<up-popup
		:show="showMark"
		closeable
		round="15"
		:safeAreaInsetBottom="false"
		:customStyle="{
			minHeight: '30vh',
			maxHeight: '70vh',
			padding: '60rpx 10rpx 0',
		}"
		@close="onCloseMark"
	>
		<scroll-view
			scroll-y
			style="max-height: 70vh"
			@scrolltolower="onScrollToLower"
		>
			<the-mount-comment></the-mount-comment>
		</scroll-view>
	</up-popup>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";
import { reactive, ref, toRefs } from "vue";
import TheFooterActions from "@/components/TheFooterActions.vue";
import { collectMountApi } from "@/api";
import TheMountComment from "@/components/TheMountComment.vue";
import { useCommentStore } from "@/store";
import { config } from "@/config";

interface IProps {
	list: MountType[];
	showAll: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
	list: () => [],
	showAll: false,
});
const emit = defineEmits(["handleOpen", "handleScrollBottom"]);

const { list } = toRefs(props);
const selectMountId = ref<string>("");
const changeList = ref<string[]>([]);
const showMark = ref(false);
const commentStore = useCommentStore();
const page = reactive({
	current: 1,
	size: config.pageSize,
});

/**
 * @description 跳转详情页面
 * @param temp 景区单条数据集合
 * */
const toPageFn = (temp: MountType) => {
	uni.navigateTo({
		url: `/pages/pages-mount/mountDetail/Index?id=${temp.id}`,
	});
};
/**
 * @description 选择复选框
 * @param e 选择数据集合
 * */
const checkDataFn = (e: string[]) => {
	list.value.forEach((item) => {
		item.isFinish = e.includes(item.id!);
	});
	changeList.value = e;
};

/**
 * @description 打开操作菜单栏弹出层
 * @param item 景区集合
 * */
const openPopupFn = (item: MountType) => {
	emit("handleOpen", item);
};

/**
 * @description 滚动到底部加载更多
 * */
const scrollBottomFn = () => {
	emit("handleScrollBottom");
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
 * @description 收藏景区
 * @param id 景区id
 * */
const collectMountFn = async (id: string) => {
	await collectMountApi(id);
	list.value.find((item) => {
		if (item.id === id) {
			item.collect = !item.collect;
			item.collectCount = item.collect
				? item.collectCount! + 1
				: item.collectCount! - 1;
		}
	});
};

/**
 * @description 打开评论区弹窗
 * @param id 景区id
 * */
const onOpenMark = async (id: string) => {
	selectMountId.value = id;
	commentStore.getCommentListFn(page.current, page.size, id).finally(() => {
		showMark.value = !showMark.value;
	});
};

/**
 * @description 关闭评论区
 * */
const onCloseMark = async () => {
	commentStore.setCommentList();
	showMark.value = false;
	page.current = 1;
};
</script>

<style lang="scss" scoped>
.main-container {
	height: calc(100% - 40px);
	/* 列表 */
	.list {
		height: 100%;
		//overflow: auto;
		padding: 0;
		margin-top: 0;
		scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
		scrollbar-width: thin;

		.mask {
			height: 0;
			margin-bottom: 0;
			opacity: 0.3;
		}

		.mask_1 {
			margin-bottom: 0;
			opacity: 0.3;
		}

		&__li {
			height: 300rpx;
			margin: 0 0 0.4rem;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			border-radius: 0.5rem;
			transition: 0.9s;
			overflow: hidden;

			.task {
				background-color: #fff;
				padding: 0 $gxh-border-margin-padding-base
					$gxh-border-margin-padding-base;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border-radius: $gxh-border-radius-lg;
				color: $gxh-bg-color-mask;
				transition: 0.25s;
				height: 100%;

				&__description {
					display: flex;
					align-items: center;
					padding: $gxh-border-margin-padding-base 0;
					position: relative;
					flex: 1;

					.menu {
						position: absolute;
						margin-top: $gxh-border-margin-padding-lg;
						z-index: 2;
						right: 0;
						top: 0;
					}

					&-action {
						display: flex;

						.title {
							border-radius: $gxh-border-radius-lg;
							padding: $gxh-border-margin-padding-base
								$gxh-border-margin-padding-sm;
							font-size: $gxh-font-size-title;
							position: relative;
						}
					}
				}

				&__info {
					height: 60rpx;
					border-top: 1px solid $gxh-border-color;
					margin-left: 50rpx;
					padding-top: $gxh-border-margin-padding-base;
				}
			}
		}
	}
}
</style>
