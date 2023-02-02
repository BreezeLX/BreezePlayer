<template>
  <div class="music">
    <el-affix target=".music" :offset="63">
      <div class="bg-view">
        <el-tabs v-model="currentMenu" @tab-click="onTabClick">
          <el-tab-pane
            v-for="item in menus"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            class="text-main"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </el-affix>
    <div class="mt-2">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMusicMenu } from './MusicController';

const { menus, currentMenu, onTabClick } = useMusicMenu();
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0 !important;
}
</style>
