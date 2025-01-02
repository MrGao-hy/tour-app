<!--
Author: zusheng
Date: 2022-04-28 20:04:33
LastEditTime: 2022-05-15 23:31:24
Description: 播放器的封面显示页（首页的光碟转动）
FilePath: \uni-preset-vue-vite-ts\src\components\ThePlayerPoster.vue
-->

<template>
	<view
		class="player-page-cd"
		:style="{ opacity: playerStore.loading ? 0 : 1 }"
		@touchend="onTouchEnd"
		@touchstart="onTouchStart"
	>
		<!-- 1. 歌曲歌词 -->
		<the-lyric
			v-if="isLyric"
			:lyrics="lyrics"
			:centerStyle="{ btnText: '跳转' }"
			:curTime="playerStatus.currentTime"
			@centerBtnClick="centerBtnClick"
			@copyLyrics="copy"
		></the-lyric>

		<view v-show="!isLyric">
			<!-- 2. 留声机的唱针-->
			<view
				class="player-page-cd__stylus"
				:class="{ 'stylus-pause': playerStore.playerStatus.paused }"
			/>

			<!-- 3. css半透明背景, 可有可无的装饰 -->
			<view class="player-page-cd__poster-bg" />
			<!-- 4. 唱片封面，播放时旋转 -->
			<view class="player-page-cd__poster">
				<image
					v-if="songInfo.pic_url"
					class="player-page-cd__poster-image"
					:class="{ 'animation-play-state': !playerStore.playerStatus.paused }"
					:src="songInfo.pic_url"
					mode="aspectFit"
				/>
			</view>
		</view>

		<!-- 5. 进度条 -->
		<view class="player-page-cd__progress">
			<!-- 当前时间 -->
			<view class="player-page-cd__progress-start">
				{{ timeConvert(playerStatus.currentTime) }}
			</view>

			<!-- 进度条轨道 -->
			<view class="player-page-cd__progress-spacing">
				<slider
					class="player-page-cd__progress-slider"
					:block-size="16"
					block-color="rgba(255,255,255,1)"
					activeColor="#E4E4E4"
					backgroundColor="rgba(255,255,255,0.3)"
					:value="playerStore.ratio"
					:step="0.1"
					@changing="ratioChanging"
					@change="ratioChange"
				/>
			</view>

			<!-- 总时间 -->
			<view class="player-page-cd__progress-end">
				{{ timeConvert(playerStore.playerStatus.duration) }}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore, usePlayer } from "@/store";

import { durationConvert } from "@/utils/utils";
import { storeToRefs } from "pinia";
import TheLyric from "./TheLyric.vue";

const appStore = useAppStore();
const playerStore = usePlayer();
const { songInfo, playerStatus, lyrics } = storeToRefs(playerStore);
/**
 * 进度条拖拉后，进度条最后获取的值
 * */
const ratioChanging = (e: any) => {
	playerStore.handleRatioChanging(e.detail.value);
};
const isLyric = ref(true);

/**
 * @description 进度条点击后，获取当前时间值
 * @param e
 * */
const ratioChange = (e: any) => {
	// #ifndef MP-WEIXIN
	playerStore.handleRatioChange(e.detail.value);
	// #endif
	// #ifdef MP-WEIXIN
	playerStore.handleRatioChange(e.target.value);
	// #endif
};

/**
 * @description 时间格式：秒转化分秒
 * */
const timeConvert = computed(() => {
	return (timeStamp = 0) => {
		return durationConvert(timeStamp);
	};
});

/**
 * @description 点击中间按钮跳转指定位置
 * */
const centerBtnClick = (e) => {
	playerStore.handleRatioChange(e.centerTime / 2);
};

/**
 * @description 复制
 * @param e 内容
 * */
const copy = (e: any) => {
	uni.showModal({
		content: JSON.stringify(e.lyrics),
	});
};

/**
 * @description 手指按下执行函数
 * @param e
 * */
const onTouchStart = (e: any) => {
	appStore.onTouchStart(e);
};
/**
 * @description 手指抬起执行函数
 * @param e
 * */
const onTouchEnd = async (e: any) => {
	const res = await appStore.onTouchEnd(e);
	isLyric.value = res === "left";
};
</script>

<style lang="scss" scoped>
.player-page-cd {
	width: 100%;
	height: 100%;
	//overflow: hidden;
	//transition: opacity 0.3s;

	// 唱针在音乐暂停时状态
	.stylus-pause {
		transform: translate3d(-30rpx, calc(320rpx * -1.5), 0) rotate(-30deg) !important;
	}

	// 1. 唱针
	.player-page-cd__stylus {
		z-index: 9999;
		position: absolute;
		top: 43%;
		left: 50%;
		width: calc(320rpx / 1.75);
		height: 320rpx;
		transition: transform 0.3s linear;
		transform-origin: 25.5rpx 25.5rpx;
		transform: translate3d(-30rpx, calc(320rpx * -1.5), 0) rotate(0deg);
		background: url("@/static/images/music/fd6.png") center center no-repeat;
		background-size: auto 100%;
	}
	// 2. 唱片封面css背景
	.player-page-cd__poster-bg {
		z-index: 9997;
		content: "";
		position: absolute;
		top: 43%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(255, 255, 255, 0.06);
		border: 2px solid rgba(255, 255, 255, 0.06);
		border-radius: 50%;
		width: 600rpx;
		height: 600rpx;
	}
	// 3. 唱片封面
	.player-page-cd__poster {
		z-index: 9998;
		position: absolute;
		top: 43%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(0);
		border-radius: 50%;
		width: 570rpx;
		height: 570rpx;
		background: url("@/static/images/music/ewj.png") center center no-repeat;
		background-size: 100%;

		// 唱片封面
		.player-page-cd__poster-image {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-192.5rpx, -192.5rpx);
			border-radius: 50%;
			width: 385rpx;
			height: 385rpx;
		}
		.animation-play-state {
			animation: posterRotate 20s linear infinite forwards;
		}
		@keyframes posterRotate {
			0% {
				transform: translate(-192.5rpx, -192.5rpx) rotate(0);
			}

			100% {
				transform: translate(-192.5rpx, -192.5rpx) rotate(360deg);
			}
		}
	}
	// 4. 进度条
	.player-page-cd__progress {
		position: absolute;
		height: 13rpx;
		width: 100%;
		left: 0;
		bottom: 44rpx;
		padding: 0 48rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: rgba(255, 255, 255, 0.6);
		font-size: 20rpx;

		.player-page-cd__progress-start {
			margin-right: 32rpx;
		}

		.player-page-cd__progress-end {
			margin-left: 32rpx;
		}

		.player-page-cd__progress-spacing {
			flex: 1;
			height: 60rpx;
			box-sizing: border-box;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			.player-page-cd__progress-slider {
				flex: 1;
				margin: 0;
			}
		}
	}
}
</style>
