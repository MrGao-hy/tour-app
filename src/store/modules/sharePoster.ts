import { defineStore } from "pinia";
import { MountType } from "@/typing";
import { createShareQrCodeApi } from "@/api";
import { reactive, ref } from "vue";

export const useSharePosterStore = defineStore("sharePoster", () => {
	const showPoster = ref<boolean>(false);
	const status = reactive({
		showLoading: false,
		progress: 0,
	});
	const posterContent = ref<MountType>();
	const posterImage = ref<string>("");
	/**
	 * @description 打开分享海报弹框
	 * @param temp 景区详情内容
	 * */
	const openSharePosterFn = (temp: MountType) => {
		showPoster.value = true;
		status.showLoading = true;
		const timer = setInterval(() => {
			if (status.progress > 100) {
				clearInterval(timer);
				return (status.progress = 99);
			}
			status.progress += 10;
		}, 300);
		// const res = await createShareQrCodeApi(
		// 	temp.id,
		// 	"pages/pages-mount/mountDetail/Index"
		// );
		posterContent.value = temp;
		uni.$emit("init-canvas", temp);
	};
	/**
	 * @description 关闭分享海报弹框
	 * */
	const closeSharePosterFn = () => {
		showPoster.value = false;
		status.showLoading = false;
		status.progress = 0;
		posterImage.value = "";
	};
	return {
		showPoster,
		status,
		posterContent,
		posterImage,

		openSharePosterFn,
		closeSharePosterFn,
	};
});
