<template>
	<view class="history">
		<view class="history-style">
			<span class="font-12 font-b">历史搜索</span>
			<up-icon
				name="trash"
				color="#808080"
				size="20"
				:bold="true"
				@click="delHistoryFn"
			>
			</up-icon>
		</view>
		<!-- 历史记录 -->
		<view class="tag">
			<template v-for="(item, index) in historyList" :key="index">
				<view class="tag-margin">
					<up-tag
						@click="searchEvent(item)"
						:text="item"
						bgColor="#EBEBEB"
						size="mini"
						borderColor="transparent"
						color="black"
					>
					</up-tag>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { config } from "@/config";

const emit = defineEmits(["handleSearch"]);
const historyList: string[] = reactive([]);

onMounted(() => {
	const history = uni.getStorageSync(`${config.prefix}history`);
	if (!!history) {
		historyList.push(...JSON.parse(history));
	}
});

const setHistoryFn = (val: string) => {
	if (!historyList.includes(val)) {
		if (historyList.length >= 20) {
			historyList.pop();
		}
		historyList.unshift(val);
		uni.setStorageSync(`${config.prefix}history`, JSON.stringify(historyList));
	}
};
/**
 * @description 删除历史搜索记录
 * */
const delHistoryFn = () => {
	historyList.length = 0;
	uni.removeStorageSync(`${config.prefix}history`);
};

/**
 * @description 点击按钮查询
 * */
const searchEvent = (val: string) => {
	emit("handleSearch", val);
};

defineExpose({
	setHistoryFn,
});
</script>

<style lang="scss" scoped>
.history {
	padding: $gxh-border-margin-padding-sm;
	&-style {
		display: flex;
		justify-content: space-between;
		color: $gxh-text-color-placeholder;
	}
	.tag {
		display: flex;
		flex-wrap: wrap;
		margin-top: $gxh-border-margin-padding-lg;

		&-margin {
			margin-right: $gxh-border-margin-padding-base;
			margin-bottom: $gxh-border-margin-padding-base;
		}
	}
}
</style>
