<template>
	<up-avatar :src="avatarUrl" :size="size"></up-avatar>
</template>
<script setup lang="ts">
import env from "@/config/env";
import { computed } from "vue";

interface IProps {
	avatar: string | AnyObject;
	size?: string | number;
}
const props = withDefaults(defineProps<IProps>(), {
	avatar: "",
	size: 40,
});

const avatarUrl = computed(() => {
	if (props.avatar && typeof props.avatar !== "string") {
		return `${env.baseUrl}${props.avatar.url}`;
	} else {
		return props.avatar;
	}
});
</script>
