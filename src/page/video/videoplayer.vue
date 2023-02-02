<template>
  <div class="flex">
    <div class="flex-1">
      <span
        class="mb-3 hover-text cursor-pointer inline-block"
        @click="checkBack"
      >
        <IconPark :icon="Return" /><span class="ml-1">返回视频</span>
      </span>
      <video class="w-full" :src="videoUrl" controls></video>
      <div class="flex items-center pt-5 justify-between">
        <div class="flex items-center">
          <el-avatar :size="50" :src="videoDetail?.creator.avatarUrl" />
          <div class="pl-4">{{ videoDetail?.creator.nickname }}</div>
        </div>
        <div class="bg-slate-600 py-2 px-5 rounded-3xl cursor-pointer">
          <IconPark :icon="Plus" />关注
        </div>
      </div>
      <div class="text-2xl py-5">
        {{ videoDetail?.title }}
      </div>
      <div class="flex">
        <div>发布日期：{{ videoDetail?.publishTime.toDate() }}</div>
        <div class="pl-5">
          播放次数：{{ useNumberFormat(videoDetail?.playTime || 0) }}次
        </div>
      </div>
      <div class="flex items-center pt-2">
        <div
          class="bg-gray-600 px-2 rounded-xl mr-3 cursor-pointer hover-text"
          v-for="item in videoDetail?.videoGroup"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="flex pt-3">
        <div class="border py-1 px-5 rounded-3xl mr-3">
          <IconPark :icon="ThumbsUp" /><span class="ml-2"
            >点赞 {{ videoDetail?.praisedCount }}</span
          >
        </div>
        <div class="border py-1 px-5 rounded-3xl mr-3">
          <IconPark :icon="FolderFailedOne" /><span class="ml-2"
            >收藏 {{ videoDetail?.subscribeCount }}</span
          >
        </div>
        <div class="border py-1 px-5 rounded-3xl mr-3">
          <IconPark :icon="Share" /><span class="ml-2"
            >分享 {{ videoDetail?.shareCount }}
          </span>
        </div>
      </div>
      <div>
        <div class="mt-8 mb-2">
          <span class="text-2xl mr-2">评论</span>({{
            videoDetail?.commentCount
          }})
        </div>
        <div class="flex">
          <div class="flex-1"><comment></comment></div>
          <div
            class="w-28 ml-2 bg-gray-600 rounded text-center flex items-center justify-center"
          >
            <span>发送</span>
          </div>
        </div>
      </div>
      <div class="flex items-center mt-3">
        <div
          class="cursor-pointer"
          :class="{
            'text-slate-500': curCommentType !== 'hot'
          }"
          @click="curCommentTypeChange('hot')"
        >
          最热
        </div>
        <span class="bg-white h-5 mx-7" style="width: 1px; opacity: 0.5"></span>
        <div
          class="cursor-pointer"
          :class="{
            'text-slate-500': curCommentType !== 'new'
          }"
          @click="curCommentTypeChange('new')"
        >
          最新
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="mt-3" v-if="!pageData.commentLoading">
        <commentItem
          v-for="item in commentList"
          :picUrl="item.user.avatarUrl"
          :name="item.user.nickname"
          :content="item.content"
          :like="item.likedCount"
          :time="item.time"
          :islike="item.liked"
          :relayArray="item?.showFloorComment.comments"
        ></commentItem>
        <el-button
          class="text-center w-full"
          @click="loadMore"
          color="rgb(30, 30, 31)"
          >加载更多</el-button
        >
      </div>
      <!-- 加载模块 -->
      <div
        class="pt-10 text-center"
        element-loading-background="rgba(0, 0, 0, 0)"
        element-loading-text="加载中..."
        v-loading="1"
        style="height: 666px"
        v-else
      ></div>
    </div>
    <div class="w-80 hidden 2xl:block pl-4 pr-1">
      <div>相关推荐</div>
      <div>
        <relatedVideoItem
          v-for="item in relatedVideoList"
          :picUrl="item.coverUrl"
          :name="item.title"
          :creator="item.creator[0].userName"
          @click="checkVideo(item.vid)"
        ></relatedVideoItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Return,
  Plus,
  ThumbsUp,
  FolderFailedOne,
  Share
} from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { useRoute, useRouter } from 'vue-router';
import relatedVideoItem from './relatedVideoItem.vue';
import { useNumberFormat } from '@/utils/number';
import comment from './comment.vue';
import commentItem from './commentItem.vue';
import { ICommentArg } from '@/models/comment';
import {
  getVideoUrl,
  getVideoDetail,
  getRelatedVideo
} from '@/service/modules/video';
import { getVideoComment } from '@/service/modules/comment';
import { onMounted, reactive, ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
let vid = ref(route.query.id);
let videoUrl = ref('');
let relatedVideoList = ref();
let videoDetail = ref();
let commentList = ref<any[]>([]);
let curCommentType = ref('hot');
let pageData = reactive({
  pageNo: 0,
  pageSize: 20,
  sortType: 2,
  cursor: '',
  commentLoading: false
});

//点击加载更多评论
let loadMore = () => {
  pageData.pageNo += 1;
  getCommentData({ id: String(vid.value), pageNo: pageData.pageNo });
};

let curCommentTypeChange = (type: string) => {
  if (type !== curCommentType.value) {
    curCommentType.value = type;
    commentList.value = [];
    getCommentData({
      id: String(vid.value),
      sortType: curCommentType.value == 'hot' ? 2 : 3
    });
  }
};
//点击返回按钮
let checkBack = () => {
  router.push({ name: 'video' });
};

//点击相关视频
let checkVideo = async (id: string) => {
  await router.replace({ name: 'videoPlayer', query: { id } });
  vid.value = route.query.id;
};

watch(
  () => vid.value,
  (newVal) => {
    getData(String(newVal));
    getCommentData({ id: String(newVal) });
  }
);

const getCommentData = async <T extends ICommentArg>(obj: T) => {
  pageData.commentLoading = true;
  console.log(
    '请求是参数',
    'id',
    obj.id,
    'pageNo',
    obj.pageNo,
    'pageSize',
    obj.pageSize,
    'sortType',
    obj.sortType
  );
  let { data } = await getVideoComment({
    id: obj.id,
    pageNo: obj.pageNo,
    pageSize: obj.pageSize,
    sortType: obj.sortType
  });
  commentList.value.push(...data.comments);
  setTimeout(() => {
    pageData.commentLoading = false;
  }, 500);
  console.log('评论数据', data);
};

//获取数据
const getData = async (id: string) => {
  let getVideoUrlP = getVideoUrl(id);
  let getVideoDetailP = getVideoDetail(id);
  let getRelatedVideoP = getRelatedVideo(id);
  const [url, detail, relatedVideo] = await Promise.all([
    getVideoUrlP,
    getVideoDetailP,
    getRelatedVideoP
  ]);
  console.log('视频播放地址', url);
  console.log('视频详情', detail);
  console.log('相关视频推荐', relatedVideo);
  videoDetail.value = detail.data;
  relatedVideoList.value = relatedVideo.data;
  videoUrl.value = url.urls[0].url;
};

onMounted(() => {
  getData(String(vid.value));
  getCommentData({ id: String(vid.value) });
});
</script>

<style scoped lang="scss">
:deep(.el-loading-spinner) {
  top: 10% !important;
}

button {
  border: 1px solid rgba(255, 255, 255, 0.289);
}
.el-button {
  color: rgb(222, 222, 222);
}
</style>
