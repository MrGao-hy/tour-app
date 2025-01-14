import { TypeEnum } from "hfyk-app";

export const columns = [
	{
		field: "name",
		label: "联系人",
		type: TypeEnum.INPUT,
		required: true,
		placeholder: "收货人名字",
	},
	{ field: "phone", label: "手机号", type: TypeEnum.INPUT, required: true },
	{
		field: "add",
		label: "省/市/县",
		type: TypeEnum.ADDRESS,
		required: true,
		placeholder: "请选择",
	},
	{
		field: "address",
		label: "详细地址",
		type: TypeEnum.INPUT,
		required: true,
		placeholder: "详细地址与门牌号",
	},
	{ field: "defaultVal", label: "默认地址", type: TypeEnum.SWITCH },
	{ field: "remark", label: "备注", type: TypeEnum.TEXTAREA },
];
export const rules = {
	name: [
		{
			required: true,
			message: "请填写联系人",
			trigger: ["blur", "change"],
		},
	],
	phone: [
		{
			required: true,
			message: "请填写您的联系方式",
			trigger: ["blur", "change"],
		},
		{
			validator: (rule: any, value: string) => {
				return uni.$u.test.mobile(value);
			},
			message: "手机号码不正确",
			// 触发器可以同时用blur和change
			trigger: ["change", "blur"],
		},
	],
	add: [
		{
			required: true,
			message: "请选择省/市/县",
			trigger: ["blur", "change"],
		},
	],
	address: [
		{
			required: true,
			message: "请输入您的密码",
			trigger: ["blur", "change"],
		},
		{
			min: 2,
			max: 120,
			message: "长度在2-120之间",
			trigger: ["blur", "change"],
		},
	],
};
