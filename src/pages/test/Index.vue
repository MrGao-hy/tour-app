<template>
	<view class="recreation">
		<the-menu color="rgba(0,0,0,0.5)" :menus="menus"></the-menu>
	</view>
</template>

<script lang="ts" setup>
import TheMenu from "@/pages/test/components/TheMenu.vue";
import { reactive } from "vue";

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
]);
const toMusicPage = () => {
	uni.navigateTo({
		url: "/pages/pages-recreation/music/musicClass/Index",
	});
};
</script>

<style lang="scss" scoped>
.recreation {
	padding: $gxh-border-margin-padding-base;
}
</style>
