<template>
  <div
    style="height: 600px"
    class="flex items-center bg-black-200 justify-around"
  >
    <div class="song-bg">
      <img class="h-full" :src="song?.al?.picUrl" mode="aspectFit" />
    </div>
    <div class="flex flex-col justify-center z-20 px-32 flex-shrink-0">
      <div style="border-radius: 20px" class="h-60 overflow-hidden">
        <img class="h-full" :src="song?.al?.picUrl" mode="aspectFit" />
      </div>
      <div class="text-center pt-3 text-2xl">{{ song.name }}</div>
      <div class="text-center pt-3 text-sm">
        <span class="ml-3 p-2" v-for="item in song.ar">{{ item.name }}</span>
      </div>
    </div>
    <div class="flex-shrink-0 flex-1" style="transition: all 0.5s">
      <el-scrollbar height="500px" ref="lyricWrap">
        <div
          class="w-full lyri"
          v-for="item in lyric"
          :class="{ active1: item?.active }"
          :ref="item?.active"
        >
          {{ item.text }}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<!-- <div style="height: 500px" class="bg-slate-600" ref="lyricWrap"></div> -->

<script lang="ts" setup>
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { getSongWords } from '@/service/modules/player';

let lyric = ref();
let active = ref();
let lyricWrap = ref();
let { song, currentTime } = storeToRefs(usePlayerStore());
let getSongWordsData = async () => {
  console.log(song);
  let data = await getSongWords(song.value.id);
  if (data?.code == 200) {
    lyric.value = formatLyric(data.lrc.lyric);
  }
};
watch(
  () => currentTime.value,
  (curTime) => {
    let scrollIndex = 0;
    lyric.value?.forEach((item, index) => {
      if (curTime > item.time - 1 && curTime <= item.next - 1) {
        item.active = 'active';
        scrollIndex = index;
      } else {
        item.active = '';
      }
    });
    lyricWrap.value.scrollTo({
      left: 0,
      top: scrollIndex * 66 - 200,
      behavior: 'smooth'
    });
  }
);
watch(
  () => song.value.id,
  (curTime) => {
    getSongWordsData();
  }
);

//格式化时间
const formatTimeToNumber = (timeString: string) => {
  let time = 0;
  if (timeString) {
    const splitArr = timeString.split(':').map((item) => Number(item));
    return splitArr[0] * 60 + splitArr[1];
  }
  return time;
};
// 格式化歌词
const formatLyric = (lyric: string) => {
  const lyricParts = lyric.split('\n').filter((item) => item);
  let arr = lyricParts.map((item) => {
    const splitItems = item.split(']');
    const lyricItem = {
      time: formatTimeToNumber(splitItems[0].slice(1)),
      active: '',
      text: splitItems[1],
      next: 99999
    };

    return lyricItem;
  });
  arr.forEach((item, index) => {
    item.next = arr[index + 1]?.time;
  });
  arr[arr.length - 1].next = 99999;
  return arr;
};

onMounted(() => {
  if (song) {
    getSongWordsData();
  }
});
</script>

<style lang="scss" scoped>
.el-scrollbar {
  transition: all 1s linear;
}
.active1 {
  color: rgb(255, 255, 255);
  font-weight: 600;
  background-color: #d5d5d521;
  border-radius: 8px;
}

.lyri {
  line-height: 66px;
  font-size: 25px;
  padding: 0 20px;
}
</style>
