<template>
	<up-popup
		:show="show"
		closeable
		round="20"
		bgColor="#f3f3f3"
		:safeAreaInsetBottom="false"
		:customStyle="{
			width: '60vw',
			padding: '80rpx 40rpx 40rpx',
		}"
		@close="closeFn"
	>
		<view class="fun">
			<view
				class="fun-row"
				v-for="item in actionMenu"
				@tap="onClickMenuFn(item)"
				:key="item.key"
			>
				<view class="fun-row__left" :style="{ background: item.iconBgColor }">
					<up-icon :name="item.icon" :color="item.iconColor"></up-icon>
				</view>
				<view class="fun-row__right">{{ item.label }}</view>
			</view>
		</view>
	</up-popup>
</template>

<script setup lang="ts">
export interface ActionMenu {
	key: number;
	icon: string;
	iconColor?: string;
	iconBgColor?: string;
	url?: string;
	label: string;
}
interface IProps {
	show: boolean;
	actionMenu: ActionMenu[];
}
const props = withDefaults(defineProps<IProps>(), {
	show: false,
	actionMenu: () => [],
});
const emit = defineEmits(["handleClick", "handleClose"]);

/**
 * 点击操作
 * */
const onClickMenuFn = (temp: ActionMenu) => {
	emit("handleClick", temp);
};

/**
 * 关闭弹窗
 * */
const closeFn = () => {
	emit("handleClose");
};
</script>

<style lang="scss" scoped>
/*操作菜单栏*/
.fun {
	background: white;
	padding: 20rpx;
	border-radius: 20rpx;
	&-row {
		display: flex;
		align-items: center;
		&__left {
			width: 50rpx;
			height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		&__right {
			padding: 20rpx 0;
			flex: 1;
			border-bottom: 1rpx solid rgba(0, 26, 188, 0.15);
		}
	}
}
</style>
