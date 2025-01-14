<template>
	<view class="demo-warter" v-for="good in list" :key="good.id">
		<view class="item-img">
			<up-image
				class="image"
				:src="good.url || config.empty"
				width="100%"
				:lazy-load="true"
			></up-image>
		</view>
		<!-- 介绍部分 -->
		<view class="introduce-section">
			<text class="demo-title">{{ good.name }}</text>
			<view class="detail">
				<text class="text">库存:{{ Number(good.quantity) }}</text>
				<text class="text"
					>原价:<text class="old-price">￥{{ good.price }}</text></text
				>
			</view>
			<text style="color: orange; 'margin-top': '40rpx'">
				{{ good.integral }}积分
			</text>

			<u-button
				:color="config.themeColor"
				iconColor="#FFF"
				throttleTime="1000"
				text="兑换"
				@tap.stop="buyGoodsFn(good.id)"
			></u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { GoodsVo } from "@/typing";
import { config } from "@/config";
import { exchangeGoodsListApi } from "@/api/modules/goods";
import { getDefaultAddressApi } from "@/api";

interface IProps {
	list: GoodsVo[];
}
const props = withDefaults(defineProps<IProps>(), {});

const buyGoodsFn = async (id: string) => {
	const address = await getDefaultAddressApi();
	if (address) {
		await exchangeGoodsListApi(id, address.id);
		uni.$u.toast("兑换成功");
	} else {
		await uni.navigateTo({
			url: "/pages/pages-user/shippingAddress/create/Index",
		});
	}
};
</script>

<style lang="scss" scoped>
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	position: relative;
}
/*商品图片*/
.item-img {
	//height: 100%;
	width: 100%;
}

/* 商品介绍 */
.introduce-section {
	position: relative;
	padding: 12rpx;
	.demo-title {
		font-size: 28rpx;
		font-weight: 500;
		color: #222222;
		@include line-feed(2);
	}

	.detail {
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
		.text {
			font-size: 20rpx;
			color: #999999;
		}
		.old-price {
			color: red;
			text-decoration: line-through;
		}
	}
	:deep(.u-button) {
		position: absolute;
		right: 12rpx;
		bottom: 12rpx;
		width: 100rpx;
		height: 55rpx;
		border-radius: $gxh-border-radius-base;
	}
}
</style>
