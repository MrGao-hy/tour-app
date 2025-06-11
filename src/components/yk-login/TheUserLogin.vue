<template>
	<view class="user-login">
		<u-form
			:model="userForm"
			ref="form_1Ref"
			:rules="userRules"
			labelWidth="30"
		>
			<!--账户输入-->
			<u-form-item prop="userName">
				<u-input
					v-model="userForm.userName"
					:placeholder="userPlaceholder"
					:clearable="true"
					border="bottom"
				>
					<!-- #ifndef APP-PLUS-NVUE -->
					<template #prefix>
						<u-icon name="account" :color="themeColor"></u-icon>
					</template>
					<template #suffix>
						<u-icon
							:name="!showChoice ? 'arrow-down-fill' : 'arrow-up-fill'"
							@tap="showChoice = !showChoice"
							:color="themeColor"
						></u-icon>
						<view class="dialog-view" v-if="showChoice && choiceList.length">
							<view
								class="dialog-title"
								v-for="(item, index) in choiceList"
								:key="index"
								@click="btnChoiceClick(index)"
							>
								{{ item.userName }}
							</view>
						</view>
					</template>
					<!-- #endif -->
				</u-input>
			</u-form-item>

			<!--密码输入-->
			<u-form-item prop="password">
				<u-input
					:type="showPwd ? 'input' : 'password'"
					v-model="userForm.password"
					:placeholder="pwdPlaceholder"
					:clearable="true"
					border="bottom"
					:password-icon="false"
				>
					<!-- #ifndef APP-PLUS-NVUE -->
					<template #prefix>
						<u-icon name="lock" :color="themeColor"></u-icon>
					</template>
					<template v-if="isShowPwd" #suffix>
						<u-icon
							size="16"
							@click="showPasswordFn"
							color="#c8c9cc"
							:name="showPwd ? 'eye-fill' : 'eye-off'"
						></u-icon>
					</template>
					<!-- #endif -->
				</u-input>
			</u-form-item>

			<!--验证码-->
			<u-form-item prop="code">
				<u-input
					v-model="userForm.code"
					placeholder="请输入验证码"
					:clearable="true"
					border="bottom"
				>
					<!-- #ifndef APP-PLUS-NVUE -->
					<template #prefix>
						<u-icon name="account" :color="themeColor"></u-icon>
					</template>
					<template #suffix>
						<u-image
							:src="verifyCode"
							width="100"
							height="46"
							mode="scaleToFill"
						></u-image>
					</template>
					<!-- #endif -->
				</u-input>
			</u-form-item>
		</u-form>
		<!-- 记住密码 -->
		<view class="mui-input-row mui-checkbox">
			<u-checkbox-group v-model="rememberPassword" @change="checkboxChange">
				<u-checkbox
					label="记住密码"
					name="1"
					:active-color="themeColor"
				></u-checkbox>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { onHide } from "@dcloudio/uni-app";
import { getLoginCodeApi } from "@/api";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { decryptData, encryptData } from "hfyk-app";
import { config } from "@/config";

interface IProps {
	themeColor: string;
	prefix: string;
	isShowPwd: boolean;
	userPlaceholder: string;
	pwdPlaceholder: string;
	customUserValidator: Record<string, any>;
	customPwdValidator: Record<string, any>;
	userNumValidator: Record<string, any>;
	pwdNumValidator: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
	themeColor: "",
	prefix: "gxh",
	isShowPwd: false,
	userPlaceholder: "",
	pwdPlaceholder: "",
	customUserValidator: () => ({}),
	customPwdValidator: () => ({}),
	userNumValidator: () => ({}),
	pwdNumValidator: () => ({}),
});
const emit = defineEmits(["handleHistory", "handleCheckbox"]);
const userInfoStore = useUserStore();
const { userForm, choiceList, rememberPsw } = storeToRefs(userInfoStore);

