<template>
	<view class="bottom">
		<view class="navigation">
			<view class="left">
				<view class="item" @tap="onClickTab('collect')">
					<up-icon
						:name="detail.collect ? 'star-fill' : 'star'"
						:size="20"
						color="#F6B204"
					></up-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item" @tap="onClickTab('mark')">
					<up-icon
						name="chat"
						:size="20"
						:color="$u.color['contentColor']"
					></up-icon>
					<view class="text u-line-1">评论</view>
				</view>
				<view class="item car" @tap="onClickTab('share')">
					<up-icon
						name="share"
						:size="20"
						:color="$u.color['contentColor']"
					></up-icon>
					<view class="text u-line-1">分享</view>
				</view>
			</view>
			<view class="right">
				<view class="buy btn u-line-1">立即打卡</view>
			</view>
		</view>
	</view>

	<the-mark-dom
		:id="detail.id"
		:show="showModal"
		@handleClose="showModal = false"
	></the-mark-dom>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";
import { ref, toRefs } from "vue";
import { collectMountApi } from "@/api";
import TheMarkDom from "@/pages/index/components/TheMarkDom.vue";

interface IProps {
	detail: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	detail: () => ({ id: "" }),
});

const { detail } = toRefs(props);
const showModal = ref(false);

/**
 * 点击tabs
 * */
const onClickTab = async (type: string) => {
	switch (type) {
		case "collect":
			detail.value.collect = await collectMountApi(detail.value.id);
			break;
		case "mark":
			showModal.value = true;
			break;
		case "share":
			break;
		default:
			break;
	}
};
</script>

<style lang="scss" scoped>
.bottom {
	position: fixed;
	bottom: 0;
	padding: 16rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	width: 100%;
	.navigation {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 20rpx;
				//display: flex;
				//flex-direction: column;
				//justify-content: center;
				//&.car {
				//	text-align: center;
				//	position: relative;
				//	.car-num {
				//		position: absolute;
				//		top: -10rpx;
				//		right: -10rpx;
				//	}
				//}
			}
		}
		.right {
			float: right;
			//display: flex;
			font-size: 28rpx;
			//align-items: center;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
			.buy {
				background-color: #ff7900;
			}
		}
	}
}
</style>
