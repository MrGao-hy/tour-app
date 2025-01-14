<template>
	<up-empty
		:show="!commentList?.length"
		mode="message"
		text="期待你的评价"
		marginTop="40"
	>
	</up-empty>
	<view class="comment" v-for="(item, index) in commentList" :key="item.id">
		<!-- 左边数据 -->
		<view class="left">
			<the-avatar :avatar="item.userInfo.avatar"></the-avatar>
		</view>

		<!-- 右边数据 -->
		<view class="right">
			<view class="top">
				<view class="name">
					{{ item.userInfo.userName }}
					<the-sex-dom :sex="item.userInfo.sex"></the-sex-dom>
				</view>
				<view class="like" :class="{ highlight: item.isLike }">
					<view class="num">{{ item.likeNum }}</view>
					<up-icon
						:name="!item?.isLike ? 'thumb-up' : 'thumb-up-fill'"
						:size="30"
						:color="!item?.isLike ? '#9a9a9a' : config.themeColor"
						@click="getLike(index)"
					></up-icon>
				</view>
			</view>
			<view class="content">
				<rich-text :nodes="item.comment.replace(/\n/g, '<br>')"></rich-text>
			</view>
			<up-rate
				v-model="item.mark"
				size="16"
				readonly
				:activeIcon="
					Number(item.mark) == 3
						? config.rate.ordinary
						: Number(item.mark) > 3
						? config.rate.happy
						: config.rate.grieved
				"
				:inactiveIcon="config.rate.default"
			></up-rate>
			<view class="reply-box">
				<!--							<view-->
				<!--								class="item"-->
				<!--								v-for="(item, mount) in item.replyList"-->
				<!--								:key="item.mount"-->
				<!--							>-->
				<!--								<view class="username">{{ item.userInfo.userName }}111</view>-->
				<!--								<view class="text">-->
				<!--									&lt;!&ndash;							<rich-text :nodes="item.contentStr"></rich-text>&ndash;&gt;-->
				<!--									<rich-text :nodes="nodes"></rich-text>-->
				<!--								</view>-->
				<!--							</view>-->
				<view v-if="item.allReply" class="all-reply" @tap="toAllReply(item)">
					共{{ item.allReply }}条回复
					<up-icon class="more" name="arrow-right" :size="15"></up-icon>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom__left">
					{{ formatTimeToString(item.createTime) }}&ensp;·&ensp;{{
						item.province
					}}
					<view class="reply-btn" @tap.stop="replyFn(item)">回复</view>
				</view>
				<view class="bottom__right">
					<up-icon
						name="more-dot-fill"
						@click="openActionMenuFn(item)"
					></up-icon>
				</view>
			</view>
		</view>
	</view>
	<up-gap height="40"></up-gap>

	<view v-if="focus" class="reply-ipt">
		<up-input
			v-model="replyVal"
			:focus="focus"
			:adjustPosition="false"
			@blur="onBlur"
		></up-input>
		<up-button
			text="发送"
			:color="config.themeColor"
			@mousedown.prevent="replyMarkFn"
		></up-button>
	</view>

	<the-function-col
		:show="showMenu"
		:actionMenu="actionMenu"
		@handle-close="showMenu = false"
		@handle-click="onClickMenuFn"
	></the-function-col>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { CommentType, ReplyType } from "@/typing";
import { formatTimeToString } from "@/utils/utils";
import { useCommentStore } from "@/store";
import { storeToRefs } from "pinia";
import { config } from "@/config";
import { replyMarkApi } from "@/api";
import TheFunctionCol, { ActionMenu } from "@components/TheFunctionCol.vue";
import TheSexDom from "@components/TheSexDom.vue";
import TheAvatar from "@components/TheAvatar.vue";

const commentStore = useCommentStore();
const { commentList, selectComment } = storeToRefs(commentStore);
const showMenu = ref(false);
const replyVal = ref("");
const focus = ref(false);
const actionMenu: ActionMenu[] = reactive([
	{
		key: 1,
		icon: "trash-fill",
		iconColor: "#FFF",
		iconBgColor: "#fa3534",
		label: "删除该评论",
	},
	{
		key: 2,
		icon: "cut",
		iconColor: "#FFF",
		iconBgColor: "#19be6b",
		label: "复制该评论",
	},
]);

/**
 * @description 跳转到全部回复
 * @param temp 评论详情
 * */
const toAllReply = (temp: CommentType) => {
	commentStore.toReplyPage(temp);
};
/**
 * @description 点赞
 * @param index 索引
 * */
const getLike = (index: number) => {
	commentStore.clickLike(index);
};

/**
 * @description 打开弹窗
 * @param temp 评论详情
 * */
const openActionMenuFn = (temp: CommentType) => {
	commentStore.selectCommentFn(temp);
	showMenu.value = true;
};

/**
 * @description 点击打开评论操作功能
 * @param temp 操作功能
 * */
const onClickMenuFn = (temp: ActionMenu) => {
	commentStore.onClickMenu(temp.key);
	showMenu.value = false;
};

/**
 * @description 打开回复评论
 * @param temp 评论详情
 * */
const replyFn = (temp: CommentType) => {
	focus.value = true;
	commentStore.selectCommentFn(temp);
};

/**
 * @description 回复消息
 * */
const replyMarkFn = async () => {
	uni.request({
		url: "https://api.vvhan.com/api/ipInfo",
		async success(result: any) {
			const { data } = result;
			await replyMarkApi({
				markId: selectComment.value.id,
				content: replyVal.value,
				city: data.info.city.replace("市", ""),
				province: data.info.prov.replace("省", ""),
			} as ReplyType);
			commentList.value.find((item) => {
				if (
					selectComment.value.allReply &&
					selectComment.value.id === item.id
				) {
					selectComment.value.allReply++;
				}
			});
			replyVal.value = "";
			focus.value = false;
		},
	});
};

/**
 * @description 失去焦点
 * */
const onBlur = () => {
	focus.value = false;
};
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
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				margin-top: $gxh-border-margin-padding-lg;
				padding: $gxh-border-margin-padding-base;
				display: flex;
				color: $gxh-text-color-grey;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
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

/*回复输入框*/
.reply-ipt {
	display: flex;
	z-index: 999999;
	width: 100%;
	padding: 20rpx;
	left: 0;
	position: fixed;
	bottom: 0;
	background: white;
	:deep(.u-button) {
		width: 140rpx;
		margin-left: 40rpx;
	}
}
</style>
