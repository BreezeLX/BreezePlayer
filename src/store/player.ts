import { defineStore, storeToRefs } from 'pinia';
import type { Song } from '@/models/song';
import type { SongUrl } from '@/models/song_url';
import { getSongUrl, getDetail } from '@/service/modules/player';
import { onMounted, onUnmounted, toRefs, watch } from 'vue';

const KEYS = {
  volume: 'PLAYER-VOLUME'
};
export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      audio: new Audio(),
      loopType: 0, //循环模式 0 单曲循环 1 列表循环 2随机播放
      volume: localStorage.getItem(KEYS.volume)?.toInt() || 60, //音量
      playList: [] as Song[], //播放列表,
      showPlayList: false,
      id: 0,
      url: '',
      songUrl: {} as SongUrl,
      song: {} as Song,
      isPlaying: false, //是否播放中
      isPause: false, //是否暂停
      sliderInput: false, //是否正在拖动进度条
      ended: false, //是否播放结束
      muted: false, //是否静音
      currentTime: 0, //当前播放时间
      duration: 0 //总播放时长
    };
  },
  getters: {
    playListCount: (state) => {
      return state.playList.length;
    },
    thisIndex: (state) => {
      return state.playList.findIndex((song) => song.id === state.id);
    },
    nextSong(state): Song {
      const { thisIndex, playListCount } = this;
      if (thisIndex === playListCount - 1) {
        return state.playList.first();
      } else {
        const nextIndex: number = thisIndex + 1;
        return state.playList[nextIndex];
      }
    },
    prevSong(state): Song {
      const { thisIndex } = this;
      if (thisIndex === 0) {
        return state.playList.last();
      } else {
        const prevIndex: number = thisIndex - 1;
        return state.playList[prevIndex];
      }
    }
  },
  actions: {
    init() {
      this.audio.volume = this.volume / 100;
    },
    async play(id: number) {
      if (id == this.id) return;
      this.isPlaying = false;
      const { data } = await getSongUrl(id);
      this.audio.src = data[0].url;
      console.log(this.audio);
      this.audio
        .play()
        .then((res) => {
          this.isPlaying = true;
          this.isPause = false;
          this.songUrl = data[0];
          this.url = data[0].url;
          this.id = id;
          this.songDetail();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    async songDetail() {
      let { songs } = await getDetail(this.id);
      this.song = songs[0];
      this.pushPlayList(false, this.song);
      console.log(this.$state);
    },
    //播放列表里面添加音乐
    pushPlayList(replace: boolean, ...list: Song[]) {
      if (replace) {
        this.playList = list;
        return;
      }
      list.forEach((song) => {
        if (this.playList.filter((s) => s.id == song.id).length <= 0) {
          this.playList.push(song);
        }
      });
    },
    clearPlayList() {
      this.songUrl = {} as SongUrl;
      this.url = '';
      this.id = 0;
      this.song = {} as Song;
      this.isPlaying = false;
      this.isPause = false;
      this.sliderInput = false;
      this.ended = false;
      this.muted = false;
      this.currentTime = 0;
      this.playList = [] as Song[];
      this.showPlayList = false;
      this.audio.load();
      setTimeout(() => {
        this.duration = 0;
      }, 500);
    },
    //切换播放状态
    togglePlay() {
      if (!this.song.id) return;
      this.isPlaying = !this.isPlaying;
      if (!this.isPlaying) {
        this.audio.pause();
        this.isPause = true;
      } else {
        this.audio.play();
        this.isPause = false;
      }
    },
    //切换播放顺序
    toggleLoop() {
      if (this.loopType == 2) {
        this.loopType = 0;
      } else {
        this.loopType++;
      }
    },
    //下一首
    next() {
      if (this.loopType === 2) {
        this.randomPlay();
      } else {
        this.play(this.nextSong.id);
      }
    },
    prev() {
      this.play(this.prevSong.id);
    },
    //随机播放
    randomPlay() {
      this.play(this.playList.sample().id);
    },
    //播放结束
    playEnd() {
      console.log('播放结束');
      switch (this.loopType) {
        case 0:
          this.rePlay();
          break;
        case 1:
          this.next();
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },
    rePlay() {
      setTimeout(() => {
        this.currentTime = 0;
        this.audio.play();
      }, 1500);
    },
    //修改播放时间
    sliderChange(val: number) {
      console.log(val);
      this.currentTime = val;
      this.sliderInput = false;
      this.audio.currentTime = val;
    },
    //播放时间拖动中
    sliderIput() {
      this.sliderInput = true;
    },
    //定时器
    interval() {
      if (this.isPlaying && !this.sliderInput) {
        this.currentTime = parseInt(this.audio.currentTime.toString());
        this.duration = parseInt(this.audio.duration.toString());
        this.ended = this.audio.ended;
      }
    },
    //静音切换
    toggleMuted() {
      this.muted = !this.muted;
      this.audio.muted = this.muted;
    },
    //音量设置
    setVolume(n: number) {
      n = n > 100 ? 100 : n;
      n = n < 0 ? 0 : n;
      this.volume = n;
      this.audio.volume = n / 100;
      localStorage.setItem('PLAYER-VOLUME', n.toString());
    }
  }
});
export const userPlayerInit = () => {
  let timer: NodeJS.Timer;
  const { init, interval, playEnd } = usePlayerStore();

  const { ended } = storeToRefs(usePlayerStore());

  //监听播放结束
  watch(ended, (ended) => {
    if (!ended) return;
    playEnd();
  });

  //启动定时器
  onMounted(() => {
    init();
    console.log('启动定时器');
    timer = setInterval(interval, 1000);
  });
  //清除定时器
  onUnmounted(() => {
    console.log('清除定时器');
    clearInterval(timer);
  });
};
