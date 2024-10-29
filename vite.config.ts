import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni(),
		// https://github.com/antfu/unocss
		Unocss(),
	],
	server: {
		// port: 8080,
		host: "0.0.0.0",
		proxy: {
			"/api/": {
				target: "http://127.0.0.1:8080",
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
				additionalData: '@import "~@/static/scss/theme.scss";',
			},
			less: {
				additionalData: '@import "@/styles/vars/_base.less";',
			},
		},
	},
});
