interface PlayerStatus {
  /**
   * 当前播放时长
   */
  currentTime: number;
  /**
   * 歌曲时长
   */
  duration: number;
  /**
   * 暂停状态 true：暂停；false：播放
   */
  paused: boolean;
  /**
   * 播放模式
   *
   * 1.listRepeat列表循环
   *
   * 2.list列表播放（播完即停）
   *
   * 3.random随机播放
   *
   * 4.repeat单曲循环
   */
  mode: number;
  /**
   * 是否自动播放
   * */
  autoplay: boolean;
}

interface SongInfoType {
  /**
   * 歌曲id
   * */
  id: number;
  /**
   * 作者名称
   * */
  author: string;
  /**
   * 歌曲图片
   * */
  pic_url: string;
  /**
   * 歌曲url
   * */
  url: string;
  /**
   * 歌曲名称
   * */
  name: string;
  /**
   * 更新时间
   * */
  update_time?: string;
}

export type { PlayerStatus, SongInfoType };
