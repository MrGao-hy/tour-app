<template>
	<up-subsection
		:activeColor="config.themeColor"
		:list="[`最新评论(${newTotal})`, `热门评论(${hotTotal})`]"
		:current="current"
		@change="commentChangeFn"
	></up-subsection>

	<scroll-view class="comment-list" scroll-y @scrolltolower="scrollBottomFn">
		<the-music-comment :comment-list="comment.list"></the-music-comment>
	</scroll-view>
</template>

<script setup lang="ts">
import { config } from "@/config";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import TheMusicComment from "@/pages/pages-recreation/music/player/components/TheMusicComment.vue";
import { useSongCommentStore } from "@/store";
import { storeToRefs } from "pinia";

const songId = ref();
const current = ref<number>(0);
const newTotal = ref(0);
const hotTotal = ref(0);
const songCommentStore = useSongCommentStore();
const { comment, page } = storeToRefs(songCommentStore);

onLoad(async (options: any) => {
	songId.value = options.id;
	current.value = options.type;
	if (options.type) {
		await songCommentStore.getMusicHotCommentsFn(songId.value);
		hotTotal.value = comment.value.total;
	} else {
		await songCommentStore.getMusicNewCommentsFn(songId.value);
		newTotal.value = comment.value.total;
	}
});

/**
 * @description 触底加载更多评论
 * */
const scrollBottomFn = () => {
	page.value.current++;
	if (current.value) {
		songCommentStore.getMusicHotCommentsFn(songId.value);
	} else {
		songCommentStore.getMusicNewCommentsFn(songId.value);
	}
};

/**
 * @description 选择评论类型
 * */
const commentChangeFn = async (index: number) => {
	songCommentStore.setCurrentPage(1);
	songCommentStore.clearCommentsFn();
	current.value = index;
	if (index) {
		await songCommentStore.getMusicHotCommentsFn(songId.value);
		hotTotal.value = comment.value.total;
	} else {
		await songCommentStore.getMusicNewCommentsFn(songId.value);
		newTotal.value = comment.value.total;
	}
};
</script>

<style lang="scss" scoped>
.comment-list {
	height: calc(100% - 34px);
}
</style>
