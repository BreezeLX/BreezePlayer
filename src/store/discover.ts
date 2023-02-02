import { defineStore } from 'pinia';
import {
  getBanner,
  getPersonalized,
  getPersonalizedMV,
  getPersonalizedNewsong
} from '@/service/modules/discover';
import type {
  Personalized,
  PersonalizedNewSong,
  PersonalizedMv
} from '@/models/personalized';
import type { Banner } from '@/models/banner';

export const useDiscoverStore = defineStore('discover', {
  state: () => {
    return {
      banners: new Array<Banner>(),
      recommendedPlaylist: new Array<Personalized>(),
      recommendedNewSong: new Array<PersonalizedNewSong>(),
      recommendedMv: new Array<PersonalizedMv>()
    };
  },
  actions: {
    getBannerAction() {
      getBanner().then((res) => {
        this.banners = res.banners;
      });
    },
    getRecommendedPlaylist() {
      getPersonalized().then((res) => {
        //只需要请求一次
        if (!this.recommendedPlaylist.length) {
          this.recommendedPlaylist = res.result;
        }
      });
    },
    getRecommendedNewSong() {
      getPersonalizedNewsong().then((res) => {
        console.log('推荐新歌数组', res);
        if (!this.recommendedNewSong.length) {
          this.recommendedNewSong = res.result;
        }
      });
    },
    getRecommendedMv() {
      getPersonalizedMV().then((res) => {
        console.log('推荐MV数组', res);
        if (!this.recommendedMv.length) {
          this.recommendedMv = res.result;
        }
      });
    }
  }
});
