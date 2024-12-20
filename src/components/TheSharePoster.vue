<template>
	<!-- 海报容器 -->
	<up-popup
		mode="center"
		round="10"
		closeable
		:safeAreaInsetBottom="false"
		:show="showPoster"
		:customStyle="{
			// backgroundImage:
			// 	'url(https://pic.imgdb.cn/item/67321472d29ded1a8c9e825b.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			position: 'relative',
		}"
		@close="closeSharePosterFn"
	>
		<canvas
			class="myCanvas"
			style="width: 300px; height: 550px"
			id="firstCanvas"
			canvas-id="firstCanvas"
		/>

		<view class="dark" v-if="status.showLoading">
			<view class="dark-contain">
				<up-line-progress :percentage="status.progress"></up-line-progress>
				<text style="text-align: center; margin-top: 10px">生成中...</text>
			</view>
		</view>

		<view class="button">
			<view class="btn btn-close" @tap.stop="closeSharePosterFn">取消</view>
			<view class="btn btn-notarize" @tap.stop="savePoster(posterImage)"
				>下载海报</view
			>
		</view>
	</up-popup>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from "vue";
import { canvasFun } from "@/config";
import { useSharePosterStore, useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const sharePosterStore = useSharePosterStore();
const { userInfo } = storeToRefs(userStore);
const { posterContent, showPoster, status } = storeToRefs(sharePosterStore);
const { closeSharePosterFn } = sharePosterStore;
const posterImage = ref("");
const instance = getCurrentInstance();
const canvas = reactive({
	width: 0,
	height: 0,
});
const avatar =
	"https://img.picgo.net/2024/12/18/avatar_defaultb45ecabee4bd9e80.webp";
// Canvas 绘制上下文
const image = new Image();
const bg_image = new Image();
const qrCode_url = new Image();
// Canvas 画布的实际绘制宽高
const renderWidth = 300;
const renderHeight = 550;
// 底部容器高度
const bottomBoxHeight = 150;
// 二维码宽度、高度
const qrCodeLong = 80;
// 底部容器padding值
const boxPadding = 10;
const avatarWidth = 50;

const initCanvas = async () => {
	const ctx = uni.createCanvasContext("firstCanvas", instance);

	try {
		// Canvas 对象

		// 初始化画布大小
		const dpr = uni.getWindowInfo().pixelRatio;
		canvas.width = renderWidth;
		canvas.height = renderHeight;
		// ctx.scale(dpr, dpr);

		// 绘制前清空画布
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 背景色
		// ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		canvasFun.drawRoundRect(
			ctx,
			0,
			0,
			renderWidth,
			renderHeight,
			10,
			"#FFFFFF"
		);
		// 画布裁剪
		ctx.clip();

		// 背景图片
		await canvasFun.drawImage(
			ctx,
			bg_image,
			posterContent.value.posterBgImageUrl! ||
				"https://pic.imgdb.cn/item/67321472d29ded1a8c9e825b.jpg",
			0,
			0,
			renderWidth,
			renderHeight,
			10
		);

		// 底部容器
		canvasFun.bottomBoxToArc(
			ctx,
			0,
			renderHeight - bottomBoxHeight,
			renderWidth,
			150,
			60,
			"#FFFFFF"
		);

		// 旅游景点名字
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "45px myFont";
		canvasFun.drawTextVertical(
			ctx,
			posterContent.value.name! || "泰山",
			20,
			40
		);

		// 用户名称
		ctx.fillStyle = "#000000";
		ctx.font = "16px myFont";
		canvasFun.canvasWraptitleText(
			ctx,
			userInfo.value.userName,
			boxPadding + avatarWidth + 5,
			renderHeight - (40 + boxPadding),
			renderWidth - (qrCodeLong + boxPadding * 4),
			16,
			1
		);
		// 用户签名信息
		ctx.fillStyle = "#999999";
		ctx.font = "12px myFont";
		canvasFun.canvasWraptitleText(
			ctx,
			userInfo.value.signature || "我用十年青春，赴你最后之约",
			boxPadding + avatarWidth + 5,
			renderHeight - (boxPadding + 24),
			renderWidth - (qrCodeLong + boxPadding * 4),
			12,
			2
		);
		// 头像
		await canvasFun.drawAvatar(
			ctx,
			image,
			avatar,
			boxPadding,
			renderHeight - (60 + boxPadding),
			avatarWidth / 2
		);

		// 分享二维码
		// const shareQr = "data:image/png;base64," + posterContent.value.qrCode;
		const shareQr =
			"data:image/png;base64,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";
		// await canvasFun.drawImage(
		// 	ctx,
		// 	qrCode_url,
		// 	shareQr,
		// 	renderWidth - (qrCodeLong + boxPadding),
		// 	renderHeight - (qrCodeLong + boxPadding),
		// 	qrCodeLong,
		// 	qrCodeLong
		// );

		// 绘画成功后生成图片
		ctx.draw(false, () => {
			uni.canvasToTempFilePath({
				canvasId: "firstCanvas",
				// 这里修改保存的图片格式
				fileType: "jpg",
				width: renderWidth,
				height: renderHeight,
				// 输出的宽高设置了4倍，一定程度上解决了canvas模糊的问题
				destWidth: renderWidth * dpr * 5,
				destHeight: renderWidth * dpr * 5 * (renderHeight / renderWidth),
				quality: 1,
				success: function (res: { tempFilePath: string }) {
					console.log(res);
					uni.$u.toast("海报生成成功");
					status.value.progress = 100;
					status.value.showLoading = false;
					posterImage.value = res.tempFilePath;
				},
				fail: function (err: { errMsg: string }) {
					console.log(err.errMsg);
					status.value.showLoading = false;
					uni.$u.toast("海报生成失败:" + err.errMsg);
				},
			});
		});
	} catch (e) {
		status.value.showLoading = false;
		console.log(e);
	}
};

