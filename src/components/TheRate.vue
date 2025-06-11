<template>
	<up-rate
		v-model="value"
		:size="size"
		:readonly="readonly"
		:activeIcon="
			Number(value) == 3
				? config.rate.ordinary
				: Number(value) > 3
				? config.rate.happy
				: config.rate.grieved
		"
		:inactiveIcon="config.rate.default"
		@change="changeFn"
	></up-rate>
</template>
<script setup lang="ts">
import { config } from "@/config";
import { ref, watch } from "vue";

interface IProps {
	modelValue: number | string;
	size: string | number;
	readonly: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
	modelValue: 0,
	size: 18,
	readonly: false,
});
const value = ref<string | number>(props.modelValue);

const emit = defineEmits(["update:modelValue", "handleChange"]);

watch(
	() => value.value,
	(newVal) => {
		emit("update:modelValue", newVal);
	}
);

const changeFn = () => {
	emit("handleChange");
};
</script>
