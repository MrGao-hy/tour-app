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
		description="哇塞😃，你的收藏夹还是空荡荡的呢！赶紧动动手指去收藏试试吧，开启你的专属宝藏库之旅～"
	></yk-empty>
	<the-mount-card
		v-if="favoriteList.length"
		:list="favoriteList"
	></the-mount-card>
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
