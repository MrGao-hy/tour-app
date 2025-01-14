<!--
Author: 高先华
Date: 2022-05-11 10:36:02
LastEditTime: 2022-05-16 10:59:52
Description: 完整版播放器界面
FilePath: \uni-preset-vue-vite-ts\src\pages\player\mount.vue
-->
<template>
	<!--  <page-meta :page-style="mainStore.getPageMetaStyle" />-->

	<!--  <the-popup-artist />-->

	<!-- ↓ 播放器详情 -->
	<view class="detail-player">
		<!--              :style="{ opacity: backgroundLoad ? '1' : '0' }"  -->
		<image class="detail-player__bg-image" :src="bgImage" mode="aspectFill" />

		<view class="detail-player__bg-filter" />

		<!-- ↓ 主页内容 -->
		<view
			class="detail-player__main"
			:style="`background-image: url(${bgImage})`"
		>
			<!-- ↓ 导航栏 -->
			<view class="detail-player__main-nav">
				<view
					class="detail-player__main-nav__back"
					@tap.stop.prevent="backPageFn"
				/>
				<view class="detail-player__main-nav__info">
					<view class="detail-player__main-nav__title text-ellipsis-single">
						{{ songInfo.name }}
					</view>

					<view
						class="detail-player__main-nav__subTitle text-ellipsis-single"
						@tap.stop.prevent="toDetailArtist"
					>
						{{ songInfo.author }}
					</view>
				</view>
				<view class="detail-player__main-nav__search"></view>
			</view>

			<!-- ↓ 页面路由 -->
			<view class="detail-player__main-pages">
				<template v-if="pageType === 'poster'">
					<!-- page1.封面页 -->
					<the-player-poster />
				</template>
				<template v-else-if="pageType === 'queue'">
					<!-- page2.播放列表页面 -->
					<ThePlayerQueue />
				</template>
			</view>

			<!-- ↓ 操作栏 -->
			<view class="detail-player__main-action">
				<view class="detail-player__main-action-opt">
					<!-- 播放模式按钮 -->
					<view
						@tap.stop.prevent="setPlayerModeFn"
						class="detail-player__main-action-opt__common"
					>
						<view
							v-if="playMode === 1"
							class="icon-mode icon mode-listRepeat"
						/>
						<view v-else-if="playMode === 2" class="icon-mode icon mode-list" />
						<view
							v-else-if="playMode === 3"
							class="icon-mode icon mode-random"
						/>
						<view
							v-else-if="playMode === 4"
							class="icon-mode icon mode-repeat"
						/>
					</view>

					<!-- 上一首按钮 -->
					<view
						@tap.stop.prevent="playerPrev"
						class="detail-player__main-action-opt__common"
					>
						<view class="icon-prev icon" />
					</view>

					<!-- 开始按钮、暂停按钮 -->
					<template v-if="!loading">
						<view
							@tap.stop.prevent="playerStatusChange"
							class="detail-player__main-action-opt__common"
						>
							<view
								:class="[
									`icon-${playerStatus.paused ? 'play' : 'pause'}`,
									'icon',
								]"
							/>
						</view>
					</template>

					<!-- 加载 -->
					<view v-else class="detail-player__main-action-opt__common">
						<view class="icon-loading icon" />
					</view>

					<!-- 下一首按钮 -->
					<view
						@tap.stop.prevent="playerNext"
						class="detail-player__main-action-opt__common"
					>
						<view class="icon-next icon" />
					</view>

					<!-- 播放队列按钮 -->
					<view
						@tap.stop.prevent="
							pageType = pageType === 'poster' ? 'queue' : 'poster'
						"
						class="detail-player__main-action-opt__common"
					>
						<view class="icon-checked" v-show="pageType === 'queue'" />
						<view class="icon-queue icon" />
					</view>
				</view>
			</view>
		</view>
		<!-- ↑ 主页内容 -->
	</view>

	<!--没有网络的状态-->
	<up-no-network></up-no-network>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { usePlayer } from "@/store";
import { storeToRefs } from "pinia";
// 公共组件
import ThePlayerPoster from "./components/ThePlayerPoster.vue";
import ThePlayerQueue from "./components/ThePlayerQueue.vue";
import { getBgImageApi } from "@/api";

const playerStore = usePlayer();
const { songInfo, playerStatus, loading } = storeToRefs(playerStore);
const pageType = ref("poster");
const playMode = ref(1); // 循环样式
const bgImage = ref();

onLoad(async (options: any) => {
	const { songId } = options;
	const res = await getBgImageApi();
	bgImage.value = res.url;
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
});

onMounted(() => {});

// 分享首页页面
// #ifdef MP-WEIXIN
onShareAppMessage((res) => {
	// if (res.from === "button") {
	//   // 来自页面内分享按钮
	//   // console.log(res.target)
	// } else if (res.from === "menu") {
	//   // console.log('右上角菜单转发按钮');
	//   return {
	//     // 自定义分享内容
	//     title: playerStore.songInfo.name,
	//     desc: playerStore.songInfo.author,
	//     path: `/pages/pages-recreation/music/Index?songId=${data.songId}`, // 路径，可传递参数到指定页面
	//   };
	// }
	// return res.target;
});
// #endif

onBeforeUnmount(() => {
	// 退出页面清除定时器
	playerStore.outPages();
});

/**
 * @description 暂停/开始
 * */
const playerStatusChange = () => {
	if (playerStore.playerStatus.paused) {
		// 播放函数
		playerStore.setPlayerPlay();
	} else {
		// 暂停函数
		playerStore.setPlayerPause();
	}
};

/**
 * @description 上一首歌
 * */
const playerPrev = () => {
	playerStore.setPlayerPrev();
};

