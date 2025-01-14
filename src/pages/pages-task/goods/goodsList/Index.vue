<template>
	<view class="drug drug-page">
		<!-- 搜索头部栏 -->
		<view>
			<view class="search-top">
				<u-search
					placeholder="搜索礼品名称/价格/库存"
					v-model="pageParam.searchVal"
					searchIconColor="#FE3231"
					:showAction="false"
					@search="searchGoodsFn"
				></u-search>
				<navigator
					class="shop-icon"
					url="/pages/pages-user/order/orderList/Index"
				>
					<u-icon name="order" size="25"></u-icon>
				</navigator>
			</view>
			<!--头部tabs组件-->
			<view class="filter-drug">
				<view class="filter-left filter-mode" @tap="showSheet = !showSheet">
					综合推荐&ensp;
					<u-icon :name="showSheet ? 'arrow-up' : 'arrow-down'"></u-icon>
				</view>
				<view class="filter-right filter-mode">
					筛选
					<text class="iconfont icon-shaixuan"></text>
				</view>
			</view>
		</view>
		<!--商品列表-->
		<scroll-view
			class="commodity-list"
			scroll-y
			@scrolltolower="scrollBottomFn"
		>
			<!-- 礼品列表 -->
			<up-waterfall v-if="goodsList.length" v-model="goodsList">
				<template v-slot:left="{ leftList }">
					<the-goods-dom :list="leftList"></the-goods-dom>
				</template>
				<template v-slot:right="{ rightList }">
					<the-goods-dom :list="rightList"></the-goods-dom>
				</template>
			</up-waterfall>
		</scroll-view>
	</view>

	<!--操作菜单栏-->
	<u-picker
		closeOnClickOverlay
		:show="showSheet"
		ref="uPicker"
		:columns="tabs"
		@confirm="selectDrugTypeFn"
		@close="showSheet = !showSheet"
		@cancel="showSheet = !showSheet"
		keyName="label"
		:itemHeight="44"
	></u-picker>
	<!--无网络状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { queryGoodsListApi } from "@/api/modules/goods";
import { GoodsVo, PageConfigVo } from "@/typing";
import { config } from "@/config";
import TheGoodsDom from "@/pages/pages-task/goods/goodsList/components/TheGoodsDom.vue";

const goodsList = ref<GoodsVo[]>([]);
const pageParam: PageConfigVo = reactive({
	current: 1,
	size: config.pageSize,
	searchVal: "",
	sort: "",
	sortField: "",
});
const tabs = reactive([
	[
		{ label: "全部", value: "" },
		{ label: "库存", value: "quantity" },
		{ label: "积分", value: "integral" },
		{ label: "原价", value: "price" },
	],
	[
		{ label: "升序", value: "asc" },
		{ label: "降序", value: "desc" },
	],
]);
const showSheet = ref(false);

onMounted(() => {
	queryGoodsList();
});

/**
 * @description 搜索功能
 * */
const searchGoodsFn = () => {
	goodsList.value = [];
	pageParam.current = 1;
	queryGoodsList();
};

/**
 * @description 排序功能
 * */
const selectDrugTypeFn = async (e: any) => {
	pageParam.current = 1;
	goodsList.value = [];
	pageParam.sortField = e.value[0].value;
	pageParam.sort = e.value[1].value;
	await queryGoodsList();
	showSheet.value = false;
};

/**
 * @deprecated 触底加载更多
 * */
const scrollBottomFn = () => {
	pageParam.current++;
	queryGoodsList();
};

/**
 * @description 查询商品
 * */
const queryGoodsList = async () => {
	const res = await queryGoodsListApi(pageParam);
	if (!res.records.length) {
		uni.$u.toast("没有更多礼品了");
		return pageParam.current--;
	}
	goodsList.value = [...goodsList.value, ...res.records];
};
</script>

<style scoped lang="scss">
.drug {
	height: 100%;
	.search-top {
		background: #ffffff;
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		.shop-icon {
		}
	}

	/*头部分类药品*/
	.filter-drug {
		display: flex;
		justify-content: space-between;
		padding: 26rpx 19rpx;
		background: #ffffff;
		.filter-mode {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-weight: 500;
		}
		.filter-left {
			color: #fe3232;
		}
		.filter-right {
			.icon-shaixuan {
				font-size: 25rpx;
			}
		}
	}

	/**/
	.commodity-list {
		height: calc(100% - 90px);
	}
}
</style>
