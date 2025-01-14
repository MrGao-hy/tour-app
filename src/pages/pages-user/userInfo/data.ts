import { TypeEnum } from "hfyk-app";

export const constellationList = [
	[
		"水瓶座",
		"双鱼座",
		"白羊座",
		"金牛座",
		"双子座",
		"巨蟹座",
		"狮子座",
		"处女座",
		"天秤座",
		"天蝎座",
		"射手座",
		"摩羯座",
	],
];

export const educationList = [
	["小学", "初中", "高中", "中专", "大专", "本科", "研究生"],
];

export const sexList = [
	{
		name: "男生",
		value: "男生",
	},
	{
		name: "女生",
		value: "女生",
	},
	{
		name: "保密",
		value: "保密",
	},
];

export const columns = [
	{ field: "userName", label: "用户名", type: TypeEnum.INPUT },
	{
		field: "avatar",
		label: "网络头像",
		type: TypeEnum.INPUT,
		placeholder: "请直接上传网络头像地址",
	},
	{ field: "name", label: "真实姓名", type: TypeEnum.INPUT },
	{ field: "phone", label: "手机号", type: TypeEnum.INPUT },
	{ field: "idCard", label: "身份证", type: TypeEnum.INPUT },
	{ field: "sex", label: "性别", type: TypeEnum.RADIO, actions: sexList },
	{ field: "emit", label: "邮箱", type: TypeEnum.INPUT },
	{ field: "birthDate", label: "出生日期", type: TypeEnum.DATE, mode: "date" },
	{
		field: "constellation",
		label: "星座",
		type: TypeEnum.SELECT,
		column: constellationList,
	},
	{
		field: "education",
		label: "学历",
		type: TypeEnum.SELECT,
		column: educationList,
	},
	{ field: "school", label: "学校", type: TypeEnum.INPUT },
	{ field: "major", label: "专业", type: TypeEnum.INPUT },
	{ field: "address", label: "住址", type: TypeEnum.INPUT },
];