/**
 * @description 下一首
 * */
const playerNext = () => {
	playerStore.setPlayerNext();
};

/**
 * @description 切换模式
 * */
const setPlayerModeFn = () => {
	const modeArray = ["", "列表循环", "列表播放", "随机播放", "单曲循环"];
	let currentMode = playMode.value + 1;
	if (currentMode > 4) currentMode = 1;
	uni.hideToast();
	uni.$u.toast(modeArray[currentMode]);
	playMode.value = currentMode;
	playerStore.playerStatus.mode = currentMode;

	// playerStore.setPlayerStatus({ mode: currentMode })
};

/**
 * @description 返回页面
 * */
const backPageFn = () => {
	uni.navigateBack({
		delta: 1,
	});
};

/**
 * @description 跳转作者详情页面
 * */
const toDetailArtist = () => {};
</script>

<style lang="less" scoped>
.detail-player {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: rgba(39, 39, 39, 1);

	.detail-player__bg-image {
		transition: opacity 0.6s;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100vw;
		height: 100vh;
		opacity: 0;
		/* #ifdef H5 */
		filter: saturate(115%) brightness(70%) blur(80px);
		/* #endif */
	}

	// 背景滤镜
	.detail-player__bg-filter {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100vw;
		height: 100vh;
		background-size: auto 100vh;
		background-repeat: no-repeat;
		background-position: center;
		// filter性能和兼容性比backdrop-filter好
		/* #ifndef H5 */
		backdrop-filter: saturate(115%) brightness(50%) blur(60px);
		/* #endif */
	}

	// 主要内容
	.detail-player__main {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 64px;
		margin-top: var(--status-bar-height);
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 0 54px;

		&::before {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			backdrop-filter: saturate(115%) brightness(50%) blur(1px);
			transform: scale(1.5);
		}

		// 1. 标题栏
		.detail-player__main-nav {
			width: 100%;
			height: 96.15rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 38.5rpx;
			z-index: 1;

			//   返回按钮
			.detail-player__main-nav__back,
			.detail-player__main-nav__search {
				width: 96.15rpx;
				height: 96.15rpx;
				background-size: 20rpx auto;
				background-repeat: no-repeat;
				flex-shrink: 0;
			}

			.detail-player__main-nav__back {
				background-position: 0 center;
				background-image: url("@/static/images/music/icon-arrow-left.png");
			}

			// 标题
			.detail-player__main-nav__info {
				display: flex;
				width: calc(100% - 2 * 96.15rpx);
				justify-content: center;
				flex-direction: column;
				align-items: center;
				line-height: 1.5;
				flex: 1;
				padding: 0 30rpx;
				box-sizing: border-box;

				.detail-player__main-nav__title {
					color: #fff;
					font-weight: 600;
					font-size: 29.5rpx;
					width: 100%;
					text-align: center;
				}

				.detail-player__main-nav__subTitle {
					color: rgba(255, 255, 255, 0.7);
					font-weight: 600;
					font-size: 27rpx;
					width: 100%;
					text-align: center;
				}
			}
		}

		// 2. 内容
		.detail-player__main-pages {
			flex: 1;
			width: 100%;
			position: relative;
		}

		// 3. 操作栏
		.detail-player__main-action {
			width: 100%;
			position: absolute;
			bottom: 10px;

			.detail-player__main-action-opt {
				--main-action-opt-size: 115.4rpx;
				padding: 0 38.5rpx;
				box-sizing: border-box;
				width: 100%;
				height: var(--main-action-opt-size);
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.detail-player__main-action-opt__common {
					height: 100%;
					height: var(--main-action-opt-size);
					width: var(--main-action-opt-size);
					position: relative;
				}

				.icon {
					width: 100%;
					height: 100%;
					background-size: 100%;
					border-radius: 50%;
					background-color: rgb(228, 228, 228);
					mask-repeat: no-repeat;
				}

				.icon-checked {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 0;
					height: 68.5rpx;
					width: 68.5rpx;
					background-color: rgba(255, 255, 255, 0.2);
					border-radius: 10rpx;
				}

				.icon-mode {
					mask-position: center;
					mask-size: 38.5rpx;
				}

				// 不同的播放模式
				.mode-listRepeat {
					mask-image: url("@/static/images/music/exs.png");
				}

				.mode-list {
					mask-image: url("@/static/images/music/ey5.png");
				}

				.mode-random {
					mask-image: url("@/static/images/music/eyl.png");
				}

				.mode-repeat {
					mask-image: url("@/static/images/music/ey3.png");
				}

				.icon-prev {
					mask-position: center;
					mask-size: 38.5rpx;
					mask-image: url("@/static/images/music/c5m.png");
				}

				.icon-play {
					mask-position: center;
					mask-size: 100%;
					mask-image: url("@/static/images/music/c4n.png");
				}

				.icon-pause {
					mask-position: center;
					mask-size: 100%;
					mask-image: url("@/static/images/music/ew6.png");
				}

				.icon-loading {
					mask-position: center;
					mask-size: 80%;
					mask-image: url("@/static/images/music/loading.png");
					animation: loadingRotate 1s linear infinite forwards;
				}

				@keyframes loadingRotate {
					0% {
						transform: rotate(0);
					}

					100% {
						transform: rotate(-360deg);
					}
				}

				.icon-next {
					mask-position: center;
					mask-size: 38.5rpx;
					mask-image: url("@/static/images/music/c5n.png");
				}

				.icon-queue {
					mask-position: center;
					mask-size: 38.5rpx;
				}

				.icon-queue {
					mask-image: url("@/static/images/music/eys.png");
				}
			}
		}
	}
}
</style>
