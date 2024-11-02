/**
 * @returns 返回刚刚
 * */
export const formatTime = (inputTime: any) => {
	const now = new Date();
	const old = new Date(inputTime);
	const oldDate = new Date(inputTime).getTime();
	const timeDiff: number = now.getTime() - new Date(inputTime).getTime(); // 时间差，以毫秒为单位

	const oneMinute = 60 * 1000; // 一分钟
	const threeMinutes = 3 * oneMinute; // 三分钟
	const oneHour = 60 * oneMinute; // 一小时
	const oneDay = 24 * oneHour; // 一天
	const seven = 7 * oneDay; // 七天

	const oneDate = now.setHours(0, 0, 0, 0); // 当天零点时间戳
	const oneYear = new Date(now.getFullYear(), 0, 1).getTime(); // 当年一月一号时间戳

	const year = old.getFullYear();
	const month = (old.getMonth() + 1).toString();
	const day = old.getDate().toString();
	const house = old.getHours().toString();
	const min = old.getMinutes().toString();

	if (oneDate - seven < oldDate) {
		if (timeDiff < threeMinutes) {
			return "刚刚";
		} else if (old.getDate() === now.getDate()) {
			return `${house}:${min}`;
		} else if (now.getDate() - old.getDate() == 1) {
			return "昨天";
		} else if (now.getDate() - old.getDate() == 2) {
			return "前天";
		}
		return "三天前";
	} else {
		if (oldDate < oneYear) {
			return `${year}-${month}-${day}`;
		}
		return `${month}-${day}`;
	}
};

import Base64 from "./base64";
let base64 = new Base64();

/**
 * 加密函数
 * @param {any} data 对象
 * @return { string } 加密字符串
 * */
export function encryptData(data) {
	return base64.encode(JSON.stringify(data));
}

/**
 * 解密函数
 * @param {string} encryptedData 加密字符串
 * @returns { any | any[] } 解码的数据
 * */
export function decryptData(encryptedData) {
	return JSON.parse(base64.decode(encryptedData.toString()));
}