// setTimeout(() => {
// 	initCanvas();
// }, 2000);

uni.$on("init-canvas", () => {
	initCanvas();
});

/**
 * 保存海报图片
 * */
const savePoster = (url: string) => {
	uni.saveImageToPhotosAlbum({
		filePath: url,
		success: function () {
			uni.showToast({
				title: "保存成功",
				icon: "none",
				duration: 1500,
			});
		},
		fail(err) {
			if (
				err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
				err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
				err.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
			) {
				uni.showModal({
					title: "提示",
					content: "需要您授权保存相册",
					showCancel: false,
					success: (modalSuccess) => {
						uni.openSetting({
							success(settingdata) {
								if (settingdata.authSetting["scope.writePhotosAlbum"]) {
									uni.saveImageToPhotosAlbum({
										filePath: url,
										success: function () {
											uni.showToast({
												title: "保存成功",
												icon: "success",
												duration: 2000,
											});
										},
									});
								} else {
									uni.showToast({
										title: "授权失败，请稍后重新获取",
										icon: "none",
										duration: 1500,
									});
								}
							},
						});
					},
				});
			}
		},
	});
};
</script>

<style lang="scss" scoped>
.dark {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	padding: 50px;
	background-color: rgba(255, 255, 255, 0.2); /* 半透明背景 */
	backdrop-filter: blur(10px); /* 创建毛玻璃效果 */
	border-radius: 10px;
	&-contain {
		margin-top: 200px;
		display: flex;
		flex-direction: column;
		color: #19be6b;
	}
}
/*底部按钮*/
.button {
	position: absolute;
	display: flex;
	width: 300px;
	box-sizing: border-box;
	justify-content: space-around;
	margin-top: 50rpx;
	.btn {
		color: #fff;
		width: 180rpx;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		&-close {
			text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #fa3534,
				0 0 82px #fa3534, 0 0 92px #fa3534, 0 0 102px #fa3534, 0 0 151px #fa3534;
			background: rgba(250, 53, 52, 0.2);
			border: 1rpx solid #fa3534;
		}
		&-notarize {
			text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
				0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
			background: rgba(0, 255, 170, 0.1);
			border: 1rpx solid #0fa;
		}
	}
}
</style>
