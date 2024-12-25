<template>
	<!-- 海报容器 -->
	<up-popup
		mode="center"
		round="10"
		closeable
		:safeAreaInsetBottom="false"
		:show="showPoster"
		:customStyle="{
			backgroundImage: `url(${bgUrl})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			position: 'relative',
			overflow: 'hidden',
		}"
		@close="closeSharePosterFn"
	>
		<view class="dark" v-if="status.showLoading">
			<view class="dark-contain">
				<up-line-progress :percentage="status.progress"></up-line-progress>
				<text style="text-align: center; margin-top: 10px">生成中...</text>
			</view>
		</view>

		<canvas
			v-if="!posterImage"
			class="myCanvas"
			:style="{
				width: $u.addUnit(renderWidth),
				height: $u.addUnit(renderHeight),
			}"
			id="firstCanvas"
			canvas-id="firstCanvas"
		/>
		<up-image
			v-else
			:src="posterImage"
			:width="renderWidth"
			:height="renderHeight"
		></up-image>

		<view class="button">
			<view class="btn btn-close" @tap.stop="closeSharePosterFn">取消</view>
			<view class="btn btn-notarize" @tap.stop="savePoster(posterImage)"
				>下载海报</view
			>
		</view>
	</up-popup>
</template>

<script lang="ts" setup>
import QRCode from "qrcode";
import { getCurrentInstance, reactive, ref } from "vue";
import { canvasFun } from "@/config";
import { useSharePosterStore, useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const sharePosterStore = useSharePosterStore();
const { userInfo } = storeToRefs(userStore);
const { posterContent, showPoster, status, posterImage } =
	storeToRefs(sharePosterStore);
const { closeSharePosterFn } = sharePosterStore;
const instance = getCurrentInstance();
const canvas = reactive({
	width: 0,
	height: 0,
});
// Canvas 绘制上下文
const image = new Image();
const bg_image = new Image();
const qrCode_Image = new Image();
// Canvas 画布的实际绘制宽高
const renderWidth = 300;
const renderHeight = 500;
// 底部容器高度
const bottomBoxHeight = 150;
// 二维码宽度、高度
const qrCodeLong = 80;
// 底部容器padding值
const boxPadding = 10;
const avatarWidth = 50;
const avatar = "https://img2.baidu.com/it/u=525862022,1873122894&fm=253";
const qrCode =
	"https://gxh151.top/h5/#/pages/pages-mount/mountDetail/Index?id=";
const bgUrl =
	"https://k.sinaimg.cn/n/sinakd20118/448/w1024h1824/20240401/0620-60976d49e464a4092c2c6f01f0dfc520.jpg/w700d1q75cms.jpg";
const signature = "我用十年青春，赴你最后之约";
const ctx = uni.createCanvasContext("firstCanvas", instance);

const initCanvas = async () => {
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
		// ctx.fillRect(0, 0, canvas.width, canvas.height);
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
			posterContent.value.posterBgImageUrl! || bgUrl,
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
		canvasFun.drawTextVertical(
			ctx,
			posterContent.value.name! || "山",
			20,
			40,
			"#FFFFFF",
			"45px myFont"
		);

		// 竖线
		canvasFun.drawLine(ctx, 65, 40, 65, 200, 2);

		// 小标题
		canvasFun.drawTextVertical(
			ctx,
			"山不在高，有仙则灵",
			75,
			80,
			"#FFFFFF",
			"18px myFont"
		);

		// 用户名称
		ctx.fillStyle = "#000000";
		ctx.font = "16px Bitstream";
		canvasFun.canvasWraptitleText(
			ctx,
			userInfo.value.userName,
			boxPadding + avatarWidth + 5,
			renderHeight - avatarWidth,
			renderWidth - (qrCodeLong + boxPadding * 4),
			16,
			1
		);
		// 用户签名信息
		ctx.fillStyle = "#999999";
		ctx.font = "12px Bitstream";
		canvasFun.canvasWraptitleText(
			ctx,
			userInfo.value.signature || signature,
			boxPadding + avatarWidth + 5,
			renderHeight - (avatarWidth - 16),
			renderWidth - (qrCodeLong + avatarWidth + boxPadding * 3),
			12,
			2
		);

		// 分享二维码
		console.log(qrCode + posterContent.value.id);
		const shareQr = await QRCode.toDataURL(qrCode + posterContent.value.id);

		await canvasFun.drawImage(
			ctx,
			qrCode_Image,
			shareQr,
			renderWidth - (qrCodeLong + boxPadding),
			renderHeight - (qrCodeLong + boxPadding),
			qrCodeLong,
			qrCodeLong
		);
		// 头像
		await canvasFun.drawAvatar(
			ctx,
			image,
			avatar,
			boxPadding,
			renderHeight - (avatarWidth + boxPadding * 2),
			avatarWidth / 2
		);

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
					posterImage.value = res.tempFilePath;
					uni.$u.toast("海报生成成功");
					status.value.progress = 100;
					status.value.showLoading = false;
				},
				fail: function (err: { errMsg: string }) {
					status.value.showLoading = false;
					uni.$u.toast("海报生成失败:" + err.errMsg);
				},
			});
		});
	} catch (e) {
		status.value.showLoading = false;
		console.error(e);
	}
};

uni.$on("init-canvas", () => {
	initCanvas();
});

/**
 * 保存海报图片
 * */
const savePoster = (base64Url: string) => {
	if (status.value.showLoading) return;
	// 提取Base64编码的图片数据部分
	const base64Data = base64Url.replace(/^data:image\/\w+;base64,/, "");

	// 将Base64编码的图片数据转换为Uint8Array
	const byteString = atob(base64Data);
	const arrayBuffer = new ArrayBuffer(byteString.length);
	const intArray = new Uint8Array(arrayBuffer);
	for (let i = 0; i < byteString.length; i++) {
		intArray[i] = byteString.charCodeAt(i);
	}

	// 创建一个Blob对象
	const blob = new Blob([arrayBuffer], { type: "image/png" });

	// 创建一个下载链接
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "image.png"; // 设置下载的文件名
	document.body.appendChild(a);
	a.click();

	// 移除下载链接
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
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
