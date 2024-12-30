<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 积分记录页面
  FilePath: \src\pages-task\integralRecord\Index.vue
-->
<template>
	<view class="income-page" :style="{ backgroundColor: config.themeColor }">
		<view class="income-header">
			<view class="income-header__left">
				<view class="income-header__left-label">我的积分</view>
				<view class="income-header__left-num">{{ integral }}</view>
			</view>
			<view class="income-header__right">
				<navigator
					url="/pages/commodity-pages/commodityList/Index"
					hover-class="none"
				>
					<u-button
						text="去兑换"
						color="#FFFFFF"
						:customStyle="{
							color: config.themeColor,
							width: '140rpx',
							height: '60rpx',
						}"
						shape="circle"
					></u-button>
				</navigator>
			</view>
		</view>
		<scroll-view class="income-main" scroll-y @scrolltolower="onScrollToLower">
			<yk-empty
				:show="!incomeList.length"
				description="您当前还没积分消费记录，试试去消费吧~"
			></yk-empty>
			<view
				class="income-main__row"
				v-for="(item, index) in incomeList"
				:key="index"
			>
				<view class="income-main__row-left">
					<view class="income-main__row-left__name">{{ item.remark }}</view>
					<view class="income-main__row-left__date">{{ item.createTime }}</view>
				</view>
				<view class="income-main__row-right">
					{{ item.type ? "-" : "+" }}
					{{ item.integral }}积分
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { throttle } from "hfyk-app";
import { getIntegralRecordApi, getMyIntegralTotalApi } from "@/api";
import { config } from "@/config";
import { IntegralType } from "@/typing";

const integral = ref(0);
const page = reactive({
	current: 1,
	size: config.pageSize,
});
const incomeList = ref<IntegralType[]>([]);

onMounted(() => {
	getMyIntegralTotalApi().then((res) => {
		integral.value = res;
	});
	getIncomeList();
});

/**
 * 获取积分收支列表
 * */
const getIncomeList = () => {
	return new Promise(async (resolve, reject) => {
		const res = await getIntegralRecordApi(page.current, page.size);
		if (page.current > Math.ceil(res.total / page.size)) {
			page.current--;
			await uni.showToast({
				title: "没有更多数据了",
				icon: "none",
			});
		} else {
			incomeList.value = [...incomeList.value, ...res.records];
		}
	});
};

const onScrollToLower = throttle((e) => {
	page.current++;
	getIncomeList();
}, 500);
</script>

<style lang="scss" scoped>
.income {
	&-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 50rpx 40rpx;
		height: 120px;
		box-sizing: border-box;
		&__left {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #ffffff;
			&-label {
			}
			&-num {
				font-size: 50rpx;
			}
		}
		&__right {
		}
	}
	&-main {
		height: calc(100vh - 120px);
		border-radius: 20rpx 20rpx 0 0;
		padding: 40rpx 40rpx 0;
		background: #ffffff;
		box-sizing: border-box;
		&__row {
			border-bottom: 1px solid rgba(128, 128, 128, 0.34);
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			&-left {
				&__name {
					font-size: 35rpx;
					margin-bottom: 15rpx;
				}
				&__date {
					font-size: 25rpx;
					color: #969799;
				}
			}
			&-right {
				color: #0099ff;
				font-weight: bold;
				font-size: 40rpx;
			}
		}
	}
}
</style>
