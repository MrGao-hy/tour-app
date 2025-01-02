<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 评论回复列表页面
  FilePath: \src\pages-mount\reply\Index.vue
-->
<template>
	<scroll-view class="wrap" scroll-y @scrolltolower="onScrollToLower">
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo">
						<the-avatar :avatar="selectComment.userInfo.avatar"></the-avatar>
					</view>
					<view class="user-info">
						<view class="name">
							{{ selectComment.userInfo.userName }}
							<the-sex-dom :sex="selectComment.userInfo.sex"></the-sex-dom>
						</view>
						<view class="date">{{
							formatTimeToString(selectComment.createTime)
						}}</view>
					</view>
				</view>
				<view class="right" :class="{ highlight: selectComment.isLike }">
					{{ selectComment.likeNum }}
					<up-icon
						:name="selectComment.isLike ? 'thumb-up-fill' : 'thumb-up'"
						class="like"
						:color="selectComment.isLike ? config.themeColor : '#9a9a9a'"
						:size="25"
					></up-icon>
				</view>
			</view>
			<view class="content">
				<rich-text
					:nodes="selectComment.comment.replace(/\n/g, '<br>')"
				></rich-text>
			</view>
			<up-rate
				v-model="selectComment.mark"
				size="16"
				readonly
				:activeIcon="
					Number(selectComment.mark) == 3
						? config.rate.ordinary
						: Number(selectComment.mark) > 3
						? config.rate.happy
						: config.rate.grieved
				"
				:inactiveIcon="config.rate.default"
			></up-rate>
		</view>
		<view class="all-reply">
			<view class="all-reply-top">
				<view class="all-reply-top__left">全部回复（{{ total }}）</view>
				<view class="all-reply-top__right">
					<up-subsection :list="topSort" :current="1"></up-subsection>
				</view>
			</view>
			<view class="item" v-for="item in commentList" :key="item.id">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-avatar">
								<the-avatar
									:avatar="item.userInfo.avatar"
									size="32"
								></the-avatar>
							</view>
							<view class="user-info">
								<view class="name">
									{{ item.userInfo.userName }}
									<the-sex-dom :sex="item.userInfo.sex"></the-sex-dom>
								</view>
								<view class="date"
									>{{ formatTimeToString(item.createTime) }}&ensp;*&ensp;{{
										item.province
									}}
								</view>
							</view>
						</view>
						<!--						<view class="right" :class="{ highlight: item.isLike }">-->
						<!--							<view class="num">{{ item.likeNum }}</view>-->
						<!--							<up-icon-->
						<!--								v-if="!item.isLike"-->
						<!--								name="thumb-up"-->
						<!--								class="like"-->
						<!--								:size="30"-->
						<!--								color="#9a9a9a"-->
						<!--								@click="getLike(index)"-->
						<!--							></up-icon>-->
						<!--							<up-icon-->
						<!--								v-if="item.isLike"-->
						<!--								name="thumb-up-fill"-->
						<!--								class="like"-->
						<!--								:size="30"-->
						<!--								@click="getLike(index)"-->
						<!--							></up-icon>-->
						<!--						</view>-->
					</view>
					<!--					<view class="reply" v-if="item.reply">-->
					<!--						<view class="username">{{ item.reply.name }}</view>-->
					<!--						<view class="text">{{ item.reply.contentStr }}</view>-->
					<!--					</view>-->
					<view class="content">
						<rich-text :nodes="item.content.replace(/\n/g, '<br>')"></rich-text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { queryReplyListApi } from "@/api";
import { onMounted, reactive, ref } from "vue";
import { ReplyType } from "@/typing";
import { formatTimeToString } from "@/utils/utils";
import { useCommentStore } from "@/store";
import { storeToRefs } from "pinia";
import env from "@/config/env";
import TheSexDom from "@components/TheSexDom.vue";
import { config } from "@/config";
import TheAvatar from "@components/TheAvatar.vue";

const CommentStore = useCommentStore();
const { selectComment } = storeToRefs(CommentStore);

const page = reactive({
	current: 1,
	size: config.pageSize,
});
const commentList = ref<ReplyType[]>([]);
const total = ref(0);
const topSort = reactive(["按热度", "按时间"]);

onMounted(() => {
	replyList();
});

/**
 * @description 滚动加载更多回复
 * */
const onScrollToLower = () => {
	page.current++;
	replyList();
};

/**
 * @description 获取回复列表
 * */
const replyList = async () => {
	const list = await queryReplyListApi(
		page.current,
		page.size,
		selectComment.value.id
	);
	if (!list.records.length) {
		page.current--;
		uni.$u.toast("没有更多评论了");
		return;
	}
	commentList.value = [...commentList.value, ...list.records];
	total.value = list.total;
};
</script>

<style lang="scss" scoped>
.wrap {
	height: 100%;
	background-color: #f2f2f2;
}
.comment {
	padding: 30rpx;
	background-color: #ffffff;
	.top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.left {
		display: flex;
		.heart-photo {
		}
		.user-info {
			margin-left: 10rpx;
			.name {
				font-weight: 500;
				font-size: 34rpx;
				margin-bottom: 4rpx;
				display: flex;
				align-items: center;
			}
			.date {
				font-size: 20rpx;
				color: $u-light-color;
			}
		}
	}
	/*评论内容*/
	.content {
		font-size: 28rpx;
		margin-bottom: $gxh-border-margin-padding-base;
	}
	.right {
		display: flex;
		align-items: center;
		color: #9a9a9a;
		.like {
			margin-left: 6rpx;
		}
		.num {
			font-size: 26rpx;
			color: #9a9a9a;
		}
	}
	.highlight {
		color: $gxh-theme-color;
		.num {
			color: $gxh-theme-color;
		}
	}
}
.all-reply {
	margin-top: 10rpx;
	padding-top: $gxh-border-margin-padding-base;
	background-color: #ffffff;
	.all-reply-top {
		margin: 0 $gxh-border-margin-padding-base;
		padding-left: $gxh-border-margin-padding-base;
		border-left: solid 4rpx $gxh-theme-color;
		font-size: 35rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item {
		border-bottom: solid 1rpx $u-border-color;
	}
	.reply {
		padding: 20rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 12rpx;
		margin: 10rpx 0;
		.username {
			font-size: 24rpx;
			color: #7a7a7a;
		}
	}
}
</style>
