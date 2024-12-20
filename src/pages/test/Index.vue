<template>
	<the-share-poster></the-share-poster>
	<up-rate
		activeIcon="../../static/icon/rate_1.png"
		inactiveIcon="../../static/icon/rate_default.png"
	></up-rate>
	<up-icon name="../../static/icon/default.png" imgMode="aspectFit"></up-icon>
	<!--	<view class="t-icon t-icon-bukaixin"></view>-->
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
