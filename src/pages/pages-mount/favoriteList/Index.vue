<template>
	<yk-empty
		:show="!favoriteList.length"
		imageUrl="https://pic.imgdb.cn/item/6737057ad29ded1a8c6f843b.webp"
		description="您还没有收藏任何东西，快去收藏试试吧"
	></yk-empty>
	<the-mount-card :list="favoriteList"></the-mount-card>
</template>
<script setup lang="ts">
import TheMountCard from "@/pages/pages-mount/components/TheMountCard.vue";
import { collectMountListApi } from "@/api";
import { onMounted, reactive, ref } from "vue";
import { MountType, PageConfigVo } from "@/typing";

const page: PageConfigVo = reactive({
	size: 15,
	current: 1,
});
const favoriteList = ref<MountType[]>([]);

onMounted(async () => {
	const res = await collectMountListApi(page);
	favoriteList.value = res.records;
});
</script>
