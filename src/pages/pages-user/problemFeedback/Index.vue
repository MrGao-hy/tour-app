<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 问题反馈界面
  FilePath: \diary\src\pages-user\matter\Index.vue
-->

<template>
	<view class="problemFeedback">
		<up-form :model="problemForm" ref="problemRef" :rules="rules">
			<view class="problemFeedback__title"
				><text style="color: red">*</text>反馈类别</view
			>
			<up-form-item labelWidth="0" prop="type">
				<view class="problemFeedback__class-main">
					<up-tag
						v-for="(item, index) in types"
						:key="item.name"
						:text="item.name"
						:name="item.name"
						:plain="!item.checked"
						@click="checkTypesFn"
					></up-tag>
				</view>
			</up-form-item>
			<view class="problemFeedback__title">
				<text style="color: red">*</text>联系方式(QQ/微信/手机号/邮箱)
			</view>
			<up-form-item labelWidth="0" prop="contactWay">
				<up-input
					v-model="problemForm.contactWay"
					placeholder="请留下您的联系方式,我们可能会联系您进行沟通"
				></up-input>
			</up-form-item>
			<view class="problemFeedback__title">
				<text style="color: red">*</text>详细描述
			</view>
			<up-form-item labelWidth="0" prop="problemDescription">
				<up-textarea
					v-model="problemForm.problemDescription"
					placeholder="请填写10字以上的问题描述，以便我们更好的帮助您解决问题，提高产品质量"
					height="120"
					maxlength="200"
					count
				></up-textarea>
			</up-form-item>

			<up-button
				type="primary"
				text="提交反馈"
				@click="submitProblemFn"
			></up-button>
		</up-form>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { feedbackApi } from "@/api";

const problemRef = ref(null);
const types = ref([
	{
		name: "功能建议",
		checked: false,
	},
	{
		name: "内容建议",
		checked: false,
	},
	{
		name: "BUG反馈",
		checked: false,
	},
	{
		name: "界面建议",
		checked: false,
	},
	{
		name: "交互建议",
		checked: false,
	},
	{
		name: "其他",
		checked: false,
	},
]);
// 表单内容
const problemForm = reactive({
	type: "",
	problemDescription: "",
	contactWay: "",
});
const rules = ref({
	type: [
		{
			required: true,
			message: "请选择反馈类别",
		},
	],
	problemDescription: [
		{
			required: true,
			message: "请填写你需要的描述内容",
			trigger: ["blur", "change"],
		},
		{
			min: 10,
			message: "问题描述至少十个字",
			trigger: ["change"],
		},
	],
	contactWay: [
		{
			required: true,
			message: "请填写联系方式",
			trigger: ["blur", "change"],
		},
	],
});

const checkTypesFn = (name: string) => {
	types.value.map((item, i) => {
		item.checked = name === item.name;
	});
	problemForm.type = name;
};

const submitProblemFn = () => {
	problemRef.value.validate().then(async () => {
		await feedbackApi(problemForm);
	});
};
</script>

<style lang="scss" scoped>
.problemFeedback {
	padding: 20rpx;

	&__title {
		font-size: 40rpx;
		font-width: 500;
		margin: 10px 0;
	}

	&__class-main {
		height: 70px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		:deep(.u-tag) {
			width: 150rpx;
			display: flex;
			justify-content: center;
		}
	}

	:deep(.u-textarea) {
		background: $gxh-bg-color-grey;
	}
	.u-button {
		margin-top: 100px;
		box-shadow: $gxh-box-shadow;
	}
}
</style>
