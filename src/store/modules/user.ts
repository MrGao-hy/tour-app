import { defineStore } from "pinia";
import { clearVal } from "hfyk-app";
import { getTodayIntegralCountApi, userInfoApi, userLoginApi } from "@/api";
import { UserType } from "@/typing";
import { config } from "@/config";
import { ref } from "vue";

export interface UserLoginType {
	/**
	 * 用户名
	 * */
	name: string;
	/**
	 * 密码
	 * */
	pwd: string;
}

// interface UserStore {
// 	userInfo: UserType;
// 	isFirst_1: boolean;
// 	isFirst_2: boolean;
// 	savePath: string;
// 	todayIntegralCount: number;
// 	loginFn(username: string, password: string): Promise<void>;
// 	getUserInfo(): Promise<void>;
// 	getToDayIntegralCount(): Promise<void>;
// 	outLogin(code: number, title?: string): void;
// }

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
		const isFirst_1 = ref(true);
		const isFirst_2 = ref(true);
		const savePath = ref("");
		const todayIntegralCount = ref(0);
		/**
		 * @description 登录
		 * */
		const loginFn = async (username: string, password: string) => {
			const login = await userLoginApi(username, password);
			uni.setStorageSync(`${config.prefix}token`, login.token);
			await getUserInfo();
			uni.$u.toast("登录成功");
			if (!savePath.value || savePath.value === "/pages/pages-user/login/Index")
				return uni.switchTab({ url: "/pages/index/Index" });

			if (
				["/pages/index/Index", "/pages/mine/Index"].includes(savePath.value)
			) {
				uni.$emit("queryMountList");
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
			uni.showModal({
				title,
				showCancel: false,
				confirmText: code === 40004 || code === 40005 ? "登录" : "我知道了",
				success: async (res) => {
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

			loginFn,
			getUserInfo,
			outLogin,
			getToDayIntegralCount,
		};
	},
	{
		unistorage: true,
	}
);
