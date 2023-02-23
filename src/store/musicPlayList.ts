import { defineStore } from 'pinia';
import {
  getUserMusicList,
  moveMusicToList,
  createMusicList
} from '@/service/modules/playlist';
import { ElMessage } from 'element-plus';

export const useMusicPlayList = defineStore('MusicPlayList', {
  state: () => {
    return { musicList: [] as any[], showCollect: false };
  },
  getters: {
    collectList(state) {
      return state.musicList.filter((item) => item.subscribed);
    },
    createdList(state) {
      return state.musicList.filter((item) => !item.subscribed);
    }
  },
  actions: {
    //获取用户创建的和收藏的歌单
    async getMyMusicListAction(id) {
      let { playlist } = await getUserMusicList({ uid: id });
      console.log(playlist);
      this.musicList = playlist;
    },
    //收藏歌曲到歌单
    async moveMusicToList(obj) {
      let data = await moveMusicToList(obj);
      console.log(data);
      if (data?.body?.code == 200 || data?.code == 200) {
        this.showCollect = false;
        ElMessage({
          message: obj.op == 'del' ? '删除成功' : '收藏成功',
          type: 'success'
        });
      } else if (data?.body?.code == 502 || data?.code == 200) {
        ElMessage({
          message: '歌曲已存在',
          type: 'warning'
        });
      } else {
        ElMessage({
          message: data.body.message,
          type: 'error'
        });
      }
      return new Promise((resolve) => {
        resolve(data);
      });
    },
    // 创建歌单
    async createList(obj) {
      let data = await createMusicList(obj);
      console.log(data);
      if (data?.code == 200) {
        ElMessage({
          message: '创建成功',
          type: 'success'
        });
      }
      return new Promise((resolve) => {
        resolve(data);
      });
    }
  }
});
