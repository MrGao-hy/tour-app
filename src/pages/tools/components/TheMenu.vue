<template>
	<view class="fun-item">
		<u-scroll-list
			:indicator="indicator"
			indicatorColor="#fff0f0"
			indicatorActiveColor="#f56c6c"
		>
			<view class="scroll-list">
				<navigator
					v-for="(item, index) in menus"
					:key="index"
					:url="item.url"
					hover-class="none"
				>
					<view
						class="scroll-list__line__item"
						:class="[
							item.length > 5 && 'scroll-list__line__item--no-margin-right',
						]"
					>
						<view :class="['t-icon', `t-icon-${item.icon}`]"></view>
						<text
							class="scroll-list__line__item__text"
							:style="{ color: color }"
							>{{ item.title }}</text
						>
					</view>
				</navigator>
			</view>
		</u-scroll-list>
	</view>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from "vue";

interface IProps {
	indicator?: boolean;
	menus: Record<string, any>;
	color?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	indicator: false,
	menus: () => [],
	color: "#000000",
});
</script>

<style lang="scss" scoped>
.fun-item {
	overflow: hidden;
	:deep(.u-scroll-list__scroll-view__content) {
		width: 100%;
	}
	.scroll-list {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		background: #ffffff;
		padding: 20rpx;
		border-radius: $gxh-border-radius-base;
		&__line {
			display: flex;
			flex-direction: row;

			&__item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 50rpx;
				.t-icon {
					width: $gxh-img-size-base;
					height: $gxh-img-size-base;
				}
				.scroll-list__line__item__text {
					text-align: center;
					font-size: $gxh-font-size-base;
					margin-top: 20rpx;
				}
			}
		}
	}
}
</style>
