import { defineStore } from "pinia";
import { clearVal, DialogService, ResultParam } from "hfyk-app";
import { getTodayIntegralCountApi, userInfoApi, userLoginApi } from "@/api";
import { UserLoginType, UserType } from "@/typing";
import { config } from "@/config";
import { ref } from "vue";

export const useUserStore = defineStore(
	`${config.prefix}user`,
	() => {
		const userInfo = ref<UserType>({
			password: "",
			birthDate: "",
			constellation: "",
			emit: "",
			signature: "",
			id: "",
			userName: "",
			avatar: "",
			phone: "",
			sex: "",
		});
		const userForm = ref({
			userName: "",
			password: "",
			code: "",
		});
		const rememberPsw = ref(0);
		const choiceList = ref<UserLoginType[]>([]);

		const isFirst_1 = ref(true);
		const isFirst_2 = ref(true);
		const savePath = ref("");
		const todayIntegralCount = ref(0);
		/**
		 * @description 登录
		 * */
		const loginFn = async (options: UserLoginType) => {
			const login = await userLoginApi(options);
			uni.setStorageSync(`${config.prefix}token`, login.token);
			await getUserInfo();
			uni.$u.toast("登录成功");
			if (!savePath.value || savePath.value === "/pages/pages-user/login/Index")
				return uni.switchTab({ url: "/pages/index/Index" });

			if (
				["/pages/mount/Index", "/pages/mine/Index"].includes(savePath.value)
			) {
				await uni.switchTab({
					url: savePath.value,
				});
			} else {
				await uni.redirectTo({
					url: savePath.value,
				});
			}
		};
		/**
		 * @description 查询用户信息
		 * */
		const getUserInfo = async () => {
			userInfo.value = await userInfoApi();
		};
		/**
		 * @description 提示or退出登录
		 * */
		const outLogin = (code: number, title = "是否退出登录") => {
			DialogService.error({
				title,
				confirmText: code === 40004 || code === 40005 ? "登录" : "我知道了",
				result: async (res: ResultParam) => {
					if (res.confirm && (code === 40004 || code === 40005)) {
						uni.removeStorageSync(`${config.prefix}token`);
						clearVal(userInfo.value);
						await uni.navigateTo({
							url: "/pages/pages-user/login/Index",
						});
						const pages = getCurrentPages();
						savePath.value = pages[0].$page.fullPath;
					}
				},
			});
		};
		/**
		 * @description 提示
		 * */
		const promptMessage = (title: string, type = "warning") => {
			(DialogService as any)[type]({
				title,
				confirmText: "我知道了",
			});
		};
		/**
		 * @description 获取个人当天获得的积分
		 * */
		const getToDayIntegralCount = async () => {
			todayIntegralCount.value = await getTodayIntegralCountApi();
		};

		return {
			userInfo,
			isFirst_1,
			isFirst_2,
			savePath,
			todayIntegralCount,
			userForm,
			phoneForm: {
				phone: "",
				code: "",
			},
			rememberPsw,
			choiceList,
			// 选中账户信息
			choiceIndex: 0,
			secretKey: "hfyk",

			loginFn,
			getUserInfo,
			outLogin,
			promptMessage,
			getToDayIntegralCount,
		};
	},
	{
		unistorage: true,
	}
);
