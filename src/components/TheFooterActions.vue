<template>
	<view class="footer-actions">
		<view @tap.stop="collectMountFn(data.id)">
			<up-icon
				:name="data.collect ? 'star-fill' : 'star'"
				size="22"
				color="#f6b204"
				:label="data.collectCount"
			></up-icon>
		</view>
		<view @tap.stop="openMarkFn(data.id)">
			<up-icon
				name="chat"
				size="22"
				color="#19be6b"
				:label="data.markCount"
			></up-icon>
		</view>
		<view @tap.stop="shareFn(data.id)">
			<up-icon name="share" size="22" color="#2979ff"></up-icon>
		</view>
	</view>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";

interface IProps {
	data: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	data: () => ({
		id: "",
	}),
});
const emit = defineEmits(["handleCollect", "handleOpenMark"]);

/**
 * 收藏景区
 * */
const collectMountFn = async (id: string) => {
	emit("handleCollect", id);
};

/**
 * 打开评论区
 * */
const openMarkFn = (id: string) => {
	emit("handleOpenMark", id);
};
</script>

<style lang="scss" scoped>
.footer-actions {
	display: flex;
	justify-content: space-around;
}
</style>
