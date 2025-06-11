<template>
	<up-navbar
		title="抖音"
		bgColor="transparent"
		:titleStyle="{ color: 'white' }"
		leftIconColor="#ffffff"
		@rightClick="rightClick"
		:autoBack="true"
	>
	</up-navbar>
	<the-tik-tok
		ref="mTikTokRef"
		:video-list="state.videoList"
		@loadMore="loadMore"
		@change="change"
		@error="errorFn"
	>
		<template #default="{ item }">
			<the-video-slide
				:item="item"
				:current-item="state.cutVideo"
			></the-video-slide>
		</template>
	</the-tik-tok>
</template>

<script setup lang="ts">
import lists from "../../utils/data_1.json";
// import lists from "../../utils/videoData.json";
import { onMounted, reactive, ref } from "vue";
import TheTikTok from "@/pages/pages-recreation/video/player/components/TheTikTok.vue";
import TheVideoSlide from "@/pages/pages-recreation/video/player/components/TheVideoSlide.vue";
import { TikTokType } from "@/typing";

const mTikTokRef = ref<InstanceType<typeof TheTikTok>>();

const state = reactive({
	cutVideo: {} as TikTokType,
	videoList: lists as any[],
});

onMounted(() => {
	// const arr = JSON.parse(lists as string);
	const a = lists.map((item) => {
		const obj = {
			aweme_id: item.aweme_id,
			desc: item.desc,
			author: {
				uid: item.author.uid,
				nickname: item.author.nickname,
				avatar_thumb: {
					url_list: item.author.avatar_thumb.url_list,
					width: item.author.avatar_thumb.width,
					height: item.author.avatar_thumb.height,
				},
			},
			music: {
				id: item.music.id,
				title: item.music.title,
				author: item.music.author,
				album: item.music.album,
				cover_hd: {
					uri: item.music.cover_hd.uri,
					url_list: item.music.cover_hd.url_list,
					width: item.music.cover_hd.width,
					height: item.music.cover_hd.height,
				},
				play_url: {
					uri: item.music.play_url.uri,
					url_list: item.music.play_url.url_list,
					width: item.music.play_url.width,
					height: item.music.play_url.height,
					url_key: item.music.play_url.url_key,
				},
			},
			video: {
				play_addr: {
					uri: item.video.play_addr.uri,
					url_list: item.video.play_addr.url_list,
					width: item.video.play_addr.width,
					height: item.video.play_addr.height,
					data_size: item.video.play_addr.data_size,
				},
				cover: {
					uri: item.video.cover.uri,
					url_list: item.video.cover.url_list,
				},
			},
			share_info: {
				share_link_desc: item.share_info.share_link_desc,
				share_url: item.share_info.share_url,
			},
			statistics: {
				admire_count: item.statistics.admire_count,
				comment_count: item.statistics.comment_count,
				digg_count: item.statistics.digg_count,
				collect_count: item.statistics.collect_count,
				play_count: item.statistics.play_count,
				share_count: item.statistics.share_count,
			},
		};

		return obj;
	});
});

const loadMore = () => {
	// 触发加载更多
	console.log("加载更多");
};

const change = (e: any) => {
	state.cutVideo = e.detail;
	console.log("🚀 ~ file: index.vue:53 ~ change ~ data:", e);
};

const errorFn = (e) => {
	console.log(e);
};
</script>

<style lang="scss" scoped>
.a {
	color: transparent;
}
</style>
