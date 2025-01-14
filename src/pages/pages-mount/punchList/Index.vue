<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 景区打卡列表页面
  FilePath: \src\pages-mount\punchList\Index.vue
-->
<template>
	<yk-empty
		:show="!punchList.length"
		description="这些超有趣的宝藏打卡地，你还没去过？快约上小伙伴一起去探索吧，说不定会有意想不到的惊喜哟！"
	></yk-empty>
	<the-mount-card v-if="punchList.length" :list="punchList"></the-mount-card>
</template>
<script setup lang="ts">
import TheMountCard from "@/pages/pages-mount/components/TheMountCard.vue";
import { travelListApi } from "@/api";
import { onMounted, reactive, ref } from "vue";
import { MountType, PageConfigVo } from "@/typing";

const page: PageConfigVo = reactive({
	size: 15,
	current: 1,
});
const punchList = ref<MountType[]>([]);

onMounted(async () => {
	const res = await travelListApi(page);
	punchList.value = res.records;
});
</script>
