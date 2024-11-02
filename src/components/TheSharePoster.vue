<template>
	<up-popup
		mode="center"
		round="10"
		closeable
		:show="showPoster"
		@close="showPoster = false"
	>
		<view class="poster">
			<view class="poster-main"></view>
			<view class="poster-footer">
				<view class="poster-footer__left">
					<up-avatar :src="userInfo.avatar"></up-avatar>
				</view>
				<view class="poster-footer__right">
					<image
						class="qr-code"
						:src="`data:image/png;base64,${posterContent.qrCode}`"
					></image>
				</view>
			</view>
		</view>

		<view class="button">
			<view class="btn btn-close" @tap.stop="">取消</view>
			<view class="btn btn-notarize" @tap.stop="">下载海报</view>
		</view>
	</up-popup>
</template>

<script lang="ts" setup>
import { useSharePosterStore, useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const sharePosterStore = useSharePosterStore();
const userStore = useUserStore();
const { showPoster, posterContent } = storeToRefs(sharePosterStore);
const { userInfo } = storeToRefs(userStore);
</script>

<style lang="scss" scoped>
:deep(.u-popup__content) {
	overflow: hidden;
}
.poster {
	width: 300px;
	height: 550px;
	overflow: hidden;
	background-color: red;
	&-main {
		height: 100%;
	}
	&-footer {
		position: absolute;
		bottom: 0;
		background-image: radial-gradient(
			300px at 150px -260px,
			transparent 100%,
			#fff 0px
		);
		width: 100%;
		height: 150px;
		padding: 50px $gxh-border-margin-padding-base
			$gxh-border-margin-padding-base;
		&__left {
			flex: 1;
			float: left;
			height: 100%;
			width: calc(100% - 200rpx);
			border-radius: $gxh-border-radius-base;
			padding: $gxh-border-margin-padding-sm;
		}
		&__right {
			float: right;
			height: 100%;
			display: flex;
			align-items: center;
			.qr-code {
				width: $gxh-img-size-big;
				height: $gxh-img-size-big;
			}
		}
	}
}
/*底部按钮*/
.button {
	position: fixed;
	display: flex;
	width: 300px;
	box-sizing: border-box;
	justify-content: space-around;
	margin-top: 50rpx;
	.btn {
		color: #fff;
		width: 180rpx;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		&-close {
			text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #fa3534,
				0 0 82px #fa3534, 0 0 92px #fa3534, 0 0 102px #fa3534, 0 0 151px #fa3534;
			background: rgba(250, 53, 52, 0.2);
			border: 1rpx solid #fa3534;
		}
		&-notarize {
			text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
				0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
			background: rgba(0, 255, 170, 0.1);
			border: 1rpx solid #0fa;
		}
	}
}
</style>
