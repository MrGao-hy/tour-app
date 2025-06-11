<template>
	<yk-tabs
		:list="statusTabs"
		@clickTabs="clickTabs"
		@animationFinish="animationFinish"
	>
		<the-order-dom
			:list="list[current].list"
			@rollBottom="rollBottomFn"
		></the-order-dom>
	</yk-tabs>

	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { orderListApi } from "@/api";
import { config } from "@/config";
import TheOrderDom from "@/pages/pages-user/order/orderList/components/TheOrderDom.vue";
import { OrderType } from "@/typing";
import YkVirtualScroller from "@components/yk-virtual-scroller/yk-virtual-scroller.vue";

interface AVo {
	current: number;
	size: number;
	searchVal: string;
	list: OrderType[];
	[key: string]: any;
}
const list: AVo[] = reactive([
	{
		current: 1,
		size: config.pageSize,
		searchVal: "",
		list: [],
	},
	{
		current: 1,
		size: config.pageSize,
		searchVal: "UNVERIFIED",
		list: [],
	},
	{
		current: 1,
		size: config.pageSize,
		searchVal: "VERIFIED",
		list: [],
	},
]);
const statusTabs = [{ name: "全部" }, { name: "未核销" }, { name: "已核销" }];
const current = ref(0);

onMounted(() => {
	queryOrderList(0);
});

/**
 * @description 点击tabs
 * */
const clickTabs = (i: number) => {
	current.value = i;
	if (!list[i].list.length) {
		list[i].current = 1;
		queryOrderList(i);
	}
};

/**
 * @description 滑动动作
 * */
const animationFinish = (i: number) => {
	current.value = i;
	if (!list[i].list.length) {
		list[i].current = 1;
		queryOrderList(i);
	}
};

const rollBottomFn = () => {
	list[current.value].current++;
	queryOrderList(current.value);
};

/**
 * @description 查询数据集合
 * */
const queryOrderList = async (index: number) => {
	const res = await orderListApi(list[index]);
	if (res.records.length <= 0) {
		uni.$u.toast("没有更多订单");
		return list[current.value].current--;
	}
	if (list[index].current === 1) {
		list[index].list = res.records;
	} else {
		list[index].list = [...list[index].list, ...res.records];
	}
};
</script>
