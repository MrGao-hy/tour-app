<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 修改密码页面
  FilePath: \src\pages-user\editPassword\Index.vue
-->
<template>
	<view class="edit-pwd">
		<yk-form
			:columns="columns"
			:formData="pwd"
			:labelWidth="70"
			:formRules="rules"
			ref="pwdRef"
		></yk-form>
		<up-button
			:color="config.themeColor"
			@click="editPasswordFn"
			text="修改密码"
		></up-button>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { TypeEnum } from "hfyk-app";
import { config } from "@/config";
import { editPasswordApi } from "@/api";

const pwdRef = ref<any>(null);
const columns = [
	{ field: "password1", label: "原密码", type: TypeEnum.PASSWORD },
	{ field: "password2", label: "新密码", type: TypeEnum.PASSWORD },
	{ field: "password3", label: "确认密码", type: TypeEnum.PASSWORD },
];
const pwd = reactive({
	password1: "",
	password2: "",
	password3: "",
});
const rules = {
	password1: [
		{
			required: true,
			message: "请输入原密码",
			// blur和change事件触发检验
			trigger: ["blur", "change"],
		},
	],
	password2: [
		{
			required: true,
			message: "请输入新密码",
			// blur和change事件触发检验
			trigger: ["blur", "change"],
		},
	],
	password3: {
		validator: (rule: any, value: string, callback: any) => {
			if (value == undefined) {
				callback("请再次输入新密码");
				// password2 是表单上绑定的字段
			} else if (value != pwd.password2) {
				callback("两次输入密码不一致!");
			} else {
				callback();
			}
		},
	},
};

/**
 * @description 修改密码
 * */
const editPasswordFn = () => {
	pwdRef.value.formRef.validate().then((valid: boolean) => {
		if (valid && pwd.password2 === pwd.password3) {
			editPasswordApi(pwd.password1, pwd.password3);
		}
	});
};
</script>

<style lang="scss" scoped>
.edit-pwd {
	padding: $gxh-border-margin-padding-base;
}
</style>
