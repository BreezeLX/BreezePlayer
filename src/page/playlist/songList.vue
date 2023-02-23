<template>
  <div>
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto pl-3">歌曲</div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs.slice(0, pageSize * page)" :key="song.id">
        <song-list-item
          :song="song"
          show-ar-name
          show-al-name
          @contextmenu.prevent="onContextmenu(song, $event)"
          ref="treeRef"
        />
      </template>
    </div>
    <div
      class="flex justify-center py-5"
      v-if="songs.length > pageSize && !noMore"
    >
      <el-button class="Btn text-center w-full" @click="loadMore"
        >加载更多</el-button
      >
    </div>
  </div>
  <RightMenu
    :rightclickInfo="rightclickInfo"
    :class-index="0"
    @play="play"
    @collect="collect"
    @deleteMusic="deleteMusic"
  ></RightMenu>
</template>

<script lang="ts" setup>
import type { Song } from '@/models/song';
import { computed, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useMusicPlayList } from '@/store/musicPlayList';
const { moveMusicToList, getMyMusicListAction } = useMusicPlayList();
let rightclickInfo = ref();
//获取节点调取子组件暴露的方法
const treeRef = ref();
//绑定触发事件删除父组件的歌单元素
const emit = defineEmits(['delMusicFromList']);
const props = defineProps<{
  songs: Song[];
  playList?: any;
}>();

//右击显示菜单
let onContextmenu = (song, event) => {
  rightclickInfo.value = {
    position: {
      x: event.clientX,
      y: event.clientY
    },
    menulists: [
      {
        fnName: 'play',
        params: { song, event },
        icoName: 'el-icon-document-copy',
        btnName: '播放'
      },
      {
        fnName: 'collect',
        params: { song, event },
        icoName: 'el-icon-edit',
        btnName: '收藏到歌单'
      }
    ]
  };
  if (!props.playList.subscribed) {
    rightclickInfo.value.menulists.push({
      fnName: 'deleteMusic',
      params: { song, event },
      icoName: 'el-icon-delete',
      btnName: '从歌单中删除'
    });
  }
};
//右击菜单点击播放
let play = (params) => {
  let song = params.song;
  console.log('play', song, props.songs);
  let index = props.songs.findIndex((item) => song.id == item.id);
  treeRef.value[index].playMusic(song);
};
// 右击菜单点击收藏
let collect = (params) => {
  console.log('触发鼠标右击菜单收藏', params);
  let song = params.song;
  let index = props.songs.findIndex((item) => song.id == item.id);
  treeRef.value[index].checkCollect(song);
};
// 右击菜单点击删除
let deleteMusic = (params) => {
  let song = params.song;
  ElMessageBox.confirm('你确定要将此歌曲从歌单中删除', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    autofocus: false
  }).then(async () => {
    let data: any = await moveMusicToList({
      op: 'del',
      pid: props.playList.id,
      tracks: song.id
    });
    if (data.body.code == 200) {
      // 通知父组件删除改数据
      emit('delMusicFromList', song);
      //更新我的音乐列表
      getMyMusicListAction(localStorage.getItem('userId'));
    } else {
      ElMessage({
        message: '移除失败',
        type: 'warning'
      });
    }
  });
};

const pageSize = ref(20);
const page = ref(1);

const loadMore = () => {
  page.value = page.value + 1;
};

const noMore = computed(() => {
  return page.value - props.songs.length / pageSize.value >= 0;
});
</script>

<style lang="scss" scoped></style>
