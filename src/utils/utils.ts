import Base64 from "./base64";
let base64 = new Base64();
const timerFormat = (num: string | number) => {
	return `${Number(num) < 10 ? `0${num}` : num}`;
};

/**
 * @description 获取时间处理
 * @param inputTime 时间
 * @returns
 * */
export const formatTimeToString = (inputTime: any) => {
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
			return `${timerFormat(house)}:${timerFormat(min)}`;
		} else if (now.getDate() - old.getDate() == 1) {
			return "昨天";
		} else if (now.getDate() - old.getDate() == 2) {
			return "前天";
		}
		return "三天前";
	} else {
		if (oldDate < oneYear) {
			return `${year}-${timerFormat(month)}-${timerFormat(day)}`;
		}
		return `${timerFormat(month)}-${timerFormat(day)}`;
	}
};

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

/**
 * 如果数值超过10000，就转为万单位
 * @param num 例：10345
 * @return String 例：10万
 */
export const formatNumber = (num: number | string): string => {
	num = parseInt(String(num), 10);

	if (num >= 0 && num < 10000) {
		return num.toString();
	}
	if (num >= 10000 && num < 100000000) {
		return `${(num / 10000).toFixed(1)}万`;
	}
	return `${(num / 100000000).toFixed(1)}亿`;
};

/**
 * 时间转换为格式 04:31
 * @param time timeStamp时间戳
 * @return string 04:31
 */
export const durationConvert = (time: number | string) => {
	let secondTime = parseInt(time.toString(), 10); // 秒
	let minuteTime = 0; // 分

	if (secondTime > 60) {
		// 如果秒数大于60，将秒数转换成整数
		// 获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(String(secondTime / 60), 10);
		// 获取秒数，秒数取余，得到整数秒数
		secondTime = parseInt(String(secondTime % 60), 10);
		// 如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			// 获取小时后取余的分，获取分钟除以60取余的分
			minuteTime = parseInt(String(minuteTime % 60), 10);
		}
	}
	let result;
	if (secondTime >= 10) {
		result = `${parseInt(String(secondTime), 10)}秒`;
	} else {
		result = `0${parseInt(String(secondTime), 10)}秒`;
	}

	if (minuteTime > 0) {
		result = `${parseInt(String(minuteTime), 10)}分${result}`;
	}
	// console.log('result',result);
	return result;
};
