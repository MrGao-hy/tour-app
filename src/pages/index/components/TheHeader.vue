<template>
	<view class="wrapper__header">
		<view class="wrapper__header-title t3d">
			<view class="t3d-h2">登山挑战</view>
			<view class="t3d-h1">{{ count }}</view>
			<view class="btn">
				<template v-for="item in headMenu">
					<view class="btn-record" @tap="toFavoriteListFn(item)">{{
						item.name
					}}</view>
				</template>
			</view>
			<view class="h6">{{ $gxh.formatTime(new Date(), "dd.MM.yyyy") }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface HeadMenuType {
	key: number;
	name: string;
	url: string;
}
interface IProps {
	count: number;
}
const props = withDefaults(defineProps<IProps>(), {
	count: 0,
});

const headMenu: HeadMenuType[] = reactive([
	{
		key: 1,
		name: "我的足迹",
		url: "/pages/pages-mount/punchList/Index",
	},
	{
		key: 2,
		name: "我的收藏",
		url: "/pages/pages-mount/favoriteList/Index",
	},
]);

/**
 * @description 跳转到指定页面
 * @param temp 跳转页面对象
 * */
const toFavoriteListFn = (temp: HeadMenuType) => {
	uni.navigateTo({
		url: temp.url,
	});
};
</script>

<style lang="scss" scoped>
.h6 {
	font-size: 1rem;
	opacity: 0.6;
	padding-bottom: 2.5rem;
	transform: translateZ(10px);
	margin-top: $gxh-border-margin-padding-sm;
	color: #fff;
	font-weight: bold;
	text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
	transform-style: preserve-3d;
}

.wrapper {
	&__header {
		width: 100vw;
		flex-grow: 1;
		flex-shrink: 0;
		height: 400rpx;
		position: relative;
		border-radius: 0 0 20px 20px;
		box-shadow: 0 0 3rem rgba(0, 0, 0, 0.5);
		z-index: 1;
		background-blend-mode: multiply;
		background: #1991ff
			url(https://images.pexels.com/photos/10223476/pexels-photo-10223476.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)
			center;
		background-size: cover;

		&-title {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 20px;
			position: relative;
			z-index: 1;

			.t3d {
				&-h1 {
					color: #fff;
					font-weight: bold;
					text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
					margin: 0;
					transform-style: preserve-3d;
					font-size: 120rpx;
					line-height: 1.2;
					transform: translateZ(20px);
				}

				&-h2 {
					color: #fff;
					font-weight: bold;
					text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
					transform-style: preserve-3d;
					font-size: 1.125rem;
					margin-top: var(--status-bar-height);
				}
			}

			.btn {
				display: flex;

				view {
					border-radius: 100px;
					padding: 8rpx 15rpx;
					border: 1px solid white;
					color: white;
					box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
					margin-right: 10px;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
