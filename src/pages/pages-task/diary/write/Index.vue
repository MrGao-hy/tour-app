<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 写日记页面
  FilePath: \src\pages-task\diary\write\Index.vue
-->
<template>
	<view class="container white">
		<image class="container__img" :src="img" mode="widthFix" />
		<view class="container__form-group">
			<view class="container__form-info">
				<view class="container__form-info__title">📌 日记标题</view>
				<up-input
					v-model="diary.title"
					placeholder="今天的小秘密还没来得及和日记本分享呢"
					:border="isEdit ? 'surround' : 'none'"
					:disabled="isEdit"
				></up-input>
			</view>
			<view class="container__form-info">
				<view class="container__form-info__title">💡 执行任务</view>
				<view class="mission-info_desc">
					{{ diary.plan }}
					<view
						class="t-icon custom-t-icon-daohang"
						@tap="toRunningPageFn"
					></view>
				</view>
			</view>
			<view class="container__form-info">
				<view class="container__form-info__title"
					>💰 奖励力度：{{ diary.integral }} 积分</view
				>
				<view class="container__form-info__cell">
					<up-line-progress
						:percentage="proportion"
						:showText="false"
					></up-line-progress>
					<view>&ensp;{{ maxCredit }}积分</view>
				</view>
			</view>
			<view class="container__form-info">
				<view class="container__form-info__title">📅 创建日期</view>
				<view class="mission-info_desc">{{ diary.createDate }}</view>
			</view>
			<view class="container__form-info">
				<view class="container__form-info__title">📝 日记内容</view>
				<up-textarea
					v-model="diary.content"
					:height="100"
					placeholder="嘿😃，今天的小秘密还没来得及和日记本分享呢吧！快拿起笔，把这一天的喜怒哀乐、琐碎日常都写下来，让日记本成为你的专属树洞，开启今日份的心灵之旅吧～"
					:disabled="isEdit"
				></up-textarea>
			</view>
		</view>
		<up-button
			v-if="!isEdit"
			class="container__save"
			:color="config.themeColor"
			@click="saveDiaryFn"
			>签到</up-button
		>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
// import { getWeekday, timeFormat } from "@/utils/utils";
import { formatTime } from "hfyk-app";
// 接口
import { queryDiaryContentApi, saveDiaryApi } from "@/api";
import { DiaryVo } from "@/typing";
import { useUserStore } from "@/store";
import { config } from "@/config";

interface Type extends DiaryVo {
	[key: string]: string | unknown;
}
const diary: Type = reactive({
	title: "",
	plan: "写日记",
	integral: 2,
	createDate: "",
	content: "",
});
const userStore = useUserStore();
const maxCredit = ref<number>(10);
const proportion = ((diary.integral / maxCredit.value) * 100).toFixed(0);
const isEdit = ref(true);
const img = ref(`/static/images/Mission.gif?${Math.random()}`);
const award = reactive([
	{
		plan: "跑步五公里",
		integral: 4,
	},
	{
		plan: "辛勤劳动，扫地收拾房间",
		integral: 2,
	},
	{
		plan: "读书2小时",
		integral: 3,
	},
	{
		plan: "晚上散步两小时",
		integral: 2,
	},
	{
		plan: "练字半小时",
		integral: 1,
	},
	{
		plan: "劳动最光荣，辛勤劳作一天",
		integral: 5,
	},
	{
		plan: "骑车运动两小时",
		integral: 5,
	},
]);
const transferTime = ref("");

onLoad(async (options: any) => {
	transferTime.value = options.date;

	const res: any = await queryDiaryContentApi(transferTime.value);
	if (res) {
		Object.keys(diary).map((key) => {
			diary[key] = res[key];
		});
	}

	const now = formatTime(new Date().getTime(), "yyyy-MM-dd");
	if (options.date && options.date !== now) {
		diary.createDate = options.date;
		isEdit.value = true;
	} else {
		diary.createDate = now;
		isEdit.value = false;
	}
});

/**
 * @description 保存每日日记
 * */
const saveDiaryFn = async () => {
	await saveDiaryApi(diary);
	await userStore.getToDayIntegralCount();
	uni.$u.toast("保存成功");
	// uni.$emit("refreshIntegral");
};

// 跳转跑步页面
const toRunningPageFn = () => {
	uni.navigateTo({
		url: `/pages/pages-user/task/running/Index?time=${transferTime.value}`,
	});
};
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	padding: 40rpx;
	overflow: auto;
	box-sizing: border-box;
	background-color: #ffffff;
	animation-name: animation-blur;
	animation-duration: 0.8s;
	@keyframes animation-blur {
		from {
			filter: blur(7px);
		}
		to {
			filter: blur(0px);
		}
	}

	&__img {
		margin: auto;
		width: 100%;
	}
	&__form {
		&-group {
			border-radius: 20rpx;
			background-color: #ffffff;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05),
				0 6px 20px 0 rgba(0, 0, 0, 0.05);
			margin-bottom: 50rpx;
		}
		&-info:not(:last-child) {
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}
		&-info {
			padding: 20rpx;
			&__title {
				margin-bottom: 10px;
				font-size: 40rpx;
			}
			.mission-info_desc {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: darkgray;
				.custom-t-icon-daohang {
					width: 50rpx;
					height: 50rpx;
				}
			}

			&__cell {
				display: flex;
				justify-content: center;
				align-items: center;
				color: darkgray;
				:deep(.u-line-progress__line) {
					background-image: linear-gradient(
						to right,
						#61affc,
						#697bfe
					) !important;
				}
			}
		}
	}
	&__save {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05),
			0 6px 20px 0 rgba(0, 0, 0, 0.05);
	}
}
</style>
