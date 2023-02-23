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
  <!-- 我的歌单模块 -->
  <div class="side-wrapper">
    <div
      class="side-title flex items-center cursor-pointer"
      @click="switchList('create')"
    >
      <div>我创建的歌单</div>
      <IconPark
        :icon="Right"
        size="20"
        v-if="!createdListSpread"
        theme="outline"
      />
      <IconPark :icon="Down" size="20" v-else theme="outline" />
    </div>
    <div v-if="createdListSpread">
      <div
        class="pl-2 py-1 flex items-center rounded my-1 cursor-pointer"
        v-for="item in createdList"
        :key="item.id"
        @click="checkPlaylist(item.id)"
      >
        <IconPark :icon="MusicMenu" size="20" theme="outline" />
        <span class="truncate ml-1">{{ item.name }}</span>
      </div>
    </div>
    <!-- 我收藏的歌单模块 -->
    <div class="side-wrapper">
      <div
        class="side-title flex items-center cursor-pointer"
        @click="switchList('collect')"
      >
        <div>我收藏的歌单</div>
        <IconPark
          :icon="Right"
          size="20"
          v-if="!collectListSpread"
          theme="outline"
        />
        <IconPark :icon="Down" size="20" v-else theme="outline" />
      </div>
      <div v-if="collectListSpread">
        <div
          class="pl-2 py-1 flex items-center rounded my-1 cursor-pointer"
          v-for="item in collectList"
          :key="item.id"
          @click="checkPlaylist(item.id)"
        >
          <IconPark :icon="MusicMenu" size="20" theme="outline" />
          <span class="truncate ml-1">{{ item.name }}</span>
        </div>
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
  PlayTwo,
  Down,
  Right,
  MusicMenu
} from '@icon-park/vue-next';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useMusicPlayList } from '@/store/musicPlayList';
import { storeToRefs } from 'pinia';

const { musicList, collectList, createdList } = storeToRefs(useMusicPlayList());

interface IMenu {
  name: string;
  key: string;
  icon?: any;
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color';
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
        name: '我喜欢的音乐',
        key: 'favorite',
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
        key: 'recent',
        icon: PlayTwo,
        theme: 'outline'
      }
    ]
  }
];

const route = useRoute();
const currentKey = ref(route.meta.menu);
const router = useRouter();

let createdListSpread = ref(false);
let collectListSpread = ref(false);

watch(
  () => route.meta.menu,
  (menu) => {
    currentKey.value = menu;
  }
);

//点击展开歌单
let switchList = (type: string) => {
  if (type == 'create') {
    createdListSpread.value = !createdListSpread.value;
  } else {
    collectListSpread.value = !collectListSpread.value;
  }
};
// 点击我的歌单列表
let checkPlaylist = async (id: number) => {
  await router.push({ name: 'playlist', query: { id }, replace: true });
};

//获取用户歌单
const click = async (menu: IMenu) => {
  await router.push({ name: menu.key, replace: true });
};
</script>

<style scoped lang="scss">
.side-wrapper {
  font-size: 15px;
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
    padding: 5px 10px;
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
