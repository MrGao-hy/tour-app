import { createSSRApp } from "vue";
import * as Pinia from "pinia";

// @ts-ignore
import uView from "uview-plus";
import App from "./App.vue";

// import { createUnistorage } from "pinia-plugin-unistorage";
import { globalRegister } from "hfyk-app";

// unocss
import "uno.css";

export function createApp() {
	const app = createSSRApp(App);
	const store = Pinia.createPinia();

	app.use(Pinia.createPinia());
	app.use(uView);
	app.use(globalRegister);
	return {
		app,
		// uni-app 官方文档示例 https://zh.uniapp.dcloud.io/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia
		Pinia, // 此处必须将 Pinia 返回
	};
}
