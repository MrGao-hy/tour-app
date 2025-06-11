<template>
	<!-- active修复视频悬浮层消失和点击的问题 -->
	<view
		class="video-side-right"
		:class="{ active: currentItem.aweme_id === item.aweme_id }"
	>
		<view class="action-item action-item-user">
			<image class="shop-logo" :src="item.author.avatar_thumb.url_list[0]" />
			<view class="action-btn">
				<text class="iconfont">+</text>
			</view>
			<text class="action-item-text"></text>
		</view>

		<view class="action-item" v-for="control in leftControl" :key="control.key">
			<view
				:class="['iconfont', `icon-${control.icon}`]"
				@click="control.actions(item)"
			></view>
			<text class="action-item-text">{{ item.statistics[control.field] }}</text>
		</view>

		<!--  音频 -->
		<view :class="['music', { active: true }]">
			<image class="music-bg" :src="item.music.cover_hd.url_list[0]"></image>
		</view>
	</view>
	<!-- active修复视频悬浮层消失和点击的问题 -->
	<view
		class="video-bottom-area"
		:class="{ active: currentItem.aweme_id === item.aweme_id }"
	>
		<view class="shop-name"> @{{ item.author.nickname }} </view>
		<view class="shop-card">{{ item.desc }}</view>
	</view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { TikTokType } from "@/typing";

interface IProps {
	item: TikTokType;
	currentItem: TikTokType;
}
const props = withDefaults(defineProps<IProps>(), {});
const leftControl = reactive([
	{
		key: 1,
		field: "digg_count",
		icon: "dianzan",
	},
	{
		key: 2,
		field: "comment_count",
		icon: "pinlun",
	},
	{
		key: 3,
		field: "collect_count",
		icon: "shoucang",
	},
	{
		key: 4,
		field: "share_count",
		icon: "douyin-fenxiang",
		actions: (data: TikTokType) => {
			uni.setClipboardData({
				data: data.share_info.share_link_desc + data.share_info.share_url,
			});
		},
	},
]);
</script>

<style lang="scss" scoped>
$zIndex: 999;

.video-layer {
	position: absolute;
	right: 12px;
	bottom: 120px;
	color: #fff;
}

.video-bottom-area {
	position: absolute;
	left: 20px;
	bottom: 30px;
	opacity: 0;
	transition: all 250ms;
	z-index: 0;

	&.active {
		opacity: 1;
		z-index: $zIndex;
		transition-delay: 200ms;
	}

	.shop-name {
		color: #fff;
		margin-bottom: 6px;
	}

	.shop-card {
		max-width: 260px;
		color: white;
	}
}

.video-side-right {
	position: absolute;
	right: 12px;
	bottom: 30px;
	color: #fff;
	opacity: 0;
	transition: all 250ms;
	z-index: 0;

	&.active {
		opacity: 1;
		z-index: $zIndex;
		transition-delay: 200ms;
	}

	.action-item {
		position: relative;
		margin-bottom: 20px;
		text-align: center;

		.shop-logo {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
		}

		.iconfont {
			display: block;
			font-size: 28px;
		}

		.action-item-text {
			display: block;
			font-size: 12px;
			margin-top: $gxh-border-margin-padding-sm;
		}

		.action-btn {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -6px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #f60;

			.iconfont {
				font-size: 16px;
			}
		}
	}

	.music {
		width: 50px;
		height: 50px;

		&.active {
			animation: spin 6s linear infinite;

			@keyframes spin {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
		}
		&-bg {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.action-item-user {
		margin-bottom: 30px;
	}
}
</style>
