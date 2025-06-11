<template>
	<view class="redeem-code">
		<view class="redeem-code__row">
			<view
				:class="`t-icon t-icon-${
					orderDetail.status === '已核销' ? 'yihexiao' : 'weihexiao'
				}`"
			></view>
			<view class="state">
				{{ orderDetail.status }}
			</view>
		</view>

		<view class="redeem-code__row">
			<view class="shop">
				<up-tag
					text="扫码核销"
					plain
					plainFill
					size="mini"
					borderColor="#00000000"
				></up-tag>
			</view>
			<view class="address">
				{{ orderDetail.address }}
			</view>
		</view>

		<view class="redeem-code__row hint">
			<view class="t-icon t-icon-tishi"></view>
			温馨提示 | 请向管理员核销二维码
		</view>
		<view class="redeem-code__row two">
			<view class="title"> 核销码 </view>
			<view class="code">
				{{ orderDetail.hxCode }}
			</view>
			<up-qrcode class="qr" :size="175" :val="orderDetail.hxCode"></up-qrcode>
		</view>
		<view class="redeem-code__row">
			<!-- 我的商品 -->
			<the-goods-dom :good="orderDetail.goods"></the-goods-dom>
		</view>
		<view class="redeem-code__row">
			<view class="row">
				<view class="row__left">门店信息:</view>
				<view class="row__right">华玥店</view>
			</view>
			<view class="row">
				<view class="row__left">订单编号:</view>
				<view class="row__right">
					{{ orderDetail.orderId }}
					<view
						class="iconfont icon-fuzhi"
						@click="copyOrderCodeFn(orderDetail.orderId)"
					></view>
				</view>
			</view>
			<view class="row">
				<view class="row__left">下单时间:</view>
				<view class="row__right">{{ orderDetail.createTime }}</view>
			</view>
		</view>
	</view>

	<!-- 底部栏 -->
	<view class="redeem-code__bottom">
		<up-row justify="space-between" gutter="10">
			<up-col span="6">
				<up-button text="申请退款" plain></up-button>
			</up-col>
			<up-col span="6">
				<up-button type="error" text="再来一单"></up-button>
			</up-col>
		</up-row>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import TheGoodsDom from "@/pages/pages-user/order/detail/components/TheGoodsDom.vue";
import { orderDetailApi } from "@/api";
import { OrderType } from "@/typing";

const orderDetail = ref<OrderType>({});

onLoad(async (options: any) => {
	const { id } = options;
	if (id) {
		orderDetail.value = await orderDetailApi(id);
	}
});

/**
 * @description 复制
 * */
const copyOrderCodeFn = (data: string) => {
	uni.setClipboardData({
		data,
		success: () => {
			uni.$u.toast("复制成功");
		},
	});
};
</script>

<style lang="scss" scoped>
.redeem-code {
	padding: 20rpx;
	background: linear-gradient(to bottom, $gxh-theme-color 0%, #f7f7f7);
	box-sizing: border-box;
	height: 100%;

	&__row {
		padding: 20rpx;
		background: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;

		&:nth-of-type(1) {
			background: #00000000;
			display: flex;
			align-items: center;
			justify-content: center;
			.t-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: $gxh-border-margin-padding-base;
			}
			.state {
				color: white;
				font-size: $gxh-font-size-lg;
				font-weight: bold;
				text-align: center;
			}
		}

		&:nth-of-type(2) {
			.shop {
				font-weight: bold;
				display: flex;
			}

			.address {
				font-size: 25rpx;
				color: $gxh-text-color-grey;
			}
		}

		&:nth-of-type(3) {
			background: #fefaef;
			color: #ef732d;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			.t-icon {
				margin-right: $gxh-border-margin-padding-sm;
			}
		}

		&:nth-of-type(4) {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			height: 600rpx;

			.title {
				color: $gxh-text-color-disable;
			}

			.code {
				font-weight: bold;
				font-size: 40rpx;
			}

			.qr {
			}
		}

		&:nth-of-type(6) {
			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;

				&__left {
					width: 150rpx;
				}
				&__right {
					color: $gxh-text-color-placeholder;
					font-size: $gxh-font-size-sm;
					display: flex;
					.iconfont {
						color: #2979ff;
						margin-left: $gxh-border-margin-padding-sm;
					}
				}
			}
		}
	}

	&__bottom {
		position: fixed;
		z-index: 1000;
		bottom: 0;
		padding: $gxh-border-margin-padding-base;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		background: white;

		&--btn {
			display: flex;
		}
	}
}
</style>
