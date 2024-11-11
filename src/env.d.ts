/// <reference types="vite/client" />

declare module "*.vue" {
	import { DefineComponent } from "vue";

	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module "pinia-plugin-unistorage";
declare module "uview-plus/libs/mixin/mpShare";
declare module "uview-plus";

interface ImportMetaEnv {
	VITE_APP_TITLE: string;
	VITE_APP_AXIOS_BASE_URL: string;
}
