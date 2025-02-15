// #ifdef MP-WEIXIN
export enum WX_ENV {
	DEVELOP = "develop",
	TRIAL = "trial",
	RELEASE = "release",
}
// export const wx_env: WX_ENV = __wxConfig.envVersion;
export const wx_env: WX_ENV = "develop";
// #endif

// #ifdef H5
export enum H5_ENV {
	DEVELOP = "develop",
	PRODUCTION = "production",
}

export const h5_env: H5_ENV = process.env.NODE_ENV as H5_ENV;
// #endif

let conf: IEnvConf;

interface IEnvConf {
	baseUrl: string;
	assetsPath: string;
	decoBaseUrl?: string;
}

interface IConfig {
	[key: string]: IEnvConf;
}

const config: IConfig = {
	// #ifdef MP-WEIXIN
	// 开发环境配置
	develop: {
		// baseUrl: "https://gxh151.top/ms",
		baseUrl: "http://127.0.0.1:8080/ms",
		// baseUrl: "http://gxh.free.idcfengye.com",
		assetsPath: "/static",
	},
	// 测试环境配置
	trial: {
		baseUrl: "https://gxh151.top/ms",
		assetsPath: "/static",
	},
	// 生产环境配置
	release: {
		baseUrl: "https://gxh151.top/ms",
		assetsPath: "/static",
	},
	// #endif
	// #ifdef H5
	// 开发环境配置
	development: {
		// baseUrl: "https://gxh151.top/ms",
		baseUrl: "http://127.0.0.1:8080/ms",
		assetsPath: "/static",
	},
	// 生产环境配置
	production: {
		baseUrl: "/ms",
		assetsPath: "/static",
	},
	// #endif
};

// #ifdef MP-WEIXIN
conf = config[wx_env];
// #endif

// #ifdef H5
conf = config[h5_env];
// #endif

export default conf;
