import { defineStore } from "pinia";
import { clearVal } from "hfyk-app";
import { getTodayIntegralCountApi, userInfoApi, userLoginApi } from "@/api";
import { UserType } from "@/typing";
import { config } from "@/config";

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

export const useUserStore = defineStore(`${config.prefix}user`, {
	state: () => ({
		userInfo: {} as UserType,
		isFirst_1: true,
		isFirst_2: true,
		savePath: "",
		todayIntegralCount: 0,
	}),
	getters: {},
	actions: {
		/**
		 * 登录
		 * */
		async loginFn(username: string, password: string) {
			const login = await userLoginApi(username, password);
			uni.setStorageSync(`${config.prefix}token`, login.token);
			console.log(this.savePath);
			if (!this.savePath || this.savePath === "/pages/pages-user/login/Index")
				return uni.switchTab({ url: "/pages/index/Index" });

			if (["/pages/index/Index", "/pages/mine/Index"].includes(this.savePath)) {
				uni.$emit("queryMountList");
				await uni.switchTab({
					url: this.savePath,
				});
			} else {
				await uni.redirectTo({
					url: this.savePath,
				});
			}
			await this.getUserInfo();
			uni.$u.toast("登录成功");
		},
		/**
		 * 查询用户信息
		 * */
		async getUserInfo() {
			this.userInfo = await userInfoApi();
		},
		/**
		 * 提示or退出登录
		 * */
		outLogin(code: number, title = "是否退出登录") {
			uni.showModal({
				title,
				showCancel: false,
				confirmText: code === 40004 || code === 40005 ? "登录" : "我知道了",
				success: async (res) => {
					if (res.confirm && (code === 40004 || code === 40005)) {
						uni.removeStorageSync(`${config.prefix}token`);
						clearVal(this.userInfo);
						await uni.navigateTo({
							url: "/pages/pages-user/login/Index",
						});
						const pages = getCurrentPages();
						this.savePath = pages[0].$page.fullPath;
					}
				},
			});
		},
		/**
		 * @description 获取个人当天获得的积分
		 * */
		async getToDayIntegralCount() {
			this.todayIntegralCount = await getTodayIntegralCountApi();
		},
	},
	// @ts-ignore
	unistorage: true,
});
