<template>
  <div v-if="isLogin">
    <div v-if="!isLoading">
      <div class="text-xl">我喜欢的音乐</div>
      <div class="flex items-center mt-3 mb-4">
        <button class="w-28 sm:w-32 button" @click="playAll">
          <IconPark :icon="PlayOne" size="22" class="mr-1" />
          <span>播放全部</span>
        </button>
        <button class="w-28 ml-4 sm:w-32 button-outline">
          <IconPark :icon="Like" size="18" class="mr-1" />
          <span>收藏</span>
        </button>
        <button class="button-outline w-8">
          <IconPark :icon="More" />
        </button>
      </div>
      <div>
        <div class="flex text-xs text-gray-400 py-2">
          <div class="flex-auto">歌曲</div>
          <div class="w-1/4">歌手</div>
          <div class="w-1/4">专辑</div>
          <div class="w-20">时长</div>
        </div>
        <div class="text-sm">
          <template v-for="song in playList" :key="song.id">
            <song-list-item :song="song" show-ar-name show-al-name />
          </template>
        </div>
      </div>
    </div>
    <div v-else>加载中。。。</div>
  </div>
  <goLogin v-else></goLogin>
</template>

<script lang="ts" setup>
import { PlayOne, Like, More } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { getPlayListTrackAll } from '@/service/modules/playlist';
import { onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

let { isLogin, musicList } = storeToRefs(useUserStore());
let playList = reactive<any[]>([]);
let isLoading = ref(false);

watch(musicList, async (newVal: any) => {
  getData(musicList.value[0]?.id);
});

const getData = async (id) => {
  isLoading.value = true;
  if (id) {
    let data = await getPlayListTrackAll(id);
    playList.push(...data);
    isLoading.value = false;
  }
};

let playAll = () => {};
onMounted(() => {
  getData(musicList.value[0]?.id);
});
</script>

<style></style>
