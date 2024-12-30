<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 签到页面
  FilePath: \src\pages-task\diary\calendar\Index.vue
-->

<template>
	<the-calendar
		@onDayClick="selectDateFn"
		@onMonthClick="onMonthClick"
		:markDays="markDays"
	/>

	<!-- 固定打卡点 -->
	<view class="field">
		<view class="sign" @tap="selectDateFn"> 接受任务 </view>
		<view class="clock-in" @tap="clockInFn"> 地点打卡 </view>
	</view>
	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { formatTime } from "hfyk-app";

// 接口
import { queryDiaryListApi } from "@/api";
// 组件
import TheCalendar from "@/pages/pages-task/diary/calendar/components/TheCalendar.vue";

const markDays = ref<string[]>([]);
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const showPoster = ref(false);
const date = formatTime(new Date().getTime(), "yyyy-MM-dd");

onMounted(async () => {
	uni.$on("refreshIntegral", async () => {
		markDays.value = await queryDiaryListApi(date);
	});

	markDays.value = await queryDiaryListApi(date);
});

onUnmounted(() => {
	uni.$off("refreshIntegral");
});

// 打卡签到
const selectDateFn = (e) => {
	uni.navigateTo({
		url: `/pages/pages-task/diary/write/Index?date=${e.date || date}`,
	});
};

// 地点签到
const clockInFn = async () => {
	showPoster.value = true;
};

/**
 * 点击按钮
 * */
const onMonthClick = async (dat: string) => {
	markDays.value = await queryDiaryListApi(dat);
};
</script>

<style lang="scss" scoped>
.field {
	position: fixed;
	right: 40rpx;
	bottom: 100rpx;
	border-radius: 20rpx;
	overflow: hidden;
	font-weight: 900;
	font-size: 30rpx;
	color: #ffffff;
	width: 150rpx;
	//background: linear-gradient($themeColor 30%, rgba(41, 121, 255, 0.71) 70%);
	.sign {
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1rpx solid #f4f4f5;
	}
	.clock-in {
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
/*分享海报*/
.share-poster {
	width: 70vw;
	height: 70vh;
	overflow: hidden;
	.image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
}
</style>
