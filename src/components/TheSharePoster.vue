<template>
	<!-- 海报容器 -->
	<up-popup
		mode="center"
		round="10"
		closeable
		:safeAreaInsetBottom="false"
		:show="showPoster"
		:customStyle="{
			backgroundImage:
				'url(https://pic.imgdb.cn/item/67321472d29ded1a8c9e825b.jpg)',
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
			type="2d"
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
import { getCurrentInstance, ref } from "vue";
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

const initCanvas = () => {
	uni
		.createSelectorQuery()
		.in(instance)
		.select("#firstCanvas")
		.fields({ node: true, size: true })
		.exec(async (res) => {
			if (res[0]) {
				try {
					// Canvas 对象
					const canvas = res[0].node;
					// Canvas 画布的实际绘制宽高
					const renderWidth = res[0].width;
					const renderHeight = res[0].height;
					// Canvas 绘制上下文
					const ctx = canvas.getContext("2d");
					const image = canvas.createImage();
					const bg_image = canvas.createImage();
					const qrCode_url = canvas.createImage();
					// 底部容器高度
					const bottomBoxHeight = 150;
					// 二维码宽度、高度
					const qrCodeLong = 80;
					// 底部容器padding值
					const boxPadding = 10;

					// 初始化画布大小
					const dpr = uni.getWindowInfo().pixelRatio;
					canvas.width = renderWidth * dpr;
					canvas.height = renderHeight * dpr;
					ctx.scale(dpr, dpr);

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
						posterContent.value.posterBgImageUrl!,
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
					canvasFun.drawTextVertical(ctx, posterContent.value.name!, 20, 40);

					// 用户名称
					ctx.fillStyle = "#000000";
					ctx.font = "16px myFont";
					canvasFun.canvasWraptitleText(
						ctx,
						userInfo.value.userName,
						boxPadding,
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
						userInfo.value.signature,
						boxPadding,
						renderHeight - (boxPadding + 24),
						renderWidth - (qrCodeLong + boxPadding * 4),
						12,
						2
					);

					// 分享二维码
					const shareQr = "data:image/png;base64," + posterContent.value.qrCode;
					await canvasFun.drawImage(
						ctx,
						qrCode_url,
						shareQr,
						renderWidth - (qrCodeLong + boxPadding),
						renderHeight - (qrCodeLong + boxPadding),
						qrCodeLong,
						qrCodeLong
					);
					// 头像
					// const avatar = "";
					// const res2 = await canvasFun.drawImage(
					// 	ctx,
					// 	image,
					// 	avatar,
					// 	20,
					// 	20,
					// 	50,
					// 	50
					// );

					wx.canvasToTempFilePath({
						canvas: canvas,
						// 这里修改保存的图片格式
						fileType: "jpg",
						width: renderWidth,
						height: renderHeight,
						// 输出的宽高设置了4倍，一定程度上解决了canvas模糊的问题
						destWidth: renderWidth * dpr * 5,
						destHeight: renderWidth * dpr * 5 * (renderHeight / renderWidth),
						quality: 1,
						success: function (res: { tempFilePath: string }) {
							uni.$u.toast("海报生成成功");
							status.value.progress = 100;
							status.value.showLoading = false;
							posterImage.value = res.tempFilePath;
						},
						fail: function (err: { errMsg: string }) {
							status.value.showLoading = false;
							uni.$u.toast("海报生成失败:" + err.errMsg);
						},
					});
				} catch (e) {
					status.value.showLoading = false;
					console.log(e);
				}
			}
		});
};

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
