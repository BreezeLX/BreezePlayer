<template>
  <div class="side-wrapper" v-for="menuListItem in menus">
    <div class="side-title">{{ menuListItem.name }}</div>
    <div class="side-item-list">
      <div
        class="side-item"
        v-for="menuItem in menuListItem.menus"
        @click="click(menuItem)"
        :class="{ active: currentKey === menuItem.key }"
      >
        <IconPark :icon="menuItem.icon" size="20" :theme="menuItem.theme" />
        <span class="menuName">{{ menuItem.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Planet,
  Music,
  VideoOne,
  Fm,
  Like,
  Computer,
  DownloadThree,
  PlayTwo
} from '@icon-park/vue-next';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

interface IMenu {
  name: string;
  key: string;
  icon: any;
  theme: 'outline' | 'filled' | 'two-tone' | 'multi-color';
}

interface IMenus {
  name: string;
  menus: IMenu[];
}

const menus: IMenus[] = [
  {
    name: '在线音乐',
    menus: [
      {
        name: '发现音乐',
        key: 'discover',
        icon: Planet,
        theme: 'outline'
      },
      {
        name: '音乐馆',
        key: 'music',
        icon: Music,
        theme: 'outline'
      },
      {
        name: '视频',
        key: 'video',
        icon: VideoOne,
        theme: 'outline'
      },
      {
        name: '电台',
        key: 'dj',
        icon: Fm,
        theme: 'outline'
      }
    ]
  },
  {
    name: '我的音乐',
    menus: [
      {
        name: '我喜欢',
        key: 'love',
        icon: Like,
        theme: 'outline'
      },
      {
        name: '本地歌曲',
        key: 'local',
        icon: Computer,
        theme: 'outline'
      },
      {
        name: '下载歌曲',
        key: 'download',
        icon: DownloadThree,
        theme: 'outline'
      },
      {
        name: '最近播放',
        key: 'recently',
        icon: PlayTwo,
        theme: 'outline'
      }
    ]
  }
];

const route = useRoute();
const currentKey = ref(route.meta.menu);
const router = useRouter();
watch(
  () => route.meta.menu,
  (menu) => {
    currentKey.value = menu;
  }
);
const click = async (menu: IMenu) => {
  await router.push({ name: menu.key, replace: true });
};
</script>

<style scoped lang="scss">
.active {
  background-color: rgba(181, 181, 181, 0.475);
}
.side-wrapper {
  color: rgb(102, 102, 102);
}
.side-title {
  text-align: left;
  font-size: 15px;
  margin: 10px 0 1px 0;
  color: rgb(134, 134, 134);
}
.side-item-list {
  text-align: left;
  .side-item {
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 8px;
    padding: 10px 10px;
    margin: 5px 0;
    display: flex;
  }
  .menuName {
    vertical-align: bottom;
    margin-left: 10px;
    font-size: 15px !important;
  }
}
</style>
