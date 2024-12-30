<!--
Author: zusheng
Date: 2022-04-28 20:27:55
LastEditTime: 2022-05-13 20:28:46
Description: 播放器的代播列表显示
FilePath: \uni-preset-vue-vite-ts\src\components\ThePlayerQueue.vue
-->

<template>
  <view class="player-page-queue">
    <view class="player-detail__queue-section">
      <!-- 标题 -->
      <view class="player-detail__queue-section-title">
        <view class="player-detail__queue-section-title-left">
          <view
            @tap="queueModeChange(1)"
            :class="`queue-section-title-item ${
              queueMode === 1 ? 'title-checked' : ''
            }`"
          >
            代播清单
            <text class="player-detail__queue-section-title__sub">{{
              queue.length
            }}</text>
          </view>
          <view
            @tap="queueModeChange(2)"
            :class="`queue-section-title-item ${
              queueMode === 2 ? 'title-checked' : ''
            }`"
          >
            插播
            <text class="player-detail__queue-section-title__sub">{{
              preference.length
            }}</text>
          </view>
        </view>
        <image
          @tap="clearQueue"
          class="player-detail__queue-section-title-right"
          src="@/static/images/music/del.png"
          mode="aspectFit"
        />
      </view>

      <!-- scroll-view s -->
      <scroll-view
        class="player-detail__queue-scroll-view"
        @scroll="scrollHandler"
        :scroll-y="true"
      >
        <view class="player-detail__queue-ul-play">
          <the-player-queue-infinite
            v-if="queueMode === 1"
            :songs="queue"
            :scroll-top="scrollTop"
          />
          <the-player-queue-infinite
            v-else-if="queueMode === 2"
            :songs="preference"
            :scroll-top="scrollTop"
          />
        </view>
      </scroll-view>
      <!-- scroll-view e -->
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ThePlayerQueueInfinite from "./ThePlayerQueueInfinite.vue";

export default defineComponent({
  components: {
    ThePlayerQueueInfinite,
  },
  setup() {
    const data = reactive({
      queueMode: 1,
      scrollTop: 0,
      queue: [],
      preference: [],
    });

    const queueModeChange = (type) => {
      data.queueMode = type;
    };

    const scrollTop = (e) => {
      data.scrollTop = e.detail.scrollTop;
    };

    return {
      ...toRefs(data),

      queueModeChange,
      scrollTop,
    };
  },
});
</script>

<style lang="less">
.player-page-queue {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 60rpx 60rpx 110rpx;
  box-sizing: border-box;
  .player-detail__queue-section {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    // 代播清单标题
    .player-detail__queue-section-title {
      color: rgba(255, 255, 255, 0.45);
      font-weight: 600;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 24rpx;

      .player-detail__queue-section-title-left {
        display: flex;
        flex-shrink: 0;
        margin: 0 -18rpx 0;
        .queue-section-title-item {
          padding: 0 18rpx;
          &:not(:last-child) {
            border-right: 2px solid rgba(255, 255, 255, 0.3);
          }

          .player-detail__queue-section-title__sub {
            font-size: 24rpx;
            color: rgba(255, 255, 255, 0.45);
          }
        }

        .title-checked {
          color: rgba(255, 255, 255, 1);

          .player-detail__queue-section-title__sub {
            font-size: 24rpx;
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      .player-detail__queue-section-title-right {
        width: 40rpx;
        height: 32rpx;
        flex-shrink: 0;
      }
    }

    .player-detail__queue-scroll-view {
      flex: 1;
      overflow: hidden;

      .player-detail__queue-ul-play {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
