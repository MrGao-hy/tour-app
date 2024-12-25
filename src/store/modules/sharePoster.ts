import { defineStore } from "pinia";
import { MountType } from "@/typing";
import { createShareQrCodeApi } from "@/api";

export const useSharePosterStore = defineStore("sharePoster", {
	state: () => ({
		showPoster: false,
		status: {
			showLoading: false,
			progress: 0,
		},
		posterContent: {} as MountType,
		posterImage: "",
	}),
	actions: {
		/**
		 * 打开分享海报弹框
		 * */
		async openSharePosterFn(temp: MountType) {
			this.showPoster = true;
			this.status.showLoading = true;
			const timer = setInterval(() => {
				if (this.status.progress > 100) {
					clearInterval(timer);
					return (this.status.progress = 99);
				}
				this.status.progress += 10;
			}, 300);
			// const res = await createShareQrCodeApi(
			// 	temp.id,
			// 	"pages/pages-mount/mountDetail/Index"
			// );
			this.posterContent = temp;
			setTimeout(() => {}, 500);
			uni.$emit("init-canvas", temp);
		},
		/**
		 * 关闭分享海报弹框
		 * */
		closeSharePosterFn() {
			this.showPoster = false;
			this.status.showLoading = false;
			this.status.progress = 0;
			this.posterImage = "";
		},
	},
});
