import { defineStore } from "pinia";
import { config } from "@/config";
import { ref } from "vue";

export const useAppStore = defineStore(`${config.prefix}app`, () => {
	const currentTab = ref(0);
	const startX = ref(0);
	const clickTabBar = (val: number) => {
		currentTab.value = val;
	};
	/**
	 * @description: 手指按下执行函数
	 * */
	const onTouchStart = (e: any) => {
		if (e.changedTouches.length == 1) {
			//设置触摸起始点水平方向位置
			startX.value = e.changedTouches[0].pageX;
		}
	};
	/**
	 * @description: 手指抬起执行函数
	 * */
	const onTouchEnd = (e: any) => {
		return new Promise((resolve) => {
			if (e.changedTouches.length == 1) {
				//手指移动结束后水平位置
				const endX = e.changedTouches[0].pageX;
				const diff = endX - startX.value;
				if (Math.abs(diff) > 80) {
					if (diff > 0) {
						resolve("left");
					} else {
						// console.log("右滑...");
						resolve("right");
					}
				}
			}
		});
	};

	return {
		currentTab,
		startX,

		clickTabBar,
		onTouchStart,
		onTouchEnd,
	};
});
