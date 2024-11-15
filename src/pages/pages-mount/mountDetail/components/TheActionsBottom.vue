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
				<view
					class="buy btn u-line-1"
					:style="{ background: config.themeColor }"
					@click="punchMountFn"
					>立即打卡</view
				>
			</view>
		</view>
	</view>

	<the-mark-dom
		:id="detail.id"
		:show="showModal"
		@handleOk="confirmSubmitFn"
		@handleClose="showModal = false"
	></the-mark-dom>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";
import { onMounted, reactive, ref, toRefs } from "vue";
import { collectMountApi, recordTravelApi } from "@/api";
import TheMarkDom from "@/pages/index/components/TheMarkDom.vue";
import { config } from "@/config";
import { useCommentStore, useSharePosterStore } from "@/store";

interface IProps {
	detail: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	detail: () => ({ id: "" }),
});

const sharePosterStore = useSharePosterStore();
const commentStore = useCommentStore();
const { detail } = toRefs(props);
const showModal = ref(false);

const punch = reactive({
	mountId: "",
	latitude: 0,
	longitude: 0,
});

onMounted(() => {
	uni.getLocation({
		type: "gcj02",
		altitude: true,
		highAccuracyExpireTime: 4000,
		isHighAccuracy: true,
		success: async (res) => {
			console.log("当前位置的经度：" + res.longitude);
			console.log("当前位置的纬度：" + res.latitude);
			punch.longitude = res.longitude;
			punch.latitude = res.latitude;
		},
		fail: function (err) {
			console.error(err);
			uni.$u.toast(err.errMsg);
		},
	});
});

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
			await sharePosterStore.openSharePosterFn(detail.value);
			break;
		default:
			break;
	}
};

/**
 * 景区打卡
 * */
const punchMountFn = async () => {
	punch.mountId = detail.value.id;
	await recordTravelApi(punch);
};

/**
 * 提交评价
 * */
const confirmSubmitFn = () => {
	showModal.value = false;
	commentStore.getCommentListFn(detail.value.id);
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
			}
		}
		.right {
			float: right;
			font-size: 28rpx;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
