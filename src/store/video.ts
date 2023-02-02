import { defineStore } from 'pinia';
import type { Video, VideoGroup } from '@/models/video';
import { getGroupList, getVideoList } from '@/service/modules/video';

export const useVideoStore = defineStore('video', {
  state() {
    return {
      videoList: [] as Video[],
      videoGroup: [] as VideoGroup[],
      page: 0,
      curId: 0,
      loading: false
    };
  },
  getters: {
    //当前选中的标签
    currentGroupTitle: (state) => {
      let curIndex = 0;
      if (state.videoGroup.length !== 0) {
        curIndex = state.videoGroup.findIndex(
          (item) => item.id === state.curId
        );
      }
      return state.videoGroup[curIndex]?.name;
    }
  },
  actions: {
    // 获取视频标签名
    async getDataAction(id?: number) {
      if (this.videoList.length == 0 && this.videoGroup.length == 0) {
        this.videoGroup.unshift({
          id: 0,
          name: '推荐视频',
          selectTab: false
        });
        let data = await getGroupList();
        this.videoGroup.push(...data);
        this.getVideoListAction();
      }
    },
    //获取视频列表
    async getVideoListAction(id?: number, offset?: number) {
      this.loading = true;
      let { datas } = await getVideoList(id, offset);
      // 剔除直播视频
      let data = datas.filter((item) => item.type != 7);
      this.videoList.push(...data);
      this.loading = false;
      console.log(datas);
    }
  }
});
