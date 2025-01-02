<template>
	<view
		class="calendar-wrapper"
		:style="{ background: config.themeColor }"
		@touchend="onTouchEnd"
		@touchstart="onTouchStart"
	>
		<view class="header" v-if="headerBar">
			<view class="preWidth" @click="changeMonth('pre')">
				<view class="pre"></view>
			</view>
			<view @tap="openDateSelectFn">{{
				date.y + "年" + formatNum(date.m) + "月"
			}}</view>
			<view class="nextWidth" @click="changeMonth('next')">
				<view class="next"></view>
			</view>
		</view>
		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{
				item
			}}</view>
		</view>
		<view
			:class="{ hide: !monthOpen }"
			class="content"
			:style="{ height: height }"
		>
			<view :style="{ top: positionTop + 'rpx' }" class="days">
				<view class="item" v-for="(item, index) in months" :key="index">
					<view
						class="day"
						@click="selectOne(item)"
						:class="{
							choose:
								choose === `${item.year}-${item.month}-${item.day}` &&
								item.isCurM,
							nolm: !item.isCurM,
							today: isToday(item.year, item.month, item.day),
							isWorkDay: isWorkDay(item.year, item.month, item.day),
							isFutureDay: isFutureDay(item.year, item.month, item.day),
							isMarkDay: isMarkDay(item.year, item.month, item.day),
						}"
					>
						{{ Number(item.day) }}
					</view>
					<view class="today-text">{{
						item.solarFestival || item.lunarDayName
					}}</view>
				</view>
			</view>
		</view>
		<view
			class="weektoggle"
			@click="toggle"
			:style="{ background: config.themeColor }"
		>
			<view
				class="iconfont icon-up-zhankai"
				v-if="collapsible && !monthOpen"
			></view>
			<view
				class="iconfont icon-up-shouqi"
				v-if="collapsible && monthOpen"
			></view>
		</view>
	</view>

	<!-- 日期选择器 -->
	<up-datetime-picker
		:show="showDate"
		v-model="dateVal"
		mode="year-month"
		closeOnClickOverlay
		@confirm="selectYearMonthFn"
		@cancel="showDate = false"
		@close="showDate = false"
	></up-datetime-picker>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { config } from "@/config";
import LunarCalendar from "lunar-calendar";
import { DayVo } from "@/typing";
import { useAppStore } from "@/store";

interface IProps {
	// 星期几为第一天(0为星期日)
	weekstart?: number;
	// 标记的日期
	markDays?: string[];
	// 是否展开
	open?: boolean;
	// 是否可收缩
	collapsible?: boolean;
	// 未来日期是否不可点击
	disabledAfter?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
	weekstart: 0,
	markDays: () => [],
	open: true,
	collapsible: true,
	disabledAfter: true,
});
const emit = defineEmits(["onDayClick", "onMonthClick"]);

const appStore = useAppStore();
const showDate = ref(false);
const dateVal = ref();
const weektext = reactive(["日", "一", "二", "三", "四", "五", "六"]);
const months = ref<DayVo[]>([]);
const date = reactive({
	y: new Date().getFullYear(), // 年
	m: new Date().getMonth() + 1, // 月
});
// 月份切换按钮
const headerBar = ref(false);
// 打开月份
const monthOpen = ref(false);
const positionTop = ref(0);
const choose = ref("");
const dayHeight = ref(100);

onMounted(() => {
	getMonthDay(date.y, date.m);

	props.open ? toggle() : calculateTop();
	choose.value = getToday().date;
});

/**
 * @description 顶部星期栏
 * */
const weekDay = computed(() => {
	return weektext
		.slice(props.weekstart)
		.concat(weektext.slice(0, props.weekstart));
});

/**
 * @description 收起的高度
 * */
const height = computed(() => {
	return `${Math.ceil(months.value.length / 7) * dayHeight.value}rpx`;
});

/**
 * @description 获取一个月所以天数数据
 * @param y 年
 * @param m 月
 * */
const getMonthDay = (y: string | number, m: string | number) => {
	const mounts = LunarCalendar.calendar(y, m, true).monthData;
	months.value = mounts.map((item: any) => ({
		...item,
		isCurM: item.month === date.m,
		month: formatNum(item.month),
		day: formatNum(item.day),
	}));
};

