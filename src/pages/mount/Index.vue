<template>
	<view class="wrapper">
		<view class="wrapper__card">
			<the-header :count="mountList.length"></the-header>
			<view class="main">
				<view class="main-stats">
					<view class="main-stats__left">
						<text style="font-weight: bold">{{ count }}</text>
						/{{ mountList.length }} 已完成
					</view>
					<view class="main-stats__right">
						<text>显示全部</text>
						<up-switch
							v-model="showAll"
							@change="change"
							activeColor="#061240"
							size="15"
						></up-switch>
					</view>
				</view>
				<!-- 景区模块内容界面 -->
				<the-row-list
					:list="mountList"
					:showAll="showAll"
					@handleOpen="openBottomPopupFn"
					@handleScrollBottom="scrollBottomFn"
				></the-row-list>
			</view>
		</view>
	</view>

	<!-- 分享海报 -->
	<the-share-poster></the-share-poster>
	<!-- 操作弹窗层 -->
	<the-action
		ref="actionRef"
		:show="showPopup"
		:selectMount="selectMount"
		@handleClose="showPopup = false"
	></the-action>

	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import TheRowList from "@/pages/mount/components/TheRowList.vue";
import { queryMountListApi } from "@/api";
import { config } from "@/config/config";
import { MountType, PageConfigVo } from "@/typing";
import TheAction from "@/pages/mount/components/TheAction.vue";
import TheHeader from "@/pages/mount/components/TheHeader.vue";
import TheSharePoster from "@components/TheSharePoster.vue";
import { onShow } from "@dcloudio/uni-app";

const showAll = ref<boolean>(false);
const mountList = ref<MountType[]>([]);
const page: PageConfigVo = reactive({
	current: 1,
	size: config.pageSize,
});
const showPopup = ref<boolean>(false);
const selectMount = ref<MountType>();
const actionRef = ref();
const count = computed(() => {
	const map = mountList.value.filter((item) => {
		return item.isFinish;
	});
	return map.length;
});

onShow(() => {
	mountList.value = [];
	getMountList();
});

/**
 * 名山列表
 * */
const getMountList = async () => {
	const res = await queryMountListApi(page);
	if (res.records.length === 0) {
		return page.current--;
	}
	mountList.value = [
		...mountList.value,
		...res.records.map((item) => Object.assign(item, { isFinish: false })),
	];
};

/**
 * 打开全部控件
 * */
const change = (e: boolean) => {
	showAll.value = e;
};

/**
 * 打开选择操作栏
 * */
const openBottomPopupFn = (temp: MountType) => {
	selectMount.value = temp;
	// await actionRef.value.queryCollectState(id);
	showPopup.value = true;
};

/**
 * 滚动加载
 * */
const scrollBottomFn = () => {
	page.current++;
	getMountList();
};
</script>
<style lang="scss" scoped>
.wrapper {
	--color-code: 0, 26, 188;
	--color-design: 78, 186, 177;
	--color-other: 193, 88, 200;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	&__card {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #f7f7f7;

		.main {
			--count: calc(
				var(--task-1, 0) + var(--task-2, 0) + var(--task-3, 0) +
					var(--task-4, 0) + var(--task-5, 0) + var(--task-6, 0) +
					var(--task-7, 0) + var(--task-8, 0) + 0
			);
			counter-reset: css-counter var(--count, 0);
			height: calc(100vh - 400rpx);
			padding: 0.8rem 0.8rem 0;
			position: relative;

			&-stats {
				display: flex;
				justify-content: space-between;
				margin-bottom: 1rem;
				margin-left: 1.4rem;
				font-size: 0.8rem;

				&__right {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&__right {
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					text {
						margin-right: $gxh-border-margin-padding-sm;
					}
				}
			}
		}
	}
}

:deep(.u-checkbox-group) {
	display: block;
	height: 100%;
}
</style>
