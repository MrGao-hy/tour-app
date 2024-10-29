<!--
  Author: GaoXianHua
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 注册页面
  FilePath: \diary\src\pages-user\register\Index.vue
-->

<template>
	<view class="register register-page">
		<yk-form
			ref="ykFormRef"
			:columns="columns"
			:formData="userFormData"
			labelWidth="80"
			labelAlign="right"
			:formRules="rules"
		></yk-form>
		<up-button type="success" text="注册" @click="registerUserFn"></up-button>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { registerUserApi } from "@/api";
import { TypeEnum } from "hfyk-app";

const userFormData = reactive({
	userName: "",
	password: "",
	phone: "",
	idCard: "",
	address: "",
});
const ykFormRef = ref();
const columns = reactive([
	{ field: "userName", label: "用户名", type: TypeEnum.INPUT, required: true },
	{ field: "password", label: "密码", type: TypeEnum.INPUT, required: true },
	{ field: "phone", label: "手机号", type: TypeEnum.INPUT, required: true },
	{ field: "idCard", label: "身份证号", type: TypeEnum.ID_CARD },
	{ field: "address", label: "家庭住址", type: TypeEnum.INPUT },
]);
const rules = reactive({
	userName: [
		{
			required: true,
			message: "请输入您的账号",
			trigger: ["blur", "change"],
		},
		{
			min: 2,
			max: 11,
			message: "长度在2-11个字符之间",
			trigger: ["blur", "change"],
		},
	],
	password: [
		{
			required: true,
			message: "请输入您的密码",
			trigger: ["blur", "change"],
		},
		{
			min: 6,
			max: 18,
			message: "长度在6-18个字符之间",
			trigger: ["blur", "change"],
		},
		{
			validator: (rule, value, callback) => {
				return /^[A-Za-z0-9@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i.test(value);
			},
			message: "密码应该为大小写字母或数字或特殊符号",
			trigger: ["change", "blur"],
		},
	],
	phone: [
		{
			required: true,
			message: "请输入您的手机号",
			trigger: ["blur", "change"],
		},
		{
			validator: (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			},
			message: "手机号码不正确",
			trigger: ["change", "blur"],
		},
	],
});

const registerUserFn = () => {
	ykFormRef.value.formRef.validate().then(async (res: any) => {
		const register = await registerUserApi(userFormData);
		await uni.redirectTo({
			url: "/pages/pages-user/login/Login",
		});
	});
};
</script>

<style lang="scss" scoped>
.register {
	padding: 10rpx 20rpx;
	height: 100vh;
	.u-button {
		box-sizing: border-box;
		margin-top: 700rpx;
	}
}
</style>
