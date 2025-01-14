<!--
  Author: 高先华
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 问题反馈界面
  FilePath: \diary\src\pages-user\matter\Index.vue
-->

<template>
	<view class="problemFeedback">
		<up-form
			:model="problemForm"
			ref="problemRef"
			:rules="rules"
			labelPosition="top"
		>
			<up-form-item
				labelWidth="100%"
				label="反馈类别"
				required
				prop="type"
				style="margin-bottom: 20rpx"
			>
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
			<up-form-item
				label="联系方式(QQ/微信/手机号/邮箱)"
				labelWidth="100%"
				required
				prop="contactWay"
				style="margin-bottom: 20rpx"
			>
				<up-input
					v-model="problemForm.contactWay"
					placeholder="留下您的联系方式,我们可能会联系您进行沟通"
				></up-input>
			</up-form-item>
			<up-form-item
				label="详细描述"
				labelWidth="100%"
				required
				prop="problemDescription"
				style="margin-bottom: 20rpx"
			>
				<up-textarea
					v-model="problemForm.problemDescription"
					placeholder="嗨😃，为了给您超贴心的服务，展开讲讲遇到的问题哦～不管是操作时遇到的小迷糊，像某个按键按了没反应；还是功能上的小纠结，例如想要的特效找不到；又或是页面显示的小异常，似图片加载不全之类的，都请您事无巨细地描述一番，最好能写 10 字以上，这样咱们携手，保准能把问题 “一举拿下”，让产品质量蹭蹭往上涨！"
					height="150"
					:confirmType="null"
					maxlength="520"
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
import { matterApi } from "@/api";

const problemRef = ref<any>(null);
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

/**
 * @description 选择问题类型
 * */
const checkTypesFn = (name: string) => {
	types.value.map((item, i) => {
		item.checked = name === item.name;
	});
	problemForm.type = name;
};

/**
 * @description 提交问题
 * */
const submitProblemFn = () => {
	problemRef.value.validate().then(async () => {
		await matterApi(problemForm);
		problemRef.value.resetFields();
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
		height: 90px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-around;
		:deep(.u-tag) {
			width: 200rpx;
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
