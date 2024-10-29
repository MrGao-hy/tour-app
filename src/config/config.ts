export const config = {
	themeColor: "#1485F6",
	pageSize: 15,
};

export const cookie = {
	set: function (key: string, val: any) {
		const date = new Date();
		const expiresHours = 9;
		date.setTime(date.getTime() + expiresHours * 3600);
		document.cookie =
			key + "=" + val + ";expires=" + date.toGMTString() + ";path=/";
	},
	get: function (key: string) {
		const getCookie = document.cookie.replace(/[ ]/g, "");
		const arrCookie = getCookie.split(";");
		let tips;
		for (let i = 0; i < arrCookie.length; i++) {
			const arr = arrCookie[i].split("=");
			if (key == arr[0]) {
				tips = arr[1];
				break;
			}
		}
		return tips;
	},
};
