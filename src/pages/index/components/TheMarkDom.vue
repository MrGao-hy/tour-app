<template>
	<up-popup
		:show="show"
		zIndex="10086"
		closeable
		mode="center"
		round="20"
		:customStyle="{
			width: '500rpx',
			padding: '80rpx 40rpx 40rpx',
		}"
		@close="onClose"
	>
		<view class="title">对本次旅行打个分吧</view>
		<up-form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="uFormRef"
			labelWidth="60"
		>
			<up-form-item label="满意度" prop="mark" borderBottom ref="item1">
				<up-rate :count="5" size="24" v-model="model.mark"></up-rate>
			</up-form-item>
			<up-form-item prop="comment" borderBottom>
				<up-textarea
					v-model="model.comment"
					count
					height="100"
					maxlength="520"
					placeholder="我用十年青春,赴你最后之约"
				></up-textarea>
			</up-form-item>
		</up-form>
		<up-button
			type="primary"
			text="提交"
			style="margin-top: 40rpx"
			@click="submitMarkFn"
		></up-button>
	</up-popup>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { markMountApi } from "@/api";
import { MarkMountType } from "@/typing";
import { useSharePosterStore } from "@/store";

interface IProps {
	show: boolean;
	id: string;
}
const props = withDefaults(defineProps<IProps>(), {
	show: false,
	id: "",
});
const emit = defineEmits(["handleClose"]);

const sharePosterStore = useSharePosterStore();
const { id } = toRefs(props);
const uFormRef = ref();
const model: MarkMountType = reactive({
	id: "",
	mountId: "",
	comment: "",
	mark: "",
});
const rules = reactive({
	mark: [
		{
			required: true,
			message: "请对本次旅行打出满意分",
			type: "number",
			trigger: ["change"],
		},
	],
	comment: [
		{
			required: true,
			message: "请对本次旅行写出你宝贵的建议",
			trigger: ["blur", "change"],
		},
	],
});

/**
 * 提交对本次旅行满意度
 * */
const submitMarkFn = async () => {
	uFormRef.value
		.validate()
		.then(async (valid: boolean) => {
			if (valid) {
				await markMountApi(Object.assign(model, { mountId: id.value }));
				emit("handleClose");
			}
		})
		.catch(() => {
			// 处理验证错误
			uni.$u.toast("校验失败");
		});
};

/**
 * 关闭弹窗
 * */
const onClose = () => {
	emit("handleClose");
};
</script>

<style lang="scss" scoped>
.title {
	font-size: 35rpx;
	text-align: center;
	transform: translateY(-40rpx);
}
</style>
