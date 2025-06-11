<template>
	<view class="search">
		<view v-show="!searchList.length" class="search-input">
			<!-- 历史记录 -->
			<the-history-record
				ref="historyRefs"
				@handleSearch="searchEvent"
			></the-history-record>

			<!-- 热搜榜 -->
			<the-searc-hot-ranking></the-searc-hot-ranking>
		</view>

		<!-- 搜索数据列表 -->
		<up-waterfall v-model="searchList">
			<template v-slot:left="{ leftList }">
				<the-music-dom
					:list="leftList"
					@jumpPageFn="jumpPageFn"
				></the-music-dom>
			</template>
			<template v-slot:right="{ rightList }">
				<the-music-dom
					:list="rightList"
					@jumpPageFn="jumpPageFn"
				></the-music-dom>
			</template>
		</up-waterfall>

		<up-back-top :scrollTop="scrollTop"></up-back-top>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
	onNavigationBarButtonTap,
	onNavigationBarSearchInputChanged,
	onPageScroll,
	onReachBottom,
} from "@dcloudio/uni-app";
import { searchMusicListApi } from "@/api";
import TheMusicDom, {
	ListVo,
} from "@/pages/pages-recreation/music/search/components/TheMusicDom.vue";
import { config } from "@/config";
import TheHistoryRecord from "@/pages/pages-recreation/music/search/components/TheHistoryRecord.vue";
import TheSearcHotRanking from "@/pages/pages-recreation/music/search/components/TheSearcHotRanking.vue";
import YkVirtualScroller from "@components/yk-virtual-scroller/yk-virtual-scroller.vue";

const historyRefs = ref();
const searchVal = ref("");
const searchList = ref<ListVo[]>([]);
const scrollTop = ref(0);
const page = reactive({
	current: 1,
	size: config.pageSize,
});

/**
 * @description 搜索栏输入值
 * */
onNavigationBarSearchInputChanged((e) => {
	console.log(e);
	searchVal.value = e.text;
});
/**
 * @description 点击搜索搜索音乐
 * */
onNavigationBarButtonTap((e) => {
	if (e.index === 0) {
		// 搜索初始化数据
		page.current = 1;
		searchList.value = [];
		searchEvent(searchVal.value);
		historyRefs.value.setHistoryFn(searchVal.value);
	}
});
// 滚动触底
onPageScroll((e) => {
	scrollTop.value = e.scrollTop;
});
// 滚动底部触底
onReachBottom(() => {
	page.current++;
	searchEvent(searchVal.value);
});

/**
 * @description 搜索音乐列表数据
 * @param val 搜索值
 * */
const searchEvent = async (val: string) => {
	searchVal.value = val;
	const res = await searchMusicListApi(val, page.current, page.size);
	if (!res.length) {
		page.current--;
		return uni.$u.toast("没有更多歌曲");
	}
	searchList.value = [
		...searchList.value,
		...res.map((item) => ({
			id: item.id,
			name: item.name,
			title: item.al.name,
			url: item.al.picUrl,
			authors: item.ar,
			subs: item.alia,
		})),
	];
};

/**
 * @description 跳转详情页面
 * @param temp 音乐数据
 * */
const jumpPageFn = (temp: ListVo) => {
	uni.navigateTo({
		url: `/pages/pages-recreation/music/player/Index?songId=${temp.id}`,
	});
};
</script>

<style lang="scss" scoped></style>
