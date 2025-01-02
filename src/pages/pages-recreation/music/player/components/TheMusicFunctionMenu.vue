<template>
	<view class="function">
		<template v-for="item in funMenu" :key="item.key">
			<up-icon
				:name="item.icon"
				size="30"
				color="#FFFFFF"
				@click="clickMenuFn(item.key)"
			></up-icon>
		</template>
	</view>

	<up-popup
		:show="show"
		round="15"
		:customStyle="{
			padding: '40rpx',
		}"
		closeOnClickOverlay
		@close="closeFn"
	>
		<view class="comment-header">
			<view class="comment-header__left">
				<up-subsection
					:list="['最新评论', '热门评论']"
					:activeColor="config.themeColor"
					:current="currentType"
					@change="commentChangeFn"
				></up-subsection>
			</view>
			<view class="comment-header__right">
				<up-icon
					name="arrow-right"
					:label="`全部${formatNumber(comment.total)}条`"
					labelPos="left"
					labelColor="#999"
					color="#999"
					@click="toCommentPageFn"
				></up-icon>
			</view>
		</view>
		<scroll-view
			class="comment-content"
			scroll-y
			@scrolltolower="scrollBottomFn"
		>
			<the-music-comment :comment-list="comment.list"></the-music-comment>
		</scroll-view>
	</up-popup>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import TheMusicComment from "@/pages/pages-recreation/music/player/components/TheMusicComment.vue";
import { config } from "@/config";
import { usePlayer, useSongCommentStore } from "@/store";
import { formatNumber } from "@/utils/utils";
import { storeToRefs } from "pinia";

interface IProps {
	songId: string;
}
const props = withDefaults(defineProps<IProps>(), {
	songId: "",
});
const playerStore = usePlayer();
const songCommentStore = useSongCommentStore();
const { comment, page } = storeToRefs(songCommentStore);

const mute = computed(() => {
	return isMute.value ? "volume-off" : "volume";
});
const funMenu = reactive([
	{
		key: 1,
		icon: "star",
	},
	{
		key: 2,
		icon: "download",
	},
	{
		key: 3,
		icon: "chat",
	},
	{
		key: 4,
		icon: mute,
	},
]);
const show = ref<boolean>(false);
const currentType = ref(0);
const isMute = ref<boolean>(false);

/**
 * @description 点击功能栏操作
 * @param key 点击值
 * */
const clickMenuFn = (key: number) => {
	switch (key) {
		case 3:
			show.value = true;
			songCommentStore.getMusicNewCommentsFn(props.songId);
			break;
		case 4:
			isMute.value = !isMute.value;
			if (isMute.value) {
				playerStore.controlVolume(0);
			} else {
				playerStore.controlVolume(1);
			}

			break;
		default:
			break;
	}
};

/**
 * @description 触底加载更多评论
 * */
const scrollBottomFn = () => {
	page.value.current++;
	if (currentType.value) {
		songCommentStore.getMusicHotCommentsFn(props.songId);
	} else {
		songCommentStore.getMusicNewCommentsFn(props.songId);
	}
};

/**
 * @description 关闭评论弹窗
 * */
const closeFn = () => {
	show.value = false;
	songCommentStore.clearCommentsFn();
};

/**
 * @description 选择评论类型
 * */
const commentChangeFn = (index: number) => {
	songCommentStore.setCurrentPage(1);
	songCommentStore.clearCommentsFn();
	currentType.value = index;
	if (index) {
		songCommentStore.getMusicHotCommentsFn(props.songId);
	} else {
		songCommentStore.getMusicNewCommentsFn(props.songId);
	}
};

/**
 * @description 跳转评论界面
 * */
const toCommentPageFn = () => {
	uni.navigateTo({
		url: `/pages/pages-recreation/music/commentList/Index?id=${props.songId}&type=${currentType.value}`,
	});
};
</script>

<style lang="scss" scoped>
.function {
	display: flex;
	justify-content: space-between;
	padding: 0 60rpx;
}
.comment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: $gxh-border-margin-padding-base;
	&__left {
		width: 120px;
	}
}
.comment-content {
	height: 1000rpx;
}
</style>
