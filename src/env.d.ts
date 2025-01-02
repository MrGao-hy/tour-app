/// <reference types="vite/client" />

import { DefineComponent } from "vue";

declare module "*.vue" {
	import { DefineComponent } from "vue";

	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module "uni-app" {
	interface Uni {
		$u: any; // 或者你可以为 `$u` 提供更具体的类型
	}
	const uni: Uni;
	export default uni;
}

declare module "pinia-plugin-unistorage";
declare module "uview-plus/libs/mixin/mpShare";
declare module "uview-plus";

interface ImportMetaEnv {
	VITE_APP_TITLE: string;
	VITE_APP_AXIOS_BASE_URL: string;
}
