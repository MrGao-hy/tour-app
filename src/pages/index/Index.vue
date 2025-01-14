<template>
	<view class="recreation">
		<up-swiper :list="swiperList" height="200" circular></up-swiper>
		<the-menu color="rgba(0,0,0,0.5)" :menus="menus"></the-menu>
	</view>
	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script lang="ts" setup>
import TheMenu from "@/pages/index/components/TheMenu.vue";
import { onMounted, reactive, ref } from "vue";
import { getSwiperListApi } from "@/api";

const menus = reactive([
	{
		title: "音乐",
		icon: "yinle",
		url: "/pages/pages-recreation/music/musicClass/Index",
	},
	{
		title: "日记本",
		icon: "rili",
		url: "/pages/pages-task/diary/calendar/Index",
	},
	{
		title: "礼品",
		icon: "goods",
		url: "/pages/pages-task/goods/goodsList/Index",
	},
]);
const swiperList = ref([""]);

onMounted(async () => {
	swiperList.value = await getSwiperListApi();
});
</script>

<style lang="scss" scoped>
.recreation {
	padding: $gxh-border-margin-padding-base;
}
</style>
