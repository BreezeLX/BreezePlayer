<template>
  <div class="flex my-3 cursor-pointer hover-text">
    <el-image
      :src="picUrl"
      :alt="name"
      class="bg-gray-50 w-40 flex-shrink-0 rounded-md"
    >
      <template #placeholder>
        <div class="h-full w-full flex items-center justify-center">
          <IconPark :icon="LoadingOne" class="mr-1 text-gray-300" :size="25" />
        </div>
      </template>
    </el-image>
    <div class="flex flex-col justify-center pl-4">
      <div class="overflow2">{{ name }}</div>
      <div class="overflow1 text-gray-400">by {{ creator }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlayOne, Play, Headset, LoadingOne } from '@icon-park/vue-next';
import { useNumberFormat } from '@/utils/number';
import IconPark from '@/components/common/IconPark.vue';

defineProps<{
  picUrl: string;
  playCount?: number;
  name?: string;
  showPlayCount?: boolean;
  onPlay?: () => void;
  video?: boolean;
  creator?: string;
}>();
</script>

<style>
.overflow2 {
  /* 多行文本溢出显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.overflow1 {
  /* 多行文本溢出显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
