<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 联系我们
  FilePath: \diary\src\pages\page-user\relation\Index.vue
-->

<template>
	<view class="relation relation-page">
		<view class="relation__header">
			<!-- #ifndef MP-WEIXIN -->
			<!--			<image-->
			<!--				class="relation__header-img"-->
			<!--				src="/unpackage/res/icons/1024x1024.png"-->
			<!--			></image>-->
			<!-- #endif -->
			<view class="relation__header-version">
				山徒旅行
				<!-- #ifdef APP_PLUS -->
				V{{ appInfo.version }}
				<!-- #endif -->
			</view>
			<view class="relation__header-description">
				<!-- #ifdef APP_PLUS -->
				{{ appInfo.description }}
				<!-- #endif -->
			</view>
		</view>

		<view class="relation__main">
			<template v-for="(item, i) in list" :key="i">
				<view class="relation__main-col" @tap="jumpPage(item.url)">
					<view class="relation__main-col-left">
						<view :class="`t-icon t-icon-${item.icon}`"></view>
						<view>
							{{ item.label }}
							<text style="color: gray; font-size: 10px">{{
								item.content
							}}</text>
						</view>
					</view>
					<view class="relation__main-col-right">
						<view
							class="relation__main-col-right-btn"
							v-if="item.isCopy"
							@tap="copyDataFn(item.content)"
						>
							复制
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>

	<!--没有网络的状态-->
	<up-no-network></up-no-network>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const list = reactive([
	{
		label: "在线客服",
		isCopy: false,
		icon: "kefu",
		url: "",
		content: "",
	},
	{
		label: "问题反馈",
		isCopy: false,
		icon: "wentifankui",
		url: "/pages/pages-function/matter/Index",
		content: "",
	},
	{
		label: "微信",
		isCopy: true,
		icon: "weixin",
		content: "gxh0707ms",
	},
	{
		label: "qq",
		isCopy: true,
		icon: "QQ",
		content: "2036902768",
	},
	{
		label: "抖音",
		isCopy: true,
		icon: "douyin",
		content: "2036902768.",
	},
]);
const appInfo = reactive({
	version: "",
	description: "",
});
// #ifdef APP_PLUS
plus.runtime.getProperty(plus.runtime.appid, function (res) {
	console.log(res);
	if (res.version) {
		appInfo.version = res.version;
		appInfo.description = res.description;
	} else {
		appInfo.version = plus.runtime.version;
	}
});
// #endif

/**
 * 复制内容
 * */
const copyDataFn = (content) => {
	uni.setClipboardData({
		data: content,
		success: () => {
			uni.showToast({
				title: "复制成功",
				icon: "none",
			});
		},
	});
};
/**
 * 跳转页面
 * */
const jumpPage = (url) => {
	if (url) {
		uni.navigateTo({
			url,
		});
	}
};
</script>

<style lang="scss" scoped>
.relation {
	/*头部*/
	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		&-img {
			width: 150rpx;
			height: 150rpx;
		}
		&-version {
			margin: 20rpx 0 10rpx;
			font-weight: 500;
			color: #856062;
		}
		&-description {
			font-size: 22rpx;
			color: rgba(133, 96, 98, 0.34);
		}
	}

	/*内容*/
	&__main {
		padding: 40rpx 20rpx;
		&-col {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff9f9;
			border: 4rpx solid #f5ccce;
			color: #856062;
			padding: 20rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			&-left {
				display: flex;
				align-items: center;
				.t-icon {
					width: 50rpx;
					height: 50rpx;
					margin-right: $gxh-border-margin-padding-base;
				}
			}
			&-right {
				&-btn {
					background: #ffaab1;
					padding: 10rpx 20rpx;
					border-radius: 30rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #ffffff;
					border: 2rpx solid #e9968d;
				}
			}
		}
	}
}
</style>
