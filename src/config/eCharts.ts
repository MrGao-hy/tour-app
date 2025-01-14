import * as echarts from "echarts";
import { ref } from "vue";

const integral = ref(0);
const chart = ref();
const echartsFn = {
	option: {
		series: [
			{
				type: "gauge",
				center: ["50%", "70%"],
				startAngle: 240,
				endAngle: -60,
				min: 0,
				max: 10,
				splitNumber: 10,
				radius: "90%",
				itemStyle: {
					color: "#EEE8AA",
				},
				progress: {
					show: true,
					width: 15,
				},
				pointer: {
					show: false,
				},
				axisLine: {
					lineStyle: {
						width: 15,
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				anchor: {
					show: false,
				},
				title: {
					offsetCenter: [0, "-20%"],
					fontSize: 10,
					color: "#FAFAD2",
				},
				detail: {
					valueAnimation: true,
					width: "50%",
					lineHeight: 10,
					borderRadius: 8,
					offsetCenter: [0, 10],
					fontSize: 18,
					fontWeight: "bolder",
					formatter: "{value} 积分",
					color: "#FAFAD2",
				},
				data: [
					{
						name: "每日获取的积分",
						value: integral.value,
					},
				],
			},
			{
				type: "gauge",
				center: ["50%", "70%"],
				radius: "90%",
				startAngle: 240,
				endAngle: -60,
				min: 0,
				max: 10,
				itemStyle: {
					color: "#DAA520",
				},
				progress: {
					show: true,
					width: 5,
				},
				pointer: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				detail: {
					show: false,
				},
				data: [
					{
						value: integral.value,
					},
				],
			},
		],
	},
	initChart: (val: number) => {
		// 获取 canvas 节点
		const chartDom = document.getElementById("integral_chart");
		if (chartDom) {
			chart.value = echarts.init(chartDom);
			// 改变当前值
			echartsFn.option.series[0].data[0].value = val;
			echartsFn.option.series[1].data[0].value = val;
			// 配置图表的选项
			chart.value.setOption(echartsFn.option);
		}
	},
	destroyChart: () => {
		chart.value.dispose();
	},
};

export default echartsFn;
