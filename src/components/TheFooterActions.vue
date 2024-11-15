<template>
	<view class="footer-actions">
		<view @tap.stop="collectMountFn">
			<up-icon
				:name="MountData.collect ? 'star-fill' : 'star'"
				size="22"
				color="#f6b204"
				:label="MountData.collectCount"
			></up-icon>
		</view>
		<view @tap.stop="openMarkFn">
			<up-icon
				name="chat"
				size="22"
				color="#19be6b"
				:label="MountData.markCount"
			></up-icon>
		</view>
		<view @tap.stop="sharePosterFn">
			<up-icon name="photo" size="22" color="#2979ff"></up-icon>
		</view>
	</view>
</template>

<script setup lang="ts">
import { MountType } from "@/typing";
import { useSharePosterStore } from "@/store";
import { toRefs } from "vue";

interface IProps {
	MountData: MountType;
}
const props = withDefaults(defineProps<IProps>(), {
	MountData: () => ({
		id: "",
	}),
});
const { MountData } = toRefs(props);
const emit = defineEmits(["handleCollect", "handleOpenMark"]);

const sharePosterStore = useSharePosterStore();

/**
 * 收藏景区
 * */
const collectMountFn = async () => {
	emit("handleCollect", MountData.value.id);
};

/**
 * 打开评论区
 * */
const openMarkFn = () => {
	emit("handleOpenMark", MountData.value.id);
};

/**
 * 分享海报
 * */
const sharePosterFn = () => {
	sharePosterStore.openSharePosterFn(MountData.value);
};
</script>

<style lang="scss" scoped>
.footer-actions {
	display: flex;
	justify-content: space-around;
}
</style>
