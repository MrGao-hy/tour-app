<template>
	<view class="tools">
		<template v-for="(oneItem, i) in ToolsMenu" :key="i">
			<navigator :url="oneItem.url" hover-class="none">
				<view class="tools-col">
					<view class="tools-left">
						<view :class="`t-icon t-icon-${oneItem.icon}`"></view>
						<view class="grid-text">{{ oneItem.label }}</view>
					</view>
					<up-icon name="arrow-right" :color="config.hint"></up-icon>
				</view>
			</navigator>
		</template>
	</view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { config } from "@/config";

const ToolsMenu = reactive([
	{
		label: "豆包",
		icon: "doubao",
		url: "/pages/pages-function/chatGPT/Index?webUrl=https://www.doubao.com/chat/&title=豆包",
	},
	{
		label: "文心一言",
		icon: "doubao",
		url: "/pages/pages-function/chatGPT/Index?webUrl=https://yiyan.baidu.com/&title=文心一言",
	},
	{
		label: "联系我们",
		icon: "lianxiwomen",
		url: "/pages/pages-function/relation/Index",
	},
]);
</script>

<style lang="scss" scoped>
.tools {
	box-shadow: $gxh-box-shadow;
	border-radius: 20rpx;
	padding: 20rpx 30rpx;
	margin-bottom: 60rpx;

	&-col {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: $gxh-border-line;
	}

	&-left {
		display: flex;
		align-items: center;
		.t-icon {
			width: 45rpx;
			height: 45rpx;
			margin-right: $gxh-border-margin-padding-base;
		}
	}
}
</style>
