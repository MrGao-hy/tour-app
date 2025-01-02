<template>
	<view class="search">
		<view class="history" v-if="!searchList?.length">
			<view class="history-style">
				<span class="font-12 font-b">历史搜索</span>
				<up-icon
					name="trash"
					color="#808080"
					size="20"
					:bold="true"
					@click="deleteFn"
				>
				</up-icon>
			</view>
			<!-- 历史记录 -->
			<view class="tag">
				<template v-for="(item, index) in historyList" :key="index">
					<view class="tag-margin">
						<up-tag
							@click="searchEvent(item)"
							:text="item"
							bgColor="#EBEBEB"
							size="mini"
							borderColor="transparent"
							color="black"
						>
						</up-tag>
					</view>
				</template>
			</view>
		</view>

		<!-- 搜索数据列表 -->
		<up-waterfall v-model="searchList" ref="uWaterfallRef">
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
import { onMounted, reactive, ref } from "vue";
import {
	onNavigationBarButtonTap,
	onNavigationBarSearchInputChanged,
	onPageScroll,
} from "@dcloudio/uni-app";
import { searchMusicListApi } from "@/api";
import TheMusicDom, {
	ListVo,
} from "@/pages/pages-recreation/music/search/components/TheMusicDom.vue";

const searchVal = ref("");
const searchList = ref();
const historyList: string[] = reactive([]);
const scrollTop = ref(0);
const uWaterfallRef = ref();

onMounted(() => {
	historyList.push(...JSON.parse(uni.getStorageSync("history")));
});
/**
 * @description 搜索栏输入值
 * */
onNavigationBarSearchInputChanged((e) => {
	searchVal.value = e.text;
});
/**
 * @description 点击搜索搜索音乐
 * */
onNavigationBarButtonTap((e) => {
	if (e.index === 0) {
		if (!historyList.includes(searchVal.value)) {
			if (historyList.length >= 20) {
				historyList.pop();
			}
			historyList.unshift(searchVal.value);
			uni.setStorageSync("history", JSON.stringify(historyList));
		}
		searchEvent(searchVal.value);
	}
});
onPageScroll((e) => {
	scrollTop.value = e.scrollTop;
});

/**
 * @description 搜索音乐列表数据
 * @param val 搜索值
 * */
const searchEvent = async (val: string) => {
	const res = await searchMusicListApi(val);
	// uWaterfallRef.value.clear();
	searchList.value = res.map((item) => ({
		id: item.id,
		name: item.name,
		url: item.artists[0].img1v1Url,
		author: item.artists[0].name,
		sub: item.album.name,
	}));
};

/**
 * @description 删除历史搜索记录
 * */
const deleteFn = () => {
	historyList.length = 0;
	uni.removeStorageSync("history");
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

<style lang="scss" scoped>
.search {
	height: 100vh;
	background: $gxh-bg-color;
}
.history {
	padding: $gxh-border-margin-padding-sm;
	&-style {
		display: flex;
		justify-content: space-between;
		color: $gxh-text-color-placeholder;
	}
	.tag {
		display: flex;
		flex-wrap: wrap;
		margin-top: $gxh-border-margin-padding-lg;

		&-margin {
			margin-right: $gxh-border-margin-padding-base;
			margin-bottom: $gxh-border-margin-padding-base;
		}
	}
}
</style>
