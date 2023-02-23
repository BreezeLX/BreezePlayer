<template>
  <div v-if="isLogin">
    <el-popover
      placement="bottom-start"
      trigger="click"
      popper-class="popperClass popover-width"
    >
      <template #reference>
        <button class="button-outline px-5">
          <span class="mr-2"
            >全部视频 <IconPark :icon="Right" /> {{ currentGroupTitle }}</span
          >
        </button>
      </template>
      <div>
        <div class="h-96 py-5 pl-5">
          <ElScrollbar>
            <div class="text-xs gap-5 grid grid-flow-row grid-cols-5">
              <div
                class="hover-text"
                :class="{ 'text-active': curId === item.id }"
                v-for="item in videoGroup"
                :key="item.id"
                @click="idChange(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </ElScrollbar>
        </div>
      </div>
    </el-popover>
    <div
      class="grid grid-flow-row grid-cols-2 miniplayer:grid-cols-3 xl:grid-cols-4 gap-5 mt-5"
    >
      <div
        v-for="{ data } in videoList"
        @click="checkvideo(data.vid)"
        :key="data.vid"
        class="cursor-pointer"
      >
        <CoverPlay
          :pic-url="data?.coverUrl"
          video
          :playCount="data?.playTime"
          :showPlayCount="true"
        />
        <div class="text-xs mt-3 truncate hover-text">{{ data.title }}</div>
        <div
          class="text-xs mt-1 truncate cursor-pointer hover-text text-slate-400"
        >
          <span class="mr-1">by</span>{{ data.creator.nickname }}
        </div>
      </div>
    </div>
    <div class="py-10">
      <el-button
        class="Btn text-center w-full"
        @click="loadMore"
        :loading="loading"
        >加载更多</el-button
      >
    </div>
  </div>
  <goLogin v-else></goLogin>
</template>

<script lang="ts" setup>
import { Right } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { onMounted, watch } from 'vue';
import { useVideoStore } from '@/store/video';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

let { isLogin } = storeToRefs(useUserStore());
const { getDataAction, getVideoListAction } = useVideoStore();
let { videoList, videoGroup, page, curId, loading, currentGroupTitle } =
  storeToRefs(useVideoStore());
const Router = useRouter();

// id变化
let idChange = (id) => {
  videoList.value = [];
  curId.value = id;
  page.value = 0;
  console.log(curId.value);
};

// //监听当前标签id变化
watch(
  () => curId.value,
  (newVal) => {
    console.log(newVal);
    getVideoListAction(newVal);
  }
);

//check loadmore
let loadMore = () => {
  getVideoListAction(curId.value, page.value++);
};

//check video
let checkvideo = (id) => {
  Router.push({ name: 'videoPlayer', query: { id } });
};

onMounted(async () => {
  getDataAction();
});
</script>

<style scoped lang="scss"></style>
