<template>
	<up-card title="热搜榜" :title-size="22">
		<template #body>
			<up-list height="500">
				<up-list-item v-for="(item, index) in hotRankingList" :key="index">
					<up-cell :title="item.searchWord" :border="false">
						<template #icon>
							<text
								:style="{ color: index < 3 ? 'red' : '', marginRight: '20rpx' }"
								>{{ index + 1 }}</text
							>
						</template>

						<template #right-icon>
							<up-icon
								:name="item?.iconUrl || ''"
								imgMode="aspectFit"
								size="20"
							></up-icon>
						</template>
					</up-cell>
				</up-list-item>
			</up-list>
		</template>
	</up-card>
</template>

<script lang="ts" setup>
import { queryMusicSearchHotsApi } from "@/api";
import { onMounted, ref } from "vue";

const hotRankingList = ref();

onMounted(async () => {
	hotRankingList.value = await queryMusicSearchHotsApi();
});
</script>
