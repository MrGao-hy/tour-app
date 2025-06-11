<template>
	<view class="order">
		<!-- 空状态 -->
		<yk-empty
			:show="!list?.length"
			description="宝子😘，你的礼品宝库还在 “待解锁” 状态呢！超多精美礼品都在礼品页面乖乖 “躺” 着，就等你去把心仪的它们领回家啦，快麻溜儿地去瞅瞅，开启兑换之旅吧～"
		></yk-empty>
		<!-- 空状态 -->

		<yk-virtual-scroller
			v-show="list.length"
			:items="list"
			:item-height="200"
			@scrollButton="rollBottomFn"
		>
			<template #default="{ items }">
				<view class="swiper" v-for="item in items" :key="item.id">
					<view class="cart-box" @click="toOrderDetail(item.id)">
						<view class="cart-top">
							<view class="cart-top-left">
								<up-icon name="order" :label="item.orderId"></up-icon>
							</view>
							<view class="cart-top-right">
								<u-tag :text="item.status" size="mini" type="error"></u-tag>
							</view>
						</view>

						<view class="address"> 地址：{{ item.address }} </view>

						<!--商品类目-->
						<view class="cart-center">
							<view class="cart-center-first">
								<view class="cart-center-left">
									<image
										class="img"
										:src="item.goods?.url || config.empty"
										mode="aspectFill"
									></image>
								</view>
								<view class="cart-center-right">
									<up-icon
										name="arrow-right"
										size="12"
										label="共1件礼品"
										labelPos="left"
									></up-icon>
								</view>
							</view>
							<view class="cart-center-end">
								<view class="end-order-time">
									下单时间：{{ item.createTime }}
								</view>
								<view class="end-total-price">
									&emsp; 合计：<yk-price :text="item.goods.price"></yk-price>
								</view>
							</view>
						</view>

						<!--操作按钮-->
						<view class="cart-bottom">
							<template v-for="item in btns" :key="item.key">
								<u-button
									class="order-btn"
									hairline
									plain
									size="small"
									shape="circle"
									:type="item.type"
									@click="item.click"
									>{{ item.name }}</u-button
								>
							</template>
						</view>
					</view>
				</view>
			</template>
		</yk-virtual-scroller>
		<scroll-view
			v-show="list.length"
			class="swiper"
			scroll-y
			@scrolltolower="rollBottomFn"
		>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { config } from "@/config";
import { reactive } from "vue";
import YkVirtualScroller from "hfyk-app/components/yk-virtual-scroller/yk-virtual-scroller.vue";

interface IProps {
	list: any[];
}
const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits(["rollBottom"]);

const btns = reactive([
	{
		key: 1,
		name: "删除订单",
		type: "error",
		click: () => operateClick("del"),
	},
	{
		key: 2,
		name: "再次购买",
		type: "primary",
		click: () => operateClick("again"),
	},
]);

/**
 * @description 按钮操作函数
 * @param type 类型
 * */
const operateClick = (type: string) => {
	switch (type) {
		case "del":
			uni.$u.toast("订单无法删除");
			break;
		case "again":
			break;
		default:
			break;
	}
};

/**
 * @description 跳转订单详情页面
 * */
const toOrderDetail = (id: string) => {
	uni.navigateTo({
		url: `/pages/pages-user/order/detail/Index?id=${id}`,
	});
};

/**
 * @description 上拉加载更多
 * */
const rollBottomFn = () => {
	emit("rollBottom");
};
</script>

<style lang="scss" scoped>
.order {
	height: 100%;
	/* 订单列表 */
	.swiper {
		height: 100%;
		box-sizing: border-box;
		padding: 0 $gxh-border-margin-padding-base;
		.cart-box {
			width: 100%;
			border-radius: $gxh-border-radius-lg;
			background-color: white;
			margin-bottom: $gxh-border-margin-padding-base;
			padding: $gxh-border-margin-padding-sm;
			display: flex;
			flex-direction: column;

			/*订单信息*/
			.cart-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.cart-top-left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.icon-dingdan {
						margin-right: 15rpx;
						font-size: 42rpx;
					}
					.text {
						font-size: 30rpx;
						display: flex;
						justify-content: flex-start;
						&.text:nth-of-type(2) {
							font-size: 22rpx;
							color: #c8c9cc;
						}
					}
				}
				.cart-top-right {
					font-size: 33rpx;
					font-weight: 700;
				}
			}

			.address {
				font-size: 21rpx;
				color: #777777;
				margin: 12rpx 0;
			}

			/*商品类目*/
			.cart-center {
				width: 100%;
				display: flex;
				flex-direction: column;
				/*订单上的所以商品*/
				.cart-center-first {
					//padding: 30rpx 20rpx 10rpx;
					display: flex;
					justify-content: space-between;
					.cart-center-left {
						display: flex;
						justify-content: flex-start;
						.img {
							width: 100rpx;
							height: 100rpx;
							border-radius: 10rpx;
							background-color: whitesmoke;
							margin-right: 10rpx;
						}
					}
					.cart-center-right {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.cart-center-end {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24rpx;
					margin: $gxh-border-margin-padding-base 0;
					/*下单时间*/
					.end-order-time {
						font-size: 21rpx;
						color: $gxh-color-hint;
					}
					/*订单总价*/
					.end-total-price {
					}
				}
			}
			.cart-bottom {
				display: flex;
				justify-content: flex-end;
				.order-btn {
					width: 120rpx;
					margin: 0 10rpx;
				}
			}
		}
	}
}
</style>
