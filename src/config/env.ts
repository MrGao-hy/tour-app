export enum WX_ENV {
	DEVELOPMENT = "development",
	TEXT = "text",
	PRODUCTION = "production",
}

export const wx_env = process.env.NODE_ENV as WX_ENV;
console.log(process.env.NODE_ENV);

// #ifdef H5
// export enum H5_ENV {
//   DEVELOP = 'develop',
//   PRODUCTION = 'production'
// }
//
// export const h5_env: H5_ENV = import.meta.env.MODE as H5_ENV
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
	// 开发环境配置
	development: {
		baseUrl: " http://127.0.0.1:8080",
		// baseUrl: "http://10.0.0.104:8080",
		// baseUrl: "http://gxh.free.idcfengye.com",
		assetsPath: "/static",
	},
	// 测试环境配置
	test: {
		baseUrl: "http://gxh.free.idcfengye.com",
		assetsPath: "/static",
	},
	// 生产环境配置
	production: {
		baseUrl: "http://gxh.free.idcfengye.com",
		assetsPath: "/static",
	},
};

conf = config[wx_env];

// #ifdef H5
// conf = config[h5_env];
// #endif

export default conf;
