<template>
	<view class="goods">
		<image class="goods__image" :src="good.url || config.empty"></image>
		<view class="goods__content">
			<view class="goods__content-top">
				<view class="goods__content-top--name">{{ good.name }}</view>
				<view class="goods__content-top--num">X{{ 1 }}</view>
			</view>
			<view class="goods__content-bottom">
				<u-tag
					text="积分兑换"
					plain
					plainFill
					size="mini"
					borderColor="#00000000"
				></u-tag>
				<view class="goods__content-bottom-integral">
					<text>{{ good.integral }}</text>
					<text style="font-size: 12px">积分</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, withDefaults } from "vue";
import { storeToRefs } from "pinia";
import { config } from "@/config";
import { GoodsVo } from "@/typing";

interface IProps {
	good: GoodsVo;
}
const props = withDefaults(defineProps<IProps>(), {
	good: () => ({}),
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.goods {
	display: flex;
	&__image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	&__content {
		flex: 1;
		&-top {
			width: 100%;
			&--name {
				width: 100%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			&--num {
				color: $gxh-text-color-disable;
			}
		}
		&-bottom {
			display: flex;
			justify-content: space-between;
			&-integral {
				color: orange;
			}
		}
	}
}
</style>
