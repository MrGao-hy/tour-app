<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 抖音视频博主个人中心
  FilePath: \diary\src\pages-recreation\video\Solos.vue
-->

<template>
	<view
		class="mine mine-page"
		@touchstart="onTouchstart"
		@touchend="onTouchEnd"
		@touchmove="onTouchMove"
	>
		<!--背景图-->
		<view class="bg-img" :style="backgroundStyle">
			<view class="shade"> </view>
			<image class="image" :src="imageUrl" mode="aspectFill"></image>

			<view class="user-header">
				<view class="user-header__left">
					<the-avatar :avatar="userInfo.avatar" size="70"></the-avatar>
					<view class="user-header__info">
						<view class="nickname">
							<text>{{ userInfo.userName }}</text>
							<view class="actions-icon" @tap="showMenu = true">
								<up-icon
									name="arrow-down-fill"
									color="#F5F1EC"
									size="14"
								></up-icon>
							</view>
						</view>
						<view class="phone">{{ userInfo.phone }}</view>
					</view>
				</view>
				<view class="user-header__right">
					<canvas
						id="integral_chart"
						canvas-id="integral_chart"
						style="width: 100%; height: 300px"
					></canvas>
					<navigator
						url="/pages/pages-task/integralRecord/Index"
						hover-class="none"
					>
						<view class="user-header__right__btn">查看积分</view>
					</navigator>
				</view>
			</view>
		</view>

		<!--内容区域-->
		<view class="mine-main">
			<the-tools-row :menus="functionMenu"></the-tools-row>

			<the-tools-row :menus="toolsMenu"></the-tools-row>
		</view>
	</view>

	<!-- 操作栏 -->
	<the-function-col
		:show="showMenu"
		:actionMenu="actionMenu"
		@handle-close="showMenu = false"
		@handle-click="onClickMenuFn"
	></the-function-col>
	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import TheFunctionCol, { ActionMenu } from "@components/TheFunctionCol.vue";
import { actionMenu, functionMenu, initImageHeight, toolsMenu } from "./data";
import TheToolsRow from "@/pages/mine/components/TheToolsRow.vue";
import { clearVal } from "hfyk-app";
import TheAvatar from "@components/TheAvatar.vue";
import echartsFn from "@/config/eCharts";
import { onReady } from "@dcloudio/uni-app";

const userStore = useUserStore();
const { userInfo, todayIntegralCount } = storeToRefs(userStore);
const showMenu = ref(false);
// 用户滑动
const clientData = reactive({
	// 用户手指Y轴
	startY: 0, // 手指按下时屏幕的位置
	moveY: 0, // 手指当前在屏幕中的位置
	pageAtTop: true, // 是否到顶
});
// 背景图片地址
const imageUrl = ref("/static/images/bg.jpeg");
const imageHeight = ref(initImageHeight);
// 过度时间
const transform = reactive({
	scale: "scale(1)", // 图片放大倍数
	time: "0s", // 过度时间
});
const moving = ref<boolean>(false);
const backgroundStyle = computed(() => {
	const style: any = {};
	style.height = `${imageHeight.value}px`;
	style.transform = transform.scale;
	style.transition = transform.time;
	return style;
});

onReady(() => {
	userStore.getToDayIntegralCount().then(() => {
		echartsFn.initChart(todayIntegralCount.value);
	});
});

onBeforeUnmount(() => {
	echartsFn.destroyChart();
});

/**
 * @description 操作用户栏
 * */
const onClickMenuFn = (temp: ActionMenu) => {
	switch (temp.key) {
		case 1:
			uni.removeStorageSync("diary_token");
			clearVal(userInfo.value);
			uni.reLaunch({
				url: "/pages/pages-user/login/Index",
			});
			break;
		case 4:
			uni.showModal({
				title: "是否注销用户？",
				content: "注销用户后您账号下的所以数据无法恢复",
				success: (e) => {
					if (e.confirm) {
						uni.$u.toast("注销失败，程序员太菜了，没有实现改功能");
					}
				},
			});
			break;
		default:
			uni.navigateTo(<UniNamespace.NavigateToOptions>{
				url: temp.url,
			});
			break;
	}
};

/**
 * @description 手指按下
 * @param e 底层返回数据
 * */
const onTouchstart = (e: any) => {
	if (!clientData.pageAtTop) {
		return;
	}
	transform.time = ".1s ease-out";
	clientData.startY = e.touches[0].clientY;
};

/**
 * @description 手指移动
 * @param e 底层返回数据
 * */
const onTouchMove = (e: any) => {
	clientData.moveY = e.touches[0].clientY;
	const moveDistance = clientData.moveY - clientData.startY;
	if (moveDistance < 0) {
		moving.value = false;
		return;
	}
	moving.value = true;
	if (moveDistance > 0) {
		if (imageHeight.value > 800) return;
		imageHeight.value = initImageHeight + moveDistance;
		transform.scale = "scale(1)";
		transform.time = ".1s ease-out";
	}
};
/**
 * @description 手指抬起
 * */
const onTouchEnd = () => {
	if (moving.value === false) {
		return;
	}
	moving.value = false;
	imageHeight.value = initImageHeight;
	transform.scale = "scale(1)";
	transform.time = ".2s ease-out";
};
</script>

<style lang="scss" scoped>
.mine {
	height: 100%;
	/*背景图*/
	.bg-img {
		width: 100vw;
		overflow: hidden;
		background-size: cover;
		position: relative;
		.shade {
			background-image: linear-gradient(to top, #7d6446, #00000000);
			z-index: 1;
			height: 100%;
			width: 100%;
			position: absolute;
		}

		.image {
			height: 100%;
			width: 100%;
			position: absolute;
			bottom: 0;
		}
		.user-header {
			&__left {
				display: flex;
				align-items: flex-end;
				padding: 0 30rpx 50rpx;
				position: absolute;
				bottom: 0;
				z-index: 2;
			}
			&__info {
				margin-left: 40rpx;
				z-index: 1;
				.nickname {
					font-size: $gxh-font-size-title;
					color: $gxh-text-color-inverse;
					display: flex;
					align-items: center;
					.actions-icon {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
						background: rgba(128, 128, 128, 0.4);
						margin-left: $gxh-border-margin-padding-lg;
					}
				}
				.phone {
					font-size: $gxh-font-size-hint;
					color: $gxh-color-hint;
				}
			}

			&__right {
				position: absolute;
				bottom: 0;
				z-index: 2;
				right: 0;
				width: 40vw;

				&__btn {
					position: absolute;
					bottom: 20px;
					left: 70rpx;
					//background: #F2F6FF;
					background: linear-gradient(to bottom, #f2f6ff, #d2e1ff);
					color: #2571c5;
					padding: $gxh-border-margin-padding-sm $gxh-border-margin-padding-base;
					border-radius: 100px;
					font-size: 30rpx;
					font-weight: 600;
				}
			}
		}
	}
	&-main {
		transform: translateY(-10px);
		height: calc(100% - 240px);
		background: #fff;
		padding: $gxh-border-margin-padding-lg;
		border-radius: 20rpx 20rpx 0 0;
	}
}
</style>
