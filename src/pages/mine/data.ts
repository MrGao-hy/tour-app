import { ActionMenu } from "@components/TheFunctionCol.vue";

export const actionMenu: ActionMenu[] = [
	{
		key: 1,
		icon: "close-circle",
		label: "退出登录",
		url: "/pages/pages-user/login/Index",
	},
	{
		key: 2,
		icon: "edit-pen",
		label: "修改信息",
		url: "/pages/pages-user/userInfo/Index",
	},
	{
		key: 3,
		icon: "lock",
		label: "修改密码",
		url: "/pages/pages-user/editPassword/Index",
	},
	{
		key: 4,
		icon: "man-delete",
		label: "注销用户",
		url: "",
	},
];

export const functionMenu = [
	{
		label: "我的礼品",
		icon: "lipin",
		url: "/pages/pages-user/order/orderList/Index",
	},
	{
		label: "收货地址",
		icon: "shouhuodizhi",
		url: "/pages/pages-user/shippingAddress/list/Index",
	},
];

export const toolsMenu = [
	{
		label: "豆包",
		icon: "doubao",
		url: "/pages/pages-function/chatGPT/Index?webUrl=https://www.doubao.com/chat/?channel=baidu_pz&source=db_baidu_pz_01&keywordid=weizhi7&title=豆包",
	},
	{
		label: "文心一言",
		icon: "doubao",
		url: "/pages/pages-function/chatGPT/Index?webUrl=https://yiyan.baidu.com/&title=文心一言",
	},
	{
		label: "联系我们",
		icon: "lianxiwomen",
		url: "/pages/pages-function/relation/Index",
	},
];

// 图片高度
export const initImageHeight = 250;
