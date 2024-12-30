interface KeyType {
	[key: string]: string | number;
}

interface AllIntegral extends KeyType {
	/**
	 * 总金额
	 * */
	money: number;
	/**
	 * 总积分
	 * */
	integral: number;
	/**
	 * 签到总天数
	 * */
	dayNum: number;
}

export interface DiaryType extends DiaryVo {
	/**
	 * id
	 * */
	id: number;
	/**
	 * 用户id
	 * */
	userId: string;
}

export interface DiaryVo {
	/**
	 * 标题
	 * */
	title: string;
	/**
	 * 任务
	 * */
	plan: string;
	/**
	 * 积分
	 * */
	integral: number;
	/**
	 * 签到时间
	 * */
	createDate: string;
	/**
	 * 日记内容
	 * */
	content: string;
}

export interface DayVo {
	GanZhiDay: string;
	GanZhiMonth: string;
	GanZhiYear: string;
	/**
	 * 天
	 * */
	day: number;
	/**
	 * 是否当月
	 * */
	isCurM: boolean;
	/**
	 * 农历日
	 * */
	lunarDay: number;
	/**
	 * 农历日名称
	 * */
	lunarDayName: string;
	/**
	 * 农历活动日
	 * */
	lunarFestival: string;
	/**
	 * 农历闰月
	 * */
	lunarLeapMonth: number;
	/**
	 * 农历月
	 * */
	lunarMonth: number;
	/**
	 * 农历月名字
	 * */
	lunarMonthName: string;
	/**
	 * 农历年
	 * */
	lunarYear: number;
	/**
	 * 月
	 * */
	month: number;
	/**
	 * 节日
	 * */
	solarFestival: string;
	term: string;
	worktime: number;
	/**
	 * 年
	 * */
	year: number;
	/**
	 * 黄道带
	 * */
	zodiac: string;
}
