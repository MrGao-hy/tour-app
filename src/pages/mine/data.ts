import { ActionMenu } from "@components/TheFunctionCol.vue";

export const actionMenu: ActionMenu[] = [
	{
		key: 1,
		icon: "account",
		label: "退出登录",
		url: "/pages/pages-user/login/Index",
	},
	{
		key: 2,
		icon: "setting",
		label: "修改信息",
		url: "/pages/pages-user/userInfo/Index",
	},
	{
		key: 3,
		icon: "arrow-down-fill",
		label: "修改密码",
		url: "/pages/pages-user/userInfo/Index",
	},
	{
		key: 4,
		icon: "man-delete",
		label: "注销用户",
		url: "/pages/pages-user/userInfo/Index",
	},
];

// 图片高度
export const initImageHeight = 500;
