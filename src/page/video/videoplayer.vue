<template>
  <div class="flex">
    <div class="flex-1">
      <span
        class="mb-3 hover-text cursor-pointer inline-block"
        @click="checkBack"
      >
        <IconPark :icon="Return" /><span class="ml-1">返回视频</span>
      </span>
      <video class="w-full" :src="pageData.videoUrl" controls></video>
      <div class="flex items-center pt-5 justify-between">
        <div class="flex items-center">
          <el-avatar :size="50" :src="videoDetail?.creator?.avatarUrl" />
          <div class="pl-4">
            {{ videoDetail?.creator?.nickname }}
          </div>
        </div>
        <div class="bg-slate-600 py-2 px-5 rounded-3xl cursor-pointer">
          <IconPark :icon="Plus" />关注
        </div>
      </div>
      <div class="text-2xl py-5">
        {{ videoDetail?.title }}
      </div>
      <div class="flex">
        <div>发布日期：{{ videoDetail?.publishTime?.toDate() }}</div>
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
          <div class="flex-1">
            <el-form
              ><el-form-item>
                <el-input
                  class="inputDeep"
                  v-model="pageData.curCommentContent"
                  type="textarea"
                  maxlength="200"
                  autosize
                  show-word-limit
                /> </el-form-item
            ></el-form>
          </div>
          <div
            @click="sendCommentAction"
            class="cursor-pointer w-28 ml-2 bg-gray-600 rounded text-center flex items-center justify-center"
          >
            <span>发送</span>
          </div>
        </div>
      </div>
      <div class="flex items-center mt-3">
        <div
          class="cursor-pointer"
          :class="{
            'text-slate-500': pageData.curCommentType !== 'hot'
          }"
          @click="curCommentTypeChange('hot')"
        >
          最热
        </div>
        <span class="bg-white h-5 mx-7" style="width: 1px; opacity: 0.5"></span>
        <div
          class="cursor-pointer"
          :class="{
            'text-slate-500': pageData.curCommentType !== 'new'
          }"
          @click="curCommentTypeChange('new')"
        >
          最新
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="mt-3">
        <commentItem
          v-for="item in commentList"
          :key="item.commentId"
          @checkLike="checkLike"
          @checkReply="checkReply"
          :itemData="item"
          :sourceVideoId="pageData.id"
          :mvid="pageData.mvid"
          :showCommentInput="showCommentInput"
        ></commentItem>
        <el-button
          v-if="!pageData.tabChangeLoading"
          :loading="pageData.commentLoading"
          class="text-center w-full"
          @click="loadMore(pageData.hasmore)"
          color="rgb(30, 30, 31)"
          >{{ pageData.hasmore ? '加载更多' : '没有更多评论啦~' }}</el-button
        >
      </div>
      <!-- 加载模块 -->
      <div
        class="pt-10 text-center"
        element-loading-background="rgba(0, 0, 0, 0)"
        element-loading-text="加载中..."
        v-if="pageData.tabChangeLoading"
        v-loading="pageData.tabChangeLoading"
        style="height: 666px"
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
import commentItem from './commentItem.vue';
import { checkLikeComment } from '@/service/modules/like';
import {
  getVideoUrl,
  getVideoDetail,
  getRelatedVideo,
  getMvDetailInfo,
  getMvUrl,
  getMvDetail
} from '@/service/modules/video';
import { getVideoComment, sendComment } from '@/service/modules/comment';
import { computed, onMounted, reactive, ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();

let relatedVideoList = ref();
let videoDetail = reactive<any>({});
let commentList = reactive<any[]>([]);
let showCommentInput = ref({});

let pageData = reactive({
  id: route.query.id, //当前请求的视频id  vid
  mvid: route.query.mvid,
  pageNo: 1, //当前请求的页数
  pageSize: 5, //每页多少条评论
  cursor: '', //当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
  commentLoading: false,
  videoUrl: '',
  curCommentType: 'hot',
  tabChangeLoading: false,
  hasmore: true,

  curCommentContent: ''
});
let sortType = computed(() => {
  return pageData.curCommentType == 'hot' ? 2 : 3;
});
//点击发送评论
let sendCommentAction = async () => {
  console.log(pageData.curCommentContent);
  let data = await sendComment({
    id: pageData.id,
    mvid: pageData.mvid,
    t: 1,
    content: pageData.curCommentContent
  });
  console.log(data);
  if (data.code == 200) {
    pageData.curCommentContent = '';
    if (pageData.curCommentType == 'hot') {
      setTimeout(() => {
        curCommentTypeChange('new');
      }, 500);
    } else {
      commentList.unshift(data.comment);
    }
  }
};
// 给评论点赞  t为点赞表示 是否取消
let checkLike = async (obj) => {
  //触发点赞
  let data = await checkLikeComment({
    id: pageData.id,
    mvid: pageData.mvid,
    t: obj.t ? 0 : 1,
    cid: obj.cid
  });
  console.log('点赞拿到的参数', obj);
  if (data.code == 200) {
    //如果成功点赞就静态的把点赞按钮激活成已点赞
    let index = commentList.findIndex((item) => {
      return item.commentId == obj.cid;
    });
    if (!obj.isReply) {
      console.log('当前点赞', commentList[index]);
      commentList[index].liked = !obj.t;
      if (!obj.t) {
        commentList[index].likedCount += 1;
      } else {
        commentList[index].likedCount -= 1;
      }
    }
  }
  console.log(data);
};

let checkReply = (obj) => {
  commentList.forEach((item) => {
    item.showReplyFlag = false;
  });
  if (obj.floorReply) {
    showCommentInput.value = obj;
  } else {
    showCommentInput.value = obj;
    let index = commentList.findIndex((item) => {
      return item.commentId == obj.commentId;
    });
    commentList[index].showReplyFlag = true;
  }

  // console.log('触发commentId', commentId);
};

//点击加载更多评论
let loadMore = (hasMore: boolean) => {
  if (hasMore) {
    console.log('more');
    getCommentData({
      mvid: pageData.mvid,
      id: pageData.id,
      pageNo: pageData.pageNo,
      pageSize: pageData.pageSize
    });
  }
};
//
let curCommentTypeChange = (type: string) => {
  if (type !== pageData.curCommentType) {
    pageData.curCommentType = type;
    pageData.tabChangeLoading = true;
    commentList.length = 0;
    pageData.pageNo = 1;
    getCommentData({
      id: String(pageData.id),
      sortType: pageData.curCommentType == 'hot' ? 2 : 3
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
  pageData.id = route.query.id;
};

watch(
  () => pageData.id,
  (newVal) => {
    getData(String(newVal));
    getCommentData({ id: String(newVal) });
  }
);
//获取评论
const getCommentData = async (obj) => {
  pageData.commentLoading = true;
  let { data } = await getVideoComment(
    (obj = {
      mvid: pageData.mvid,
      id: pageData.id,
      pageNo: pageData.pageNo,
      pageSize: pageData.pageSize,
      sortType: sortType.value,
      cursor: commentList[commentList.length - 1]?.time
    })
  );

  console.log(data);

  pageData.pageNo += 1;
  commentList.push(...data.comments);
  setTimeout(() => {
    pageData.commentLoading = false;
    pageData.tabChangeLoading = false;
  }, 1000);
  pageData.hasmore = data.hasMore;
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
  console.log(detail);
  // console.log('视频播放地址', url);
  // console.log('视频详情', detail);
  // console.log('相关视频推荐', relatedVideo);
  videoDetail = detail.data;
  relatedVideoList.value = relatedVideo.data;
  pageData.videoUrl = url.urls[0].url;
};

//如果出入的id是mvid
const getMvData = async (mvid = Number(pageData.mvid)) => {
  let { data: mvUrl } = await getMvUrl(mvid);
  let { data: mvDetail } = await getMvDetail(mvid);
  let MvDetailInfo = await getMvDetailInfo(mvid);
  console.log(MvDetailInfo);
  pageData.videoUrl = mvUrl.url;
  videoDetail.value = mvDetail;
  console.log(mvDetail);
  videoDetail.creator = {};
  videoDetail.creator.nickname = mvDetail.artists[0].name;
  videoDetail.creator.avatarUrl = mvDetail.artists[0].img1v1Url;
  videoDetail.title = mvDetail.name;
  videoDetail.publishTime = new Date(mvDetail.publishTime).getTime();
  videoDetail.playTime = mvDetail.playCount;
  videoDetail.praisedCount = MvDetailInfo.likedCount;
  videoDetail.subscribeCount = mvDetail.subCount;
  videoDetail.shareCount = mvDetail.shareCount;
  videoDetail.commentCount = MvDetailInfo.commentCount;
};

onMounted(() => {
  console.log(route.query);
  if (route.query.id) {
    getData(String(pageData.id));
    getCommentData({});
  } else {
    getMvData();
    getCommentData({});
  }
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

.inputDeep {
  ::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
    height: 8px; /*滚动条高度*/
  }
  .el-textarea__inner::-webkit-scrollbar-thumb {
    background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
  }

  .el-textarea__inner::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: white; /*滚动条背景色显示的颜色*/
  }
  :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.276) inset;
    background-color: rgba(255, 0, 0, 0);
    resize: none;
    padding-bottom: 20px;
  }
  :deep(.el-input__count) {
    background-color: rgba(255, 255, 255, 0);
  }
}

.el-form-item {
  margin: 0;
}
</style>
