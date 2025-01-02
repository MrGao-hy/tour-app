<template>
	<view class="comment" v-for="(item, index) in commentList" :key="item.id">
		<!-- 左边数据 -->
		<view class="left">
			<the-avatar :avatar="item.user.avatarUrl"></the-avatar>
		</view>

		<!-- 右边数据 -->
		<view class="right">
			<view class="top">
				<view class="name">
					<up-icon
						:name="item.user.vipRights?.associator?.iconUrl"
						width="50"
						:label="item.user.nickname"
						labelPos="left"
						labelColor="#000000"
					></up-icon>
				</view>
				<view class="like" :class="{ highlight: item.liked }">
					<view class="num">{{ formatNumber(item.likedCount) }}</view>
					<up-icon
						:name="!item?.isLike ? 'thumb-up' : 'thumb-up-fill'"
						:size="30"
						:color="!item?.isLike ? '#9a9a9a' : config.themeColor"
						@click="getLike(index)"
					></up-icon>
				</view>
			</view>
			<view class="content">
				{{ item.content }}
			</view>
			<!-- 底部数据 -->
			<view class="bottom">
				<view class="bottom__left">
					{{ item?.timeStr }}&ensp;·&ensp;{{ item?.ipLocation.location }}
					<!--					<view class="reply-btn" @tap.stop="replyFn(item)">回复</view>-->
				</view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { config } from "@/config";
import TheAvatar from "@components/TheAvatar.vue";
import { formatNumber, formatTimeToString } from "@/utils/utils";

interface IProps {
	commentList: any[];
}
const props = withDefaults(defineProps<IProps>(), {
	commentList: () => [],
});
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 20rpx;
	background: white;

	.right {
		flex: 1;
		padding: 0 0 20rpx 20rpx;
		font-size: 30rpx;
		border-bottom: 1rpx solid rgba(0, 26, 188, 0.15);
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				font-weight: bold;
				display: flex;
				align-items: center;
				line-height: 30rpx;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				.num {
					color: $gxh-theme-color;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: $gxh-text-color-disable;
			&__left {
				display: flex;
				.reply-btn {
					margin-left: $gxh-border-margin-padding-lg;
					color: $gxh-color-success;
				}
			}
			&__right {
			}
		}
	}
}
</style>
