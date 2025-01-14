<template>
	<!-- 底部弹出层 -->
	<up-popup :show="show" mode="bottom" closeable round="20" @close="closeFn">
		<view class="container">
			<view class="operate">
				<view class="operate__btn" @click="clickActiveFn('star')">
					<up-icon
						:name="selectMount.collect ? 'star-fill' : 'star'"
						size="40"
						color="#F6B204"
					></up-icon>
				</view>
				<view class="operate__btn" @click="clickActiveFn('chat')">
					<up-icon name="chat" size="40"></up-icon>
				</view>
				<view class="operate__btn" @click="clickActiveFn('share')">
					<up-icon name="share" size="40"></up-icon>
				</view>
			</view>
		</view>
	</up-popup>

	<the-mark-dom
		:MountId="selectMount.id"
		:show="showModal"
		@handle-ok="markMountFn"
		@handleClose="showModal = false"
	></the-mark-dom>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { collectMountApi } from "@/api";
import TheMarkDom from "@/pages/mount/components/TheMarkDom.vue";
import { useSharePosterStore } from "@/store";
import { MountType } from "@/typing";

interface IProps {
	show: boolean;
	selectMount: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	show: false,
	selectMount: () => ({ id: "" }),
});
const emit = defineEmits(["handleClose", "handleScrollBottom"]);

const { selectMount } = toRefs(props);
const sharePosterStore = useSharePosterStore();
const showModal = ref(false);

/**
 * @description 关闭弹窗
 * */
const closeFn = () => {
	emit("handleClose");
};

/**
 * @description 操作栏操作
 * */
const clickActiveFn = async (type: string) => {
	switch (type) {
		case "star":
			selectMount.value.collect = await collectMountApi(selectMount.value.id);
			if (selectMount.value.collect) {
				selectMount.value.collectCount!++;
			} else {
				selectMount.value.collectCount!--;
			}
			break;
		case "chat":
			showModal.value = true;
			break;
		case "share":
			sharePosterStore.openSharePosterFn(selectMount.value);
			break;
		default:
			break;
	}
};

/**
 * @description 评论接口处理完执行函数
 * */
const markMountFn = () => {
	showModal.value = false;
	// 评论数加
	selectMount.value.markCount!++;
};
</script>

<style lang="scss" scoped>
.container {
	padding: 40px 0 30px;

	.operate {
		display: flex;
		justify-content: space-around;
		align-items: center;

		&__btn {
			padding: 15rpx;
			background: $gxh-color-primary-dark;
			color: #001abc;
			font-weight: 600;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
