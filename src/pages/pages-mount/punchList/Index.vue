<template>
	<the-mount-card :list="punchList"></the-mount-card>
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
