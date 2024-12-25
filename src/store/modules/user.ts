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
		userInfo: {} as {
			[key: string]: UserType;
		},
		isFirst_1: true,
		isFirst_2: true,
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

			const pages = getCurrentPages();
			// 上一个页面的路由数据
			const prevPage = pages[pages.length - 2];
			console.log(prevPage);
			if (!prevPage) {
				await uni.switchTab({
					url: "/pages/index/Index",
				});
			} else {
				// 首页因为有缓存，所以需要queryMountList重新加载数据
				if (
					["pages/index/Index", "pages/mine/Index"].includes(prevPage.route)
				) {
					uni.$emit("queryMountList");
					await uni.navigateBack({
						delta: 1,
					});
				} else {
					await uni.redirectTo({
						url: prevPage.$page.fullPath,
					});
				}
			}
			await this.getUserInfo();
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
						uni.removeStorageSync("diary_token");
						clearVal(this.userInfo);
						await uni.navigateTo({
							url: "/pages/pages-user/login/Index",
						});
					}
				},
			});
		},
	},
});
