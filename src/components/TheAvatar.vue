<template>
	<up-avatar
		:src="
			avatar?.includes('https') || avatar?.includes('http')
				? avatar
				: `${env.baseUrl}${avatar}`
		"
		:size="size"
	></up-avatar>
</template>
<script setup lang="ts">
import env from "@/config/env";

interface IProps {
	avatar: string;
	size?: string | number;
}
const props = withDefaults(defineProps<IProps>(), {
	avatar: "",
	size: 40,
});
</script>
