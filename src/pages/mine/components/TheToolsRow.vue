<template>
	<view class="tools">
		<template v-for="(oneItem, i) in menus" :key="i">
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
import { config } from "@/config";

interface MenuType {
	label: string;
	icon: string;
	url: string;
}
interface IProps {
	menus: MenuType[];
}
const props = withDefaults(defineProps<IProps>(), {});
</script>

<style lang="scss" scoped>
.tools {
	box-shadow: $gxh-box-shadow;
	border-radius: $gxh-border-radius-base;
	padding: $gxh-border-margin-padding-base;
	margin-bottom: $gxh-border-margin-padding-lg;

	&-col {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: $gxh-border-margin-padding-base 0;
		border-bottom: $gxh-border-line;
	}

	&-left {
		display: flex;
		align-items: center;
		.t-icon {
			width: $gxh-img-size-sm;
			height: $gxh-img-size-sm;
			margin-right: $gxh-border-margin-padding-base;
		}
	}
}
</style>
