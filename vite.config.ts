import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
import Unocss from "unocss/vite";
import conf from "./src/config/env";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	base: "/h5",
	plugins: [
		uni(),
		// https://github.com/antfu/unocss
		Unocss(),
		// 打包体积分析
		visualizer({
			open: true,
			filename: "visualizer.html", //分析图生成的文件名
		}),
	],
	build: {
		target: "esnext",
		// 开启minimize选项来进行代码压缩
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
		// 开启chunk大小警告
		chunkSizeWarningLimit: 2000,
	},
	server: {
		port: 8002,
		host: "0.0.0.0",
		proxy: {
			"/api/": {
				target: conf.baseUrl,
				changeOrigin: true,
				rewrite: (p) => p.replace(/^\/api/, ""),
			},
			"/api-prod/": {
				target: "http://localhost:3001",
				changeOrigin: true,
				rewrite: (p) => p.replace(/^\/api-prod/, ""),
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},
	css: {
		// 配置`scss`和`less`全局变量
		preprocessorOptions: {
			scss: {
				additionalData:
					'@import "~@/static/scss/useTheme.scss";' +
					'@import "~@/static/scss/common.scss";',
			},
			less: {
				additionalData: '@import "@/styles/vars/_base.less";',
			},
		},
	},
});
