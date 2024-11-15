<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import conf from "@/config/env";

uni.loadFontFace({
	family: "myFont",
	global: true,
	source: `url("${conf.baseUrl}/font/方正黄草简体.ttf")`,
	scopes: ["webview", "native"],
	success() {},
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
@font-face {
	font-family: "Bitstream";
	src: url("http://127.0.0.1:9000/diary/font/AlimamaDongFangDaKai-Regular.ttf")
		format("truetype");
}
view,
button,
text {
	box-sizing: border-box;
	font-family: "Bitstream";
}
page {
	/* #ifndef H5 */
	height: 100%;
	/* #endif */
	/* #ifdef H5 */
	height: calc(100% - 55px);
	/* #endif */
}
uni-modal {
	z-index: 999999 !important;
}
</style>
