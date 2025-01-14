<template>
	<!-- 礼品列表 -->
	<up-waterfall v-if="list.length" v-model="list">
		<template v-slot:left="{ leftList }">
			<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
				<the-goods-dom :good="item"></the-goods-dom
			></view>
		</template>
		<template v-slot:right="{ rightList }">
			<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
				<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
				<the-goods-dom :good="item"></the-goods-dom>
			</view>
		</template>
	</up-waterfall>
</template>

<script setup lang="ts">
import { GoodsVo } from "@/typing";
import TheGoodsDom from "@/pages/pages-task/goods/goodsList/components/TheGoodsDom.vue";
import { onMounted, ref, watch } from "vue";

interface IProps {
	goodsList: GoodsVo[];
}
const props = withDefaults(defineProps<IProps>(), {});
const list = ref();
watch(
	() => props.goodsList,
	(newVal) => {
		list.value = newVal;
	},
	{ deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
