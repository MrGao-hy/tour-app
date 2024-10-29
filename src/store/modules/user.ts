import { defineStore } from "pinia";
import { clearVal } from "hfyk-app";
import { userLoginApi } from "@/api";

export const useUserStore = defineStore("user", {
	state: () => ({
		userInfo: {},
	}),
	actions: {
		/**
		 * 登录
		 * */
		async loginFn(username: string, password: string) {
			const login = await userLoginApi(username, password);
			uni.$u.toast("登录成功");
			uni.setStorageSync("diary_token", login.token);

			await uni.navigateTo({
				url: "/pages/index/Index",
			});
		},
		/**
		 * 提示or退出登录
		 * */
		outLogin(code: number, title = "是否退出登录") {
			uni.showModal({
				title,
				showCancel: false,
				confirmText: code === 40001 ? "登录" : "我知道了",
				success: async (res) => {
					if (res.confirm && code === 40004) {
						uni.removeStorageSync("diary_token");
						clearVal(this.userInfo);
						await uni.redirectTo({
							url: "/pages/pages-user/login/Index",
						});
					}
				},
			});
		},
	},
});
