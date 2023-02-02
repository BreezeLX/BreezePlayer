<template>
  <div class="flex py-9 border-opacity-20 border-white border-b">
    <el-avatar class="flex-shrink-0" :size="50" :src="picUrl" />
    <div class="flex-1 p-3">
      <div>
        <div class="mb-2">{{ name }}</div>
        <div class="">{{ content }}</div>
        <div class="text-gray-500 mt-1">
          <span>{{ time?.toTodayTime() }}</span>
          <span class="ml-4">
            <IconPark class="cursor-pointer" :icon="ThumbsUp"></IconPark>
            {{ like || 0 }}
          </span>
          <span class="ml-3 cursor-pointer hover-text">回复</span>
        </div>
      </div>
      <!-- 回复区域 -->
      <div
        class="bg-gray-700 px-3 py-4 rounded-md mt-2"
        v-if="relayArray?.length"
      >
        <div class="flex" v-for="item in relayArray">
          <el-avatar
            class="flex-shrink-0"
            :size="40"
            :src="item?.user.avatarUrl"
          />
          <div class="flex-1 p-2">
            <div class="mb-2">
              <span>{{ item?.user.nickname }}</span
              ><span class="ml-3">{{ item?.content }}</span>
            </div>
            <div class="text-gray-500 mt-1">
              <span>{{ item?.time.toTodayTime() }}</span>
              <span class="ml-4">
                <IconPark class="cursor-pointer" :icon="ThumbsUp"></IconPark>
                {{ item?.likedCount }}
              </span>
              <span class="ml-3 cursor-pointer hover-text">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ThumbsUp } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
defineProps<{
  picUrl: string;
  content: string;
  name: string;
  replycontent?: string;
  like: number;
  time?: number;
  relayArray?: any[];
}>();
</script>

<style></style>
