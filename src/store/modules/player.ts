import { defineStore } from "pinia";
import { ref } from "vue";
// 请求接口
import {
	getMusicOnceApi,
	getSongCanPlayApi,
	queryMusicHotCommentListApi,
	queryMusicNewCommentListApi,
	querySongDetailApi,
	querySongListApi,
	querySongLyricApi,
	querySongMp3Api,
} from "@/api";
// 封装公共js
import { random } from "uview-plus";
import type { PlayerStatus, SongInfoType } from "@/typing";
import { config } from "@/config";

// 播放音乐函数变量名
const num = ref(0);
const interval: any = ref(null);
const timeupdata: any = ref(null);

// 音频组件
const innerAudioContext = uni.getBackgroundAudioManager
	? uni.getBackgroundAudioManager()
	: uni.createInnerAudioContext();
// const innerAudioContext = uni.createInnerAudioContext()
/**
 * "ambient" - 不中止其他声音播放，不能后台播放，静音后无声音；
 * "soloAmbient" - 中止其他声音播放，不能后台播放，静音后无声音；
 * "playback" - 中止其他声音，可以后台播放，静音后有声音。
 */
// innerAudioContext.loop = true

const usePlayer = defineStore("diary_player", {
	state: () => {
		return {
			/**
			 * 歌曲是否正在加载
			 */
			loading: false,
			/**
			 * 播放器状态信息
			 */
			playerStatus: {
				currentTime: 0,
				duration: 0,
				paused: true,
				mode: 1,
				autoplay: true,
			} as PlayerStatus,
			/**
			 * 单首歌曲信息
			 */
			songInfo: {} as SongInfoType,
			level: "higher",
			songList: [] as any[],
			lyrics: [] as string[],
			songId: 0,
		};
	},
	getters: {
		/**
		 * 计算进度条当前值
		 * */
		ratio(state) {
			return (
				(state.playerStatus.currentTime / state.playerStatus.duration) * 100
			);
		},
		/**
		 * 查找歌曲当前索引
		 * */
		playerIndex(state) {
			const index = state.songList.findIndex((item: any) => {
				return item.id == state.songInfo.id;
			});
			return index;
		},
	},
	actions: {
		// 加载歌曲,store内自己调用
		hideLoad() {
			this.loading = false;
		},
		showLoad() {
			this.loading = true;
		},
		/**
		 * 获取音乐信息
		 * */
		async getPlayer(id: number) {
			// const isCanPlay = await getSongCanPlayApi(id);
			// if(!isCanPlay) return;
			this.songId = id;
			// 歌曲url
			const res_1 = await querySongMp3Api(id, this.level);
			// 歌曲详细信息
			const res_2 = await querySongDetailApi(id);
			// 歌词
			const res_3 = await querySongLyricApi(id);
			this.lyrics = res_3.split("\n");

			const mp3Url = res_1[0].url;
			const name = res_2[0].name;
			const author = res_2[0].ar[0].name;
			const cover = res_2[0].al.picUrl;
			// 进度条清零
			this.playerStatus.currentTime = num.value = 0;

			return new Promise((resolve) => {
				innerAudioContext.src = mp3Url;

				// this.DifferentSongId()
				// #ifndef H5
				if (uni.getBackgroundAudioManager()) {
					innerAudioContext.title = name;
					innerAudioContext.singer = author;
					innerAudioContext.coverImgUrl = cover;
					innerAudioContext.webUrl = "/pages-recreation/music/Index";
				} else {
					innerAudioContext.sessionCategory = "ambient";
					// 开启自动播放
					innerAudioContext.autoplay = true;
				}
				// #endif
				// #ifdef H5
				innerAudioContext.sessionCategory = "ambient";
				innerAudioContext.autoplay = true;
				// #endif
				this.showLoad();
				innerAudioContext.onPlay((res) => {
					this.hideLoad();
					this.getDuration();
					// 状态为开始状态
					this.playerStatus.paused = false;
					// 进度条更改
					this.playAudio();
				});

				innerAudioContext.onError((error) => {
					this.hideLoad();
					if (!error) {
						resolve("系统错误");
						return;
					}
					switch (error.errCode) {
						case 10001:
							resolve("系统错误");
							break;
						case 10002:
							resolve("网络错误");
							break;
						case 10003:
							resolve("文件错误");
							break;
						case 10004:
							resolve("格式错误");
							break;
						case -1:
							resolve("未知错误");
							break;
						default:
							resolve("未知错误");
							break;
					}
				});
				this.songInfo = {
					id,
					url: mp3Url,
					pic_url: cover,
					author,
					name,
				};
			});
		},
		getMusicList(id: number, current: number, load?: string) {
			return new Promise(async (resolve, reject) => {
				const res = await querySongListApi(id, current, config.pageSize);
				if (res.length == 0) {
					uni.$u.toast("没有更多歌曲了");
					reject();
				}
				this.songList = [...this.songList, ...res];
			});
		},
		/**
		 * 开始播放
		 */
		setPlayerPlay() {
			// 使手机震动
			uni.vibrateShort({ fail: () => {} });

			// 播放音乐
			if (this.songInfo.url) {
				innerAudioContext.play();
				this.playerStatus.paused = false;
				// 进度条同步
				this.playAudio();
				// 取消加载
				this.hideLoad();
			} else {
				// 加载中
				this.showLoad();
			}
		},
		/**
		 * 暂停播放
		 */
		setPlayerPause() {
			// 使手机震动
			uni.vibrateShort({
				fail: () => {},
			});

			if (this.songInfo.url) {
				innerAudioContext.pause();
				this.playerStatus.paused = true;
				// 取消加载
				this.hideLoad();
			} else {
				// 加载中
				this.showLoad();
			}
		},
		/**
		 * 进度条值和当前时间同步进度
		 */
		handleRatioChanging(option: number) {
			if (this.songInfo.url) {
				// 当前时间值 = 进度条比 * 总秒数
				this.playerStatus.currentTime = parseInt(
					String((option * this.playerStatus.duration) / 100)
				);
			} else {
				// 调整歌曲事件时，歌曲在加载状态，等待加载完成后再设置
				// uni.$once('onCanplay', () => player.seek(time))
				this.showLoad();
			}
		},
		/**
		 * 歌曲同步进度
		 */
		handleRatioChange(option: number) {
			// 缓存值
			const { buffered } = innerAudioContext;
			if (this.songInfo.url) {
				// 当前时间值 = 进度条比 * 总秒数
				this.playerStatus.currentTime = parseInt(
					((option * this.playerStatus.duration) / 100).toString()
				);
				// 歌曲进度跟随改变
				innerAudioContext.seek(this.playerStatus.currentTime);
				// 进度条值跟随改变
				num.value = this.playerStatus.currentTime;
			} else {
				// 调整歌曲事件时，歌曲在加载状态，等待加载完成后再设置
				// uni.$once('onCanplay', () => player.seek(time))
				this.showLoad();
			}
		},
		/**
		 * 设置加载状态
		 */
		setLoading(status: boolean) {
			this.loading = status;
		},

		/**
		 * 上一首
		 * */
		setPlayerPrev() {
			const list = this.songList;
			if (list !== undefined) {
				// 当前歌曲下标
				const curSongIdx = this.playerIndex;
				// 下一首歌的下标
				const nextSongIdx = curSongIdx === 0 ? list.length - 1 : curSongIdx - 1;
				const curSongPayload = list[nextSongIdx].id;
				this.getPlayer(curSongPayload);
			}
		},

		/**
		 * 下一首
		 * */
		setPlayerNext() {
			const list = this.songList;
			if (list !== undefined) {
				// 判断当前播放模式
				const curMode = this.playerStatus.mode;
				// 队列长度
				const queueLength = list.length - 1;
				// 当前播放歌曲在队列中的下标
				const curSongIdx = this.playerIndex;
				// 下一首歌的下标
				let nextSongIdx: undefined | number;
				if (curMode === 1) {
					// listRepeat列表循环
					nextSongIdx = curSongIdx >= queueLength ? 0 : curSongIdx + 1;
				} else if (curMode === 2) {
					// list列表播放（播完即停）
					nextSongIdx = curSongIdx >= queueLength ? undefined : curSongIdx + 1;
				} else if (curMode === 3) {
					// random随机播放
					nextSongIdx = random(0, queueLength);
				} else if (curMode === 4) {
					// repeat单曲循环
					nextSongIdx = curSongIdx;
				}

				// 开始切歌
				if (nextSongIdx !== undefined) {
					// 下一首歌的ID
					const nextSongId = list[nextSongIdx].id;
					this.getPlayer(nextSongId);
				} else {
					uni.$u.toast("已经是最后一首了");
				}
			}
		},

		/**
		 * 退出页面执行函数操作
		 * */
		outPages() {
			this.playerStatus.currentTime = 0;
			num.value = 0;
			// 退出页面清除所有定时器
			clearInterval(timeupdata.value);
			clearInterval(interval.value);
			if (!uni.getBackgroundAudioManager) {
				// 退出页面取消所有事件
				innerAudioContext.offPlay();
				innerAudioContext.offError();
				innerAudioContext.offEnded();
			}
		},

		/**
		 * 封装函数，在暂停开始按钮函数执行，判断进度条
		 * */
		playAudio() {
			if (!this.playerStatus.paused) {
			}
			let totalTime: number;
			setTimeout(() => {
				totalTime = this.playerStatus.duration;
			}, 500);
			clearInterval(timeupdata.value);

			timeupdata.value = setInterval(() => {
				// 判断是暂停音乐还是开始
				if (!this.playerStatus.paused) {
					num.value++;
					// 进度条值
					this.playerStatus.currentTime = num.value;
					// 如何当前值大于最大值清空数值，暂停音乐
					if (num.value >= totalTime) {
						this.playerStatus.paused = true;
						clearInterval(timeupdata.value);
						this.playerStatus.currentTime = num.value = 0;
						innerAudioContext.onEnded(() => {
							// 播放结束下一首
							this.setPlayerNext();
						});
					}
				} else {
					// 暂停清除定时器
					clearInterval(timeupdata.value);
				}
			}, 1000);
		},
		/**
		 * 获取当前歌曲时长
		 * */
		getDuration() {
			interval.value = setInterval(() => {
				// 判断是否获取到音乐
				if (
					innerAudioContext.duration != 0 &&
					!isNaN(innerAudioContext.duration)
				) {
					// 赋值音乐全部时间
					this.playerStatus.duration = Math.round(innerAudioContext.duration);

					clearInterval(interval.value);
					// console.log('音频时长', this.playerStatus.duration)
				} else {
					// console.log(123)
				}
			}, 100);
		},
		/**
		 * @description 控制音量
		 * @param count 0-静音；1-最大声音
		 * */
		controlVolume(count: number) {
			innerAudioContext.volume = count;
		},
	},
});

export { usePlayer };
