<template xmlns="">
	<yk-empty
		:show="!addressList.length"
		description="哎呀😮，收货地址栏竟然 “开小差” 溜没影啦！这可不行，赶紧补一个，不然好物都找不到奔赴你的 “路线”，快动手添上吧～"
	></yk-empty>
	<up-list v-if="addressList.length">
		<up-list-item v-for="(item, index) in addressList" :key="index">
			<up-cell>
				<template #title>
					<view class="address-row">
						<view class="address-row__top">
							{{ item.province }}&ensp;{{ item.city }}&ensp;{{
								item.prefecture
							}}
						</view>
						<view class="address-row__center"> {{ item.address }} </view>
						<view class="address-row__bottom">
							{{ item.name }}&emsp;{{ item.phone }}&emsp;
							<up-tag
								:show="item.defaultVal"
								size="mini"
								type="error"
								text="默认"
								plain
								plainFill
							></up-tag>
						</view>
					</view>
				</template>

				<template #right-icon>
					<up-icon
						name="edit-pen"
						@click="toAddressEditPageFn(item.id)"
					></up-icon>
				</template>
			</up-cell>
		</up-list-item>
	</up-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { queryAddressListApi } from "@/api";
import { AddressVo } from "@/typing";
import { onNavigationBarButtonTap, onShow } from "@dcloudio/uni-app";

const addressList = ref<AddressVo[]>([]);

onNavigationBarButtonTap((e) => {
	if (e.index === 0) {
		uni.navigateTo({
			url: "/pages/pages-user/shippingAddress/create/Index",
		});
	}
});

onShow(async () => {
	addressList.value = await queryAddressListApi();
});

/**
 * @description 跳转编辑地址页面
 * */
const toAddressEditPageFn = (id: string) => {
	uni.navigateTo({
		url: `/pages/pages-user/shippingAddress/create/Index?id=${id}`,
	});
};
</script>

<style lang="scss" scoped>
.address {
	&-row {
		&__top {
			color: $gxh-color-hint;
			font-size: $gxh-font-size-hint;
		}
		&__center {
			margin: $gxh-border-margin-padding-base 0;
		}
		&__bottom {
		}
	}
}
</style>
