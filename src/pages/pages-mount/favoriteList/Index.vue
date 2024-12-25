<!--
  Author: 高先华
  Date: 2024-05-14 10:36:02
  LastEditTime: 2024-05-20 10:59:52
  Description: 收藏景区列表页面
  FilePath: \src\pages-mount\favoriteList\Index.vue
-->
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
