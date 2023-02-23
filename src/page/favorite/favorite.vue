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
          <div class="flex-auto pl-3">歌曲</div>
          <div class="w-1/4">歌手</div>
          <div class="w-1/4">专辑</div>
          <div class="w-20">时长</div>
        </div>
        <div class="text-sm">
          <template v-for="song in playList" :key="song.id">
            <song-list-item
              :song="song"
              show-ar-name
              show-al-name
              @contextmenu.prevent="onContextmenu(song, $event)"
              ref="treeRef"
            />
          </template>
        </div>
      </div>
    </div>
    <div v-else>加载中。。。</div>
  </div>
  <goLogin v-else></goLogin>
  <RightMenu
    :rightclickInfo="rightclickInfo"
    :class-index="0"
    @play="play"
    @collect="collect"
    @deleteMusic="deleteMusic"
  ></RightMenu>
</template>

<script lang="ts" setup>
import { PlayOne, Like, More } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { getPlayListTrackAll } from '@/service/modules/playlist';
import { onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useMusicPlayList } from '@/store/musicPlayList';
import { ElMessage, ElMessageBox } from 'element-plus';

let { isLogin } = storeToRefs(useUserStore());
let { createdList } = storeToRefs(useMusicPlayList());
let playList = reactive<any[]>([]);
let isLoading = ref(false);
const { moveMusicToList, getMyMusicListAction } = useMusicPlayList();
let rightclickInfo = ref();
//获取节点调取子组件暴露的方法
const treeRef = ref();
//绑定触发事件删除父组件的歌单元素
const emit = defineEmits(['delMusicFromList']);
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
      },
      {
        fnName: 'deleteMusic',
        params: { song, event },
        icoName: 'el-icon-delete',
        btnName: '从歌单中删除'
      }
    ]
  };
};
//右击菜单点击播放
let play = (params) => {
  let song = params.song;
  console.log('play', song, playList);
  let index = playList.findIndex((item) => song.id == item.id);
  treeRef.value[index].playMusic(song);
};
// 右击菜单点击收藏
let collect = (params) => {
  console.log('触发鼠标右击菜单收藏', params);
  let song = params.song;
  let index = playList.findIndex((item) => song.id == item.id);
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
      pid: createdList?.value[0]?.id,
      tracks: song.id
    });
    console.log('是否删除成功', data);
    if (data.body.code == 200) {
      // 通知父组件删除改数据
      emit('delMusicFromList', song);
      //更新我的音乐列表
      getMyMusicListAction(localStorage.getItem('userId'));
      ElMessage({
        message: '移除成功',
        type: 'success'
      });
    } else {
      ElMessage({
        message: '移除失败',
        type: 'warning'
      });
    }
  });
};

//监听如果有创建列表就执行一次
watch(createdList, async (newVal: any) => {
  if (playList.length == 0) {
    getData(createdList?.value[0]?.id);
  }
});
//获取数据
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
  getData(createdList?.value[0]?.id);
});
</script>

<style></style>
