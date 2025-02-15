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
				<view class="income-header__left-num">
					<the-roll-num :num="integral" color="#ffffff"></the-roll-num>
				</view>
			</view>
			<view class="income-header__right">
				<up-button
					text="去兑换"
					color="#FFFFFF"
					:customStyle="{
						color: config.themeColor,
						width: '140rpx',
						height: '60rpx',
					}"
					shape="circle"
					@click="toGoodsPageFn"
				></up-button>
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
					{{ item.type ? "-" : "+" }}{{ item.integral }}积分
				</view>
			</view>
		</scroll-view>
	</view>

	<up-modal
		:show="showHint"
		title="如何获取更多积分?"
		:closeOnClickOverlay="true"
		@confirm="showHint = false"
		@close="showHint = false"
	>
		<view class="content">
			😃宝子们，福利来啦！
			<view class="content-row">
				1.初次邂逅景区，在下方留下您的优质评语，
				<text style="color: red">5积分</text>
				立马到手，开启美好体验第一步吧。
			</view>
			<view class="content-row">
				2.每日记录心情、分享日常，写篇日记就能有
				<text style="color: red">2积分</text>
				进账哦，让回忆也能 “变现”。
			</view>
			<view class="content-row">
				3.向着山顶冲锋，成功登顶打卡，<text style="color: red">5积分</text
				>是属于您的荣耀勋章。
			</view>
			<view class="content-row">
				4.好东西当然要和朋友一起，动动手指分享出去，每邀请一位好友注册，
				<text style="color: red">10积分</text>
				轻松入囊。
			</view>
			<view class="content-row hint"> 注：最终解释权妥妥握在作者手中哈。 </view>
		</view>
	</up-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { throttle } from "hfyk-app";
import { getIntegralRecordApi, getMyIntegralTotalApi } from "@/api";
import { config } from "@/config";
import { IntegralType } from "@/typing";
import TheRollNum from "@components/TheRollNum.vue";
import { onNavigationBarButtonTap } from "@dcloudio/uni-app";

const integral = ref(10000);
const page = reactive({
	current: 1,
	size: config.pageSize,
});
const incomeList = ref<IntegralType[]>([]);
const showHint = ref(false);

onNavigationBarButtonTap((e) => {
	if (e.index === 0) {
		showHint.value = true;
	}
});
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

const onScrollToLower = throttle(() => {
	page.current++;
	getIncomeList();
}, 500);

/**
 * @description 跳转列表页面
 * */
const toGoodsPageFn = () => {
	uni.navigateTo({
		url: "/pages/pages-task/goods/goodsList/Index",
	});
};
</script>

<style lang="scss" scoped>
.income {
	&-page {
		height: 100%;
	}
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
			&-label {
				color: #ffffff;
			}
			&-num {
				font-size: 50rpx;
			}
		}
		&__right {
		}
	}
	&-main {
		height: calc(100% - 120px);
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
.content {
	&-row {
		margin: $gxh-border-margin-padding-lg 0;
		&.hint {
			color: $gxh-color-hint;
		}
	}
}
</style>
