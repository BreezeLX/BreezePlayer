import { defineStore } from 'pinia';
import { getAccountInfo, getUserDetail } from '@/service/modules/user';
import type { UserProfile } from '@/models/user';
import { getUserMusicList } from '@/service/modules/playlist';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      cookie: localStorage.getItem('USER-COOKIE') || '',
      showLogin: false,
      profile: {} as UserProfile,
      isLogin: false,
      musicList: [] as any[]
    };
  },
  // getters: {
  //   isLogin: (state) => {
  //     return state.profile?.userId > 0;
  //   }
  // },
  actions: {
    async checkLoginStatus() {
      // 获取账号信息
      let userInfo = await getAccountInfo();
      if (userInfo.code == 200 && userInfo.profile) {
        console.log('获取账号信息', userInfo.profile);
        this.profile = userInfo.profile;
        this.isLogin = true;
        this.getUserMusicListAction();
      }
    },
    async getUserMusicListAction() {
      if (this.profile) {
        let { playlist } = await getUserMusicList({ uid: this.profile.userId });
        this.musicList = playlist;
      }
    }
  }
});
