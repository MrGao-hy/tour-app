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
			<up-avatar :src="`${env.baseUrl}${item.userInfo.avatar}`"></up-avatar>
		</view>

		<!-- 右边数据 -->
		<view class="right">
			<view class="top">
				<view class="name">
					{{ item.userInfo.userName }}
					<view
						class="sex"
						:style="{
							background: item.userInfo.sex === '0' ? '#F07471' : '#5FADD5',
						}"
					>
						<up-icon
							:name="
								item.userInfo.sex === '0'
									? 'woman'
									: item.userInfo.sex === '1'
									? 'man'
									: ''
							"
							size="10"
							color="#fff"
							@click="getLike(index)"
						></up-icon>
					</view>
				</view>
				<view class="like" :class="{ highlight: item.isLike }">
					<view class="num">{{ item.likeNum }}</view>
					<up-icon
						:name="!item?.isLike ? 'thumb-up' : 'thumb-up-fill'"
						:size="30"
						color="#9a9a9a"
						@click="getLike(index)"
					></up-icon>
				</view>
			</view>
			<view class="content">
				<rich-text :nodes="item.comment.replace(/\\n/g, '<br>')"></rich-text>
			</view>
			<up-rate
				v-model="item.mark"
				size="16"
				readonly
				activeColor="#F6B204"
			></up-rate>
			<!--			<view class="reply-box">-->
			<!--				<view-->
			<!--					class="item"-->
			<!--					v-for="(item, index) in item.replyList"-->
			<!--					:key="item.index"-->
			<!--				>-->
			<!--					<view class="username">{{ item.userInfo.userName }}111</view>-->
			<!--					<view class="text">-->
			<!--						&lt;!&ndash;							<rich-text :nodes="item.contentStr"></rich-text>&ndash;&gt;-->
			<!--						<rich-text :nodes="nodes"></rich-text>-->
			<!--					</view>-->
			<!--				</view>-->
			<!--				<view-->
			<!--					class="all-reply"-->
			<!--					@tap="toAllReply"-->
			<!--					v-if="item.replyList != undefined"-->
			<!--				>-->
			<!--					共{{ 0 }}条回复-->
			<!--					<up-icon class="more" name="arrow-right" :size="26"></up-icon>-->
			<!--				</view>-->
			<!--			</view>-->
			<view class="bottom">
				<view class="bottom__left">
					{{ formatTime(item.createTime) }}
					<view class="reply">回复</view>
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

	<up-gap height="40" bgColor="#FFFFFF"></up-gap>

	<up-popup
		:show="showMenu"
		closeable
		round="20"
		bgColor="#f3f3f3"
		:safeAreaInsetBottom="false"
		:customStyle="{
			width: '60vw',
			padding: '80rpx 40rpx 40rpx',
		}"
		@close="showMenu = false"
	>
		<view class="menu">
			<view
				class="menu-row"
				v-for="item in actionMenu"
				@tap="onClickMenuFn(item.key)"
				:key="item.key"
			>
				<view class="menu-row__left" :style="{ background: item.color }">
					<up-icon :name="item.icon" color="#FFF"></up-icon>
				</view>
				<view class="menu-row__right">{{ item.label }}</view>
			</view>
		</view>
	</up-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { CommentType } from "@/typing";
import { formatTime } from "@/utils/utils";
import env from "@/config/env";
import { useCommentStore } from "@/store";
import { storeToRefs } from "pinia";

const commentStore = useCommentStore();
const { commentList, selectComment } = storeToRefs(commentStore);
const showMenu = ref(false);
const actionMenu = reactive([
	{
		key: 1,
		icon: "trash-fill",
		color: "#fa3534",
		label: "删除该评论",
	},
	{
		key: 2,
		icon: "cut",
		color: "#19be6b",
		label: "复制该评论",
	},
]);

// 跳转到全部回复
const toAllReply = () => {
	uni.navigateTo({
		url: "/pages/template/comment/reply",
	});
};
// 点赞
const getLike = (index: number) => {
	commentStore.clickLike(index);
};

const openActionMenuFn = (temp: CommentType) => {
	commentStore.selectCommentFn(temp);
	showMenu.value = true;
};

/**
 * 点击调整详情
 * */
const onClickMenuFn = (type: number) => {
	commentStore.onClickMenu(type);
	showMenu.value = false;
};
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 20rpx;

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
				.sex {
					transform: rotate(45deg);
					width: 20rpx;
					height: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 10rpx;
					.u-icon {
						transform: rotate(-45deg);
					}
				}
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
				color: #5677fc;
				.num {
					color: #5677fc;
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
				padding: 20rpx;
				display: flex;
				color: #5677fc;
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
			color: #9a9a9a;
			&__left {
				display: flex;
				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
			&__right {
			}
		}
	}
}

/*操作菜单栏*/
.menu {
	background: white;
	padding: 20rpx;
	border-radius: 20rpx;
	&-row {
		display: flex;
		align-items: center;
		&__left {
			width: 50rpx;
			height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		&__right {
			padding: 20rpx 0;
			flex: 1;
			border-bottom: 1rpx solid rgba(0, 26, 188, 0.15);
		}
	}
}
</style>
