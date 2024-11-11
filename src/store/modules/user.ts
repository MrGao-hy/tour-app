import { defineStore } from "pinia";
import { clearVal } from "hfyk-app";
import { userInfoApi, userLoginApi } from "@/api";
import { UserType } from "@/typing";
import conf from "@/config/env";

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

export const useUserStore = defineStore("user", {
	unistorage: true,
	state: () => ({
		userInfo: {} as UserType,
	}),
	getters: {},
	actions: {
		/**
		 * 登录
		 * */
		async loginFn(username: string, password: string) {
			const login = await userLoginApi(username, password);
			uni.$u.toast("登录成功");
			uni.setStorageSync("diary_token", login.token);

			await uni.switchTab({
				url: "/pages/index/Index",
			});
			await this.getUserInfo();
		},
		/**
		 * 查询用户信息
		 * */
		async getUserInfo() {
			const info = await userInfoApi();
			this.userInfo = Object.assign(info, {
				avatar: conf.baseUrl + info.avatar,
			});
		},
		/**
		 * 提示or退出登录
		 * */
		outLogin(code: number, title = "是否退出登录") {
			uni.showModal({
				title,
				showCancel: false,
				confirmText: code === 40004 ? "登录" : "我知道了",
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
