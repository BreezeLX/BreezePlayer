<template>
  <div v-if="isLogin">
    <div v-if="!isLoading">
      <div class="flex">
        <div
          class="border py-2 px-3 rounded cursor-pointer"
          :class="{ active: recentType == 'song' }"
          @click="recentTypeCheck('song')"
        >
          最近播放的音乐
        </div>
        <div
          class="border py-2 px-3 rounded ml-3 cursor-pointer"
          :class="{ active: recentType == 'video' }"
          @click="recentTypeCheck('video')"
        >
          最近播放的视频
        </div>
      </div>
      <div v-if="recentType == 'song'">
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
            <div class="w-1/3">歌手</div>
            <div class="w-20">播放时间</div>
          </div>
          <div class="text-sm">
            <template v-for="song in RecentSongs" :key="song.resourceId">
              <song-list-item
                :song="song.data"
                :playTime="song.playTime"
                recent
                show-ar-name
              />
            </template>
          </div>
        </div>
      </div>
      <div v-if="recentType == 'video'">
        <div class="mt-8">
          <el-timeline>
            <el-timeline-item
              v-for="item in RecentVideo"
              :key="item.resourceId"
              :timestamp="item.playTime.toTodayTime()"
            >
              <recentVideoItem
                @click="checkVideo(item.resourceId)"
                :videoItem="item.data"
              ></recentVideoItem>
            </el-timeline-item>
          </el-timeline>
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
import recentVideoItem from './recentVideoItem.vue';
import { getRecentSongs, getRecentVideo } from '@/service/modules/recent';
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

let router = useRouter();
let { isLogin } = storeToRefs(useUserStore());
let isLoading = ref(false);
let RecentSongs = reactive<any[]>([]);
let RecentVideo = reactive<any[]>([]);
let recentType = ref('song');

let recentTypeCheck = (type: string) => {
  if (type != recentType.value) {
    recentType.value = type;
  }
};

let getRecentSongsAction = async (limit?: number) => {
  isLoading.value = true;
  let data = await getRecentSongs(limit);
  console.log(data);
  if (data.code == 200) {
    RecentSongs = data.data.list;
  }
  isLoading.value = false;
};
let getRecentVideoAction = async (limit?: number) => {
  let data = await getRecentVideo(limit);
  console.log(data);
  if (data.code == 200) {
    RecentVideo = data.data.list;
  }
};
let playAll = () => {};

let checkVideo = async (id) => {
  router.push({ name: 'videoPlayer', query: { mvid: id } });
  // let data = await getMvUrl(id);
  // console.log(data);
};

onMounted(() => {
  getRecentSongsAction();
  getRecentVideoAction();
});
</script>

<style lang="scss" scoped>
.active {
  background-color: red;
}
</style>
