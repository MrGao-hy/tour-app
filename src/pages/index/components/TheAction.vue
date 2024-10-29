<template>
	<!-- 底部弹出层 -->
	<up-popup :show="show" mode="bottom" closeable round="20" @close="closeFn">
		<view class="container">
			<view class="operate">
				<view class="operate__btn" @click="clickActiveFn('star')">
					<up-icon
						:name="isCollect ? 'star-fill' : 'star'"
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
		:id="id"
		:show="showModal"
		@handleClose="showModal = false"
	></the-mark-dom>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { collectMountApi, markMountApi, queryMountIsCollectApi } from "@/api";
import { MarkMountType } from "@/typing";
import TheMarkDom from "@/pages/index/components/TheMarkDom.vue";

interface IProps {
	show: boolean;
	id: string;
}
const props = withDefaults(defineProps<IProps>(), {
	show: false,
	id: "",
});
const emit = defineEmits(["handleClose", "handleScrollBottom"]);

const { id } = toRefs(props);
const isCollect = ref(false);
const showModal = ref(false);

/**
 * 关闭弹窗
 * */
const closeFn = () => {
	emit("handleClose");
};

/**
 * 查询是否收藏景区
 * */
const queryCollectState = (id: string) => {
	return new Promise(async (resolve) => {
		isCollect.value = await queryMountIsCollectApi(id);
		resolve(null);
	});
};

/**
 * 操作栏操作
 * */
const clickActiveFn = async (type: string) => {
	// emit("")
	switch (type) {
		case "star":
			isCollect.value = await collectMountApi(id.value);
			break;
		case "chat":
			showModal.value = true;
			break;
		case "share":
			break;
		default:
			break;
	}
};

defineExpose({
	queryCollectState,
});
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
			background: rgba(0, 26, 188, 0.15);
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
