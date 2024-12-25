<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 嵌套网页页面
  FilePath: \src\pages-function\chatGPT\Index.vue
-->
<template>
	<web-view :src="url"></web-view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isFirst_1, isFirst_2 } = storeToRefs(userStore);
const url = ref("");

onLoad((options) => {
	const { webUrl, title } = options;
	if (webUrl && title) {
		url.value = webUrl;
		uni.setNavigationBarTitle({
			title,
		});
		if (title === "豆包") {
			if (!isFirst_1.value) return;
			uni.showModal({
				content: `${title}AI网站是嵌套在本网站中，仅供参考学习，不做任何商业用途`,
				success: (res) => {
					if (res.confirm) {
						isFirst_1.value = false;
					}
				},
			});
		} else {
			if (!isFirst_2.value) return;
			uni.showModal({
				content: `${title}AI网站是嵌套在本网站中，仅供参考学习，不做任何商业用途`,
				success: (res) => {
					if (res.confirm) {
						isFirst_2.value = false;
					}
				},
			});
		}
	}
});
</script>
