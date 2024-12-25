<!--
  Author: 高先华
  Date: 2022-05-11 10:36:02
  LastEditTime: 2022-05-16 10:59:52
  Description: 登录页面
  FilePath: \src\pages-user\login\Index.vue
-->

<template>
	<yk-login
		:customUserValidator="UserNumValidator"
		:PwdNumValidator="PwdNumValidator"
		prefix="tour"
		logo=""
		:themeColor="config.themeColor"
		@login="loginMsgFn"
		@handleClickMenu="selectActionFn"
	></yk-login>

	<!--没有网络的状态-->
	<u-no-network></u-no-network>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { config } from "@/config";
import { useUserStore } from "@/store";

interface LoginType {
	user: string;
	pwd: string;
}
const UserNumValidator = ref({
	min: 2,
	max: 11,
	message: "长度在2-11个字符之间",
	trigger: ["change"],
});
const PwdNumValidator = ref({
	min: 6,
	max: 18,
	message: "长度在6-18个字符之间",
	trigger: ["change"],
});
const userStore = useUserStore();

// 子传父提示登录信息
const loginMsgFn = (options: LoginType) => {
	userStore.loginFn(options.user, options.pwd);
};

/**
 * 注册或者忘记密码
 * */
const selectActionFn = (index: number) => {
	switch (index) {
		case 0:
			uni.navigateTo({
				url: "/pages/pages-user/register/Index",
			});
			break;
		case 1:
			uni.$u.toast("该功能暂时未开发，程序员正在加班加点赶");
			break;
		default:
			uni.$u.toast("出错了");
			break;
	}
};
</script>

<style lang="scss" scoped></style>
