<template>
  <div
    class="flex song-item items-center w-full hover-bg-main pl-3"
    :class="{
      playing: id === song.id,
      ' text-gray-700': song.noCopyrightRcmd
    }"
    @dblclick="playMusic(song)"
  >
    <!-- 歌曲名字模块 -->
    <div class="flex-shrink-0 flex-1 flex items-center justify-between pr-5">
      <div class="items-center flex flex-1 w-10 flex-shrink-0">
        <IconPark
          :icon="Like"
          size="16"
          class="text-gray-500 mr-1 cursor-pointer hover:text-red-400"
        />
        <div class="truncate" style="max-width: 75%">
          <div>{{ song.name }}</div>
        </div>
        <IconPark
          v-if="song.mv > 0"
          class="ml-2 text-orange-400 cursor-pointer"
          size="16"
          :icon="PlayTwo"
          @click="
            router.push({ name: Pages.videoplayer, query: { mvid: song.mv } })
          "
        />
        <span
          v-if="song.fee == 1"
          style="font-size: 10px"
          class="text-xs text-red-400 ml-1"
        >
          VIP
        </span>
        <span
          v-if="song.noCopyrightRcmd?.type == 1"
          style="font-size: 10px"
          class="text-xs text-gray-600 ml-1"
        >
          无版权 其他音源可播放
        </span>
        <span
          v-if="song.noCopyrightRcmd?.songId === null"
          style="font-size: 10px"
          class="text-xs text-gray-600 ml-1"
        >
          无版权
        </span>
      </div>
      <div class="hidden icon-action flex-shrink-0">
        <div class="flex items-center gap-x-1.5 text-gray-400 ml-2">
          <IconPark
            title="播放"
            :icon="PlayOne"
            size="20"
            class="hover-text"
            @click="playMusic(song)"
          />
          <IconPark
            title="添加到"
            :icon="Add"
            size="16"
            class="hover-text"
            @click="checkCollect(song)"
          />
          <IconPark title="下载" :icon="DownTwo" size="16" class="hover-text" />
          <IconPark
            title="更多操作"
            :icon="MoreTwo"
            size="16"
            class="hover-text"
          />
        </div>
      </div>
    </div>
    <!-- 歌手 -->
    <div
      class="flex-shrink-0"
      :class="{ 'w-1/4': showAlName, 'w-1/3': !showAlName }"
      v-if="showArName"
    >
      <div class="w-9/12 truncate">
        <div
          class="truncate max-w-full hover-text"
          @click="
            router.push({
              name: 'artistDetail',
              query: { id: song.ar.first().id }
            })
          "
        >
          {{ song.ar.first().name }}
        </div>
      </div>
    </div>
    <!-- 歌手 -->
    <div
      class="flex-shrink-0"
      :class="{ 'w-1/4': showArName, 'w-1/3': !showArName }"
      v-if="showAlName && !recent"
    >
      <div class="w-9/12 truncate">
        <small
          class="truncate hover-text"
          @click="router.push({ name: 'album', query: { id: song.al.id } })"
          >{{ song.al.name }}</small
        >
      </div>
    </div>
    <div class="w-20 flex-shrink-0" v-if="!recent">
      <div class="w-20 truncate">
        <small>{{ useFormatDuring(song.dt / 1000) }}</small>
      </div>
    </div>
    <div class="w-20 flex" v-if="playTime">
      <div class="w-20">
        <small>{{ playTime.toTodayTimebyRecent() }}</small>
      </div>
    </div>
  </div>

  <!-- 无版权提示 -->
  <el-dialog
    :modal="false"
    align-center
    v-model="showtip"
    title="warning"
    width="30%"
    center
  >
    <div class="text-xl">
      <IconPark :icon="Attention" size="20" />
      {{ noMusicTip }}
    </div>
    <div
      v-for="(item, index) in otherMusicList"
      :key="index"
      class="flex items-center cursor-pointer bg-zinc-500 p-2 mt-3 rounded"
      @click="playMusic(item)"
    >
      <img
        :src="item?.al.picUrl"
        alt=""
        class="w-12 h-12 object-cover rounded flex-shrink-0"
      />
      <div class="px-2 flex-auto flex flex-col w-1/3">
        <div class="text-base flex-1 truncate">
          {{ item?.name }}
        </div>
        <div class="mt-1.5 text-sm text-dc">
          {{ item.ar[0].name }}
        </div>
      </div>
    </div>
  </el-dialog>

  <!-- 点击收藏 -->
  <el-dialog
    :modal="false"
    align-center
    v-model="showCollect"
    width="50%"
    center
  >
    <div class="font-bold text-lg">收藏到歌单</div>
    <div class="bg-slate-600 h-20 rounded"></div>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  Add,
  DownTwo,
  Like,
  MoreTwo,
  PlayOne,
  PlayTwo,
  Attention
} from '@icon-park/vue-next';
import { useFormatDuring } from '@/utils/number';
import { usePlayerStore } from '@/store/player';
import IconPark from '@/components/common/IconPark.vue';
import type { Song } from '@/models/song';
import { useRouter } from 'vue-router';
import { Pages } from '@/router/pages';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { getDetail } from '@/service/modules/player';

const router = useRouter();

defineProps<{
  song: Song;
  showArName?: boolean;
  showAlName?: boolean;
  recent?: boolean;
  playTime?: number;
}>();

const { play } = usePlayerStore();
const { id } = storeToRefs(usePlayerStore());
let showtip = ref(false);
let showCollect = ref(false);
let otherMusicList = reactive<any[]>([]);
let noMusicTip = ref('当前音乐暂无版权');

//点击播放音乐
let playMusic = async (song) => {
  console.log('歌曲信息', song);
  if (song.noCopyrightRcmd) {
    if (song.noCopyrightRcmd.songId) {
      let data = await getDetail(song.noCopyrightRcmd.songId);

      if (data.code == 200) {
        noMusicTip.value = '当前音乐暂无版权,但为您找到的版本的歌曲';
        otherMusicList = data?.songs;
      }
      console.log(data);
    }
    showtip.value = true;
  } else {
    play(song.id);
  }
};

//点击收藏
let checkCollect = (song: any) => {
  showCollect.value = true;
};
</script>

<style lang="scss" scoped>
.song-item {
  @apply py-2.5 pl-0.5;
  &:hover {
    .icon-action {
      @apply inline-block;
    }
  }
}

.playing {
  @apply bg-emerald-50 dark:bg-stone-800;
}
</style>