/**
 * @description 把小于10的数字转换两位数
 * @param num 数字
 * */
const formatNum = (num: number | string) => {
	const res = Number(num);
	return res < 10 ? `0${res}` : res;
};

/**
 * @description 获取今天日期
 * */
const getToday = () => {
	const date = new Date();
	const y = date.getFullYear();
	const m = date.getMonth();
	const d = date.getDate();
	const week = new Date().getDay();
	const weekText = ["日", "一", "二", "三", "四", "五", "六"];
	const formatWeek = `星期${weekText[week]}`;
	const today = {
		date: `${y}-${formatNum(m + 1)}-${formatNum(d)}`,
		week: formatWeek,
	};
	return today;
};

/**
 * @description 是否工作日
 * */
const isWorkDay = (y: number, m: number, d: number) => {
	const ymd = `${y}/${m}/${d}`;
	const formatDY = new Date(ymd.replace(/-/g, "/"));
	const week = formatDY.getDay();
	return !(week === 0 || week === 6);
};

/**
 * @description 是否未来日期
 * */
const isFutureDay = (y: number, m: number, d: number) => {
	const ymd = `${y}/${m}/${d}`;
	const formatDY = new Date(ymd.replace(/-/g, "/"));
	const showTime = formatDY.getTime();
	const curTime = new Date().getTime();
	return showTime > curTime;
};

/**
 * @description 标记日期
 * @param y 年
 * @param m 月
 * @param d 天
 * */
const isMarkDay = (y: number, m: number, d: number) => {
	let flag = false;
	const dy = `${y}-${m}-${d}`;
	for (let i = 0; i < props.markDays.length; i++) {
		if (props.markDays[i] === dy) {
			flag = true;
		}
	}
	return flag;
};

/**
 * @description 是否是今天
 * @param y 年
 * @param m 月
 * @param d 天
 * */
const isToday = (y: number, m: number, d: number) => {
	const checkD = `${y}-${m}-${d}`;
	const today = getToday().date;
	if (checkD === today) {
		return true;
	}
	return false;
};

/**
 * @description 展开收起
 * */
const toggle = () => {
	monthOpen.value = !monthOpen.value;
	headerBar.value = !headerBar.value;
	calculateTop();
};
const calculateTop = () => {
	if (monthOpen.value) {
		positionTop.value = 0;
	} else {
		let index = -1;
		months.value.filter((i: any, x) => {
			isToday(i.year, i.month, i.day) && (index = x);
		});
		positionTop.value =
			-((Math.ceil((index + 1) / 7) || 1) - 1) * dayHeight.value;
	}
};

/**
 * @description 点击回调
 * @param i 索引
 * */
const selectOne = (i: any) => {
	const date = `${i.year}-${i.month}-${i.day}`;
	const selectD = new Date(date).getTime() - 8 * 60 * 60 * 1000;
	const curTime = new Date().getTime();
	const week = new Date(date).getDay();
	const weekText = ["日", "一", "二", "三", "四", "五", "六"];
	const formatWeek = `星期${weekText[week]}`;
	const response = {
		date,
		week: formatWeek,
	};
	if (!i.isCurM) {
		// console.log('不在当前月范围内');
		return false;
	}
	if (selectD > curTime) {
		if (props.disabledAfter) {
			// console.error('未来日期不可选')
			uni.showToast({
				title: "未来日期不可点击",
				icon: "none",
			});
			return false;
		}
		choose.value = date;
		emit("onDayClick", response);
	} else {
		choose.value = date;
		emit("onDayClick", response);
	}
};

/**
 * @description 更新年月
 * @param type pre-上一个月，next-下一个月
 * */
const changeMonth = (type: string) => {
	if (type === "pre") {
		if (date.m + 1 === 2) {
			date.m = 12;
			date.y -= 1;
		} else {
			date.m -= 1;
		}
	} else if (date.m + 1 === 13) {
		date.m = 1;
		date.y += 1;
	} else {
		date.m += 1;
	}
	getMonthDay(date.y, date.m);
	emit("onMonthClick", `${date.y}-${formatNum(date.m)}-01`);
};

/**
 * @description 打开时间选择器
 * */
const openDateSelectFn = () => {
	showDate.value = true;
	dateVal.value = new Date(`${date.y}-${date.m}`).getTime();
};