const showPwd = ref<boolean>(false);
const showChoice = ref<boolean>(false);
const form_1Ref = ref();
// 效验用户名和密码
const userRules = reactive({
	name: [
		{
			required: true,
			message: "请先输入账号",
			// 可以单个或者同时写两个触发验证方式
			trigger: ["blur", "change"],
		},
		props.customUserValidator,
		props.userNumValidator,
	],
	pwd: [
		{
			required: true,
			message: "请输入密码",
			// 可以单个或者同时写两个触发验证方式
			trigger: ["blur", "change"],
		},
		props.pwdNumValidator,
		props.customPwdValidator,
	],
});
const rememberPassword = computed({
	get: () => {
		return userInfoStore.rememberPsw;
	},
	set: (newValue) => {
		userInfoStore.rememberPsw = newValue;
	},
});
const account = uni.getStorageSync(`${props.prefix}_account`);
const accountList = uni.getStorageSync(`${props.prefix}_choiceList`);
const verifyCode = ref("");

onMounted(() => {
	refreshVerifyCodeFn();
	if (!account) return;
	const result = decryptData(account);
	//有缓存就赋值给文本没有就清空
	rememberPsw.value = result.rememberPsw;
	if (account) {
		//获取缓存的账号和密码
		userForm.value.userName = result.userName;
		userForm.value.password = result.password;
	} else {
		userForm.value.userName = "";
		userForm.value.password = "";
	}
	if (accountList) {
		choiceList.value = decryptData(accountList);
	}
});

onHide(() => {
	if (!account) return;
	//获取缓存的账号和密码
	const { userName, password } = decryptData(account);
	if (choiceList.value.length) {
		// 过滤数判断是否有一样的账号
		const filterArr = choiceList.value.filter((item) => {
			return item.userName === userName;
		});
		// 有一样的账号退出函数不执行下面的
		if (filterArr.length) return;
	}
	// 判断是否有保存账号和密码
	if (userName && password) {
		// 数组前面加数据
		choiceList.value.unshift({
			userName,
			password,
		});
		// 数组最多只放三个账号
		if (choiceList.value.length >= 5) {
			choiceList.value.splice(5, 1);
		}
		uni.setStorageSync(
			`${props.prefix}_choiceList`,
			encryptData(choiceList.value)
		);
	}
});

/**
 * 登录效验
 * */
const loginFn = () => {
	return new Promise((resolve, reject) => {
		form_1Ref.value
			.validate()
			.then((res) => {
				resolve("success" + res);
			})
			.catch((err) => {
				reject("error" + err);
			});
	});
};

/**
 * @desc 刷新验证码
 * */
const refreshVerifyCodeFn = () => {
	const uuid: string = new Date().getTime().toString();
	uni.setStorageSync(config.prefix + "uuid", uuid);
	getLoginCodeApi({
		uuid,
	}).then((res) => {
		verifyCode.value = "data:image/png;base64," + res;
	});
};

/**
 * 勾选是否记住密码
 * */
const checkboxChange = (n: string[]) => {
	rememberPsw.value = n[0] ? 1 : 0;
	emit("handleCheckbox", n);
};

/**
 * 选择历史账号
 * */
const btnChoiceClick = (index: number) => {
	showChoice.value = false;
	userForm.value.userName = choiceList.value[index].userName;
	userForm.value.password = choiceList.value[index].password;
	emit("handleHistory");
};

/**
 * 长按操作历史账户
 * 0-复制
 * 1-删除
 * */
const extensionFun = (index: number, username: string) => {
	switch (index) {
		case 0:
			const i = choiceList.value.findIndex((item) => item.user === username);
			choiceList.value.splice(i, 1);
			uni.setStorageSync(
				`${props.prefix}_choiceList`,
				encryptData(choiceList.value)
			);
			break;
		default:
			break;
	}
};

const showPasswordFn = () => {
	showPwd.value = !showPwd.value;
};
interface LoginExpose {
	loginFn: () => void;
}

defineExpose<LoginExpose>({
	loginFn,
});
</script>

<style lang="scss" scoped>
.user-login {
	:deep(.u-input__content__subfix-icon) {
		position: relative;

		.dialog-view {
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-radius: 20rpx;
			border: 1rpx solid #cacaca;
			background-color: white;
			position: absolute;
			overflow: hidden;
			top: 50rpx;
			right: 10rpx;
			z-index: 999;

			.dialog-title {
				white-space: nowrap;
				height: 100%;
				color: #a6a6a6;
				overflow: hidden;
				font-size: 28rpx;
				text-align: center;
				padding: 10rpx 30rpx;
				border-top: 1rpx solid rgba(128, 128, 128, 0.233);
			}
		}
	}

	.iconfont {
		font-size: 40rpx;
	}
}
</style>
