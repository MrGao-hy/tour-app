import { defineStore } from "pinia";

export const useAppStore = defineStore("diary_app", {
	state: () => {
		return {
			currentTab: 0,
			startX: 0,
		};
	},
	actions: {
		clickTabBar(val: number) {
			this.currentTab = val;
		},
		/**
		 * 手指按下执行函数
		 * */
		onTouchStart(e: any) {
			if (e.changedTouches.length == 1) {
				//设置触摸起始点水平方向位置
				this.startX = e.changedTouches[0].pageX;
			}
		},
		onTouchEnd(e: any) {
			return new Promise((resolve) => {
				if (e.changedTouches.length == 1) {
					//手指移动结束后水平位置
					const endX = e.changedTouches[0].pageX;
					const diff = endX - this.startX;
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
		},
	},
});
