<template>
  <div
    class="hover-bg-view bg-dc flex p-2 rounded items-center cursor-pointer 2xl:w-2/3"
  >
    <el-image class="flex-shrink-0" fit="cover" :src="videoItem.coverUrl" />
    <div>
      <div class="pl-2 text-xl">{{ videoItem.name }}</div>
      <div class="pl-2 text-gray-400">
        <span>时长：</span
        ><span>{{ useFormatDuring(videoItem.duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFormatDuring } from '@/utils/number';

defineProps<{ videoItem: any }>();

// 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
</script>

<style lang="scss" scoped>
.el-image {
  width: 190px;
  height: 100px;
  border-radius: 4px;
}
</style>
