<template>
	<the-share-poster></the-share-poster>
	<up-button
		@click="sharePosterStore.openSharePosterFn({})"
		text="生成海报"
	></up-button>
</template>

<script lang="ts" setup>
import TheSharePoster from "@components/TheSharePoster.vue";
import { ref } from "vue";
import { useSharePosterStore } from "@/store";
const sharePosterStore = useSharePosterStore();
</script>