/**
 * @description 选择年月
 * */
const selectYearMonthFn = () => {
	date.y = new Date(dateVal.value).getFullYear(); // 年
	date.m = new Date(dateVal.value).getMonth() + 1; // 月
	getMonthDay(date.y, date.m);
	showDate.value = false;
};

/**
 * @description 手指按下执行函数
 * @param e
 * */
const onTouchStart = (e: any) => {
	appStore.onTouchStart(e);
};

/**
 * @description 手指抬起执行函数
 * @param e
 * */
const onTouchEnd = async (e: any) => {
	const res = await appStore.onTouchEnd(e);
	if (res === "left") {
		changeMonth("pre");
	} else {
		changeMonth("next");
	}
};
</script>

<style lang="scss" scoped>
.calendar-wrapper {
	color: #fff;
	font-size: 28rpx;
	text-align: center;
	padding-bottom: 10rpx;
	box-shadow: 0 25px rgba(2, 92, 245, 0.34);
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		.preWidth,
		.nextWidth {
			//background: rgba(red, 0.3);
			background: red;
			width: 50rpx;
			height: 50rpx;
			border-radius: 10rpx;
			padding: 10rpx;
			margin: 0 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.pre,
		.next {
			width: 0;
			height: 0;
			border-top: 20rpx solid transparent;
			border-bottom: 20rpx solid transparent;
		}
		.pre {
			margin-right: 30rpx;
			border-right: 20rpx solid #fff;
			margin-right: 10rpx;
		}
		.next {
			margin-left: 30rpx;
			border-left: 20rpx solid #fff;
			margin-left: 10rpx;
		}
	}

	.week {
		display: flex;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		view {
			flex: 1;
		}
	}

	.content {
		position: relative;
		overflow: hidden;
		transition: height 0.4s ease;
		.days {
			transition: top 0.3s;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			position: relative;

			.item {
				position: relative;
				display: block;
				height: 100rpx;
				width: calc(100% / 7);
				.day {
					font-style: normal;
					display: inline-block;
					vertical-align: middle;
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					overflow: hidden;
					border-radius: 20rpx;
					color: yellow;
					&.choose {
						background-color: yellow;
						color: skyblue;
					}
					/*不可选月份*/
					&.isFutureDay {
						background-color: rgba(244, 244, 245, 0.87);
						color: #909399;
					}

					/*当月没有的月份*/
					&.nolm {
						color: #fff;
						opacity: 0.3;
						background-color: #00000000;
					}

					/*标记的日期*/
					&.isMarkDay {
						background-color: red;
					}
				}
				.isWorkDay {
					color: #fff;
				}
				.notSigned {
					font-style: normal;
					width: 8rpx;
					height: 8rpx;
					background: #fa7268;
					border-radius: 10rpx;
					position: absolute;
					left: 50%;
					bottom: 0;
					pointer-events: none;
				}
				.today {
					color: #8f939c;
					background-color: #e9e9eb;
				}
				/*工作日*/
				.workDay {
					font-style: normal;
					width: 8rpx;
					height: 8rpx;
					background: red;
					border-radius: 10rpx;
					position: absolute;
					left: 50%;
					bottom: 0;
					pointer-events: none;
				}

				/*标记日期*/
				.markDay {
					font-style: normal;
					width: 8rpx;
					height: 8rpx;
					background: red;
					border-radius: 50%;
					position: absolute;
					left: 50%;
					bottom: 0;
					pointer-events: none;
				}

				/*今天显示*/
				.today-text {
					width: 100%;
					position: absolute;
					font-size: 18rpx;
					height: 20rpx;
					line-height: 20rpx;
					left: 0;
					text-align: center;
					@include line-feed(1);
				}
			}
		}
	}

	.hide {
		height: 80rpx !important;
	}
	.dropDown {
		width: 50rpx;
		height: 50rpx;
		background-color: #fc7a64;
	}
	.weektoggle {
		width: 50px;
		height: 25px;
		position: relative;
		bottom: -27px;
		left: calc(50vw - 25px);
		background-color: #fe6766;
		border-radius: 0 0 20rpx 20rpx;
		//padding: 10rpx;
		image {
			width: 25rpx;
			height: 18rpx;
		}
	}
}
</style>
