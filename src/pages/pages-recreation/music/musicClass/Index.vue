<!--
  Author: 高先华
  Date: 2022-05-11 10:36:02
  LastEditTime: 2024-12-16 10:59:52
  Description: 星座页面
  FilePath: \diary\src\pages-recreation\music\musicClass\Index.vue
-->

<template>
	<view class="type">
		<the-box-class title="精品歌单分类" :list="classify"></the-box-class>
		<the-box-class title="热门歌单分类" :list="hotClass"></the-box-class>
		<the-box-class title="排行榜分类" :list="rankingClass"></the-box-class>
	</view>

	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
	getMusicClassApi,
	getMusicHotClassApi,
	getRankingClassApi,
} from "@/api";
import TheBoxClass from "./components/TheBoxClass.vue";
import {
	onNavigationBarButtonTap,
	onNavigationBarSearchInputClicked,
} from "@dcloudio/uni-app";

const hotClass = ref();
const classify = ref();
const rankingClass = ref();

onMounted(async () => {
	hotClass.value = await getMusicHotClassApi();
	classify.value = await getMusicClassApi();
	rankingClass.value = await getRankingClassApi();
});
/**
 * @description 点击搜索栏跳转搜索页面
 * */
onNavigationBarSearchInputClicked(() => {
	uni.navigateTo({
		url: "/pages/pages-recreation/music/search/Index",
	});
});
onNavigationBarButtonTap((e) => {
	if (e.index === 0) {
		// 这里可以执行你想要的操作
		console.log("导航栏按钮被点击");
	}
});
</script>

<style lang="scss" scoped>
.type {
	height: 100%;
	background: white;
}
</style>
