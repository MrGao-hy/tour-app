<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 音乐列表排行榜
  FilePath: \diary\src\pages-recreation\music\songList\Index.vue
  -->

<template>
	<view class="music-list">
		<scroll-view>
			<view
				class="music-list__box"
				v-for="(item, index) in songList"
				:key="item.id"
				@tap="toSongMusicFn(item.id)"
			>
				<up-lazy-load
					class="music-list__box-img"
					border-radius="10"
					height="60"
					:image="item.al.picUrl"
					:loading-img="config.emptyImage"
				></up-lazy-load>
				<view class="music-list__box-main">
					<view class="music-list__box-main__title">
						{{ item.name }}
						<text
							class="music-list__box-main__title-author"
							v-if="item.ar.length"
							>({{ authorFormat(item.ar) }})</text
						>
					</view>
					<view class="music-list__box-main__content">
						<template
							v-if="item.alia?.length"
							v-for="(artItem, artIndex) in item.alia"
							:key="artItem.id"
						>
							{{ artItem }}
							<text v-if="artIndex !== item.alia.length - 1">/</text>
							-
						</template>
						{{ item.al.name }}
					</view>
				</view>

				<up-icon
					:name="
						index === playerStore.playerIndex && !playerStatus.paused
							? 'pause'
							: 'play-right-fill'
					"
					size="33"
					stop
					@click="
						playerStatusChange(index === playerStore.playerIndex, item.id)
					"
				></up-icon>
			</view>
		</scroll-view>
	</view>

	<up-back-top :scrollTop="scrollTop"></up-back-top>
	<!--加载更多样式-->
	<up-loadmore :status="load"></up-loadmore>
	<!--没有网络的状态-->
	<up-no-network></up-no-network>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from "vue";
import { onLoad, onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { querySongListApi } from "@/api";
import { config } from "@/config";
import { usePlayer } from "@/store";
import { storeToRefs } from "pinia";

const playerStore = usePlayer();
const { songList, playerStatus } = storeToRefs(playerStore);
const songId = ref();
const current = ref(1);
const load = ref("loadmore");
const scrollTop = ref(0);
const authorFormat = computed(() => {
	return (list: any) => {
		let str = "";
		list.forEach((item: any, index: number) => {
			if (index != list.length - 1) {
				str += item.name + "/";
			} else {
				str += item.name;
			}
		});
		return str;
	};
});

onLoad((options: any) => {
	const { id } = options;
	if (id) {
		songId.value = id;
		// 获取歌曲列表
		playerStore.getMusicList(id, current.value);
	}
});
onReachBottom(() => {
	load.value = "loading";
	current.value++;
	playerStore
		.getMusicList(songId.value, current.value, load.value)
		.catch((err) => {
			current.value--;
			load.value = "nomore";
		});
});
onUnmounted(() => {
	songList.value.length = 0;
});
onPageScroll((e) => {
	scrollTop.value = e.scrollTop;
});

/**
 * @description 暂停/开始
 * @param isCurrent 是否是当前值
 * @param songId 歌曲id
 * */
const playerStatusChange = (isCurrent: boolean, songId: number) => {
	if (isCurrent) {
		if (playerStore.playerStatus.paused) {
			// 播放函数
			playerStore.setPlayerPlay();
		} else {
			// 暂停函数
			playerStore.setPlayerPause();
		}
	} else {
		// 获取歌曲
		playerStore.getPlayer(songId).then((res) => {
			uni.$u.toast(res);
			setTimeout(() => {
				uni.$u.toast("两秒后自动为你跳转下一首");

				setTimeout(() => {
					playerStore.setPlayerNext();
				}, 2000);
			}, 1000);
		});
	}
};

/**
 * @description 跳转到播放界面
 * @param songId 歌曲id
 * */
const toSongMusicFn = (songId: string) => {
	uni.navigateTo({
		url: `/pages/pages-recreation/music/player/Index?songId=${songId}`,
	});
};
</script>

<style lang="scss" scoped>
.music-list {
	//padding: $gxh-border-margin-padding-base;
	&__box {
		display: flex;
		background-color: $gxh-text-color-inverse;
		padding: $gxh-border-margin-padding-base;
		margin: $gxh-border-margin-padding-base;
		border-radius: $gxh-border-radius-base;
		box-shadow: $gxh-box-shadow;
		//width: 100%;
		&-img {
			width: $gxh-img-size-lg;
			height: $gxh-img-size-lg;
			border-radius: $gxh-border-radius-base;
			background-color: $gxh-image-bg-color;
			margin-right: $gxh-border-margin-padding-sm;
		}
		&-main {
			flex: 1;
			&__title {
				font-size: 40rpx;
				width: 100%;
				@include line-feed(1);
				&-author {
					color: $gxh-color-hint;
					font-size: $gxh-font-size-base;
				}
			}
			&__content {
				font-size: $gxh-font-size-base;
				color: $gxh-color-hint;
			}
		}
	}
}
</style>
