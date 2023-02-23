<template>
  <div class="flex py-9 border-opacity-20 item-split-line">
    <el-avatar
      class="flex-shrink-0"
      :size="40"
      :src="itemData?.user.avatarUrl"
    />
    <div class="flex-1 p-3">
      <div>
        <div class="mb-2 text-lg">
          {{ itemData?.user.nickname }} | {{ itemData?.replyCount }}
        </div>
        <div class="text-sm">{{ itemData?.content }}</div>
        <div class="text-gray-500 mt-1">
          <span>{{ itemData?.time?.toTodayTime() }}</span>
          <span
            class="ml-4 cursor-pointer"
            @click="checkLike(itemData?.liked, itemData?.commentId)"
          >
            <IconPark
              :class="{ 'text-pink-500': itemData?.liked }"
              :icon="ThumbsUp"
            ></IconPark>
            {{ itemData?.likedCount || 0 }}
          </span>
          <span
            class="cursor-pointer ml-3"
            @click="checkReply(itemData?.commentId)"
          >
            <IconPark :icon="Comment"></IconPark>
            <span class="ml-1 inline-block">回复</span>
          </span>
        </div>
        <div class="mt-2">
          <el-form v-if="itemData?.showReplyFlag && showCommentInput"
            ><el-form-item>
              <el-input
                class="inputDeep"
                v-model="curInputValue"
                autosize
                autofocus
                type="textarea"
              />
              <div class="flex w-full justify-end pt-2">
                <div
                  @click="sendCommentAction(itemData?.commentId)"
                  class="main-color cursor-pointer h-10 w-28 ml-2 rounded text-center flex items-center justify-center"
                >
                  <span>发送</span>
                </div>
              </div></el-form-item
            ></el-form
          >
        </div>
      </div>

      <!-- 回复区域 -->
      <div
        class="relay-area-wrap px-3 py-4 rounded-md mt-2 text-sm"
        v-if="floorCommentList?.length"
      >
        <div
          class="flex mb-4"
          v-for="item in floorCommentList"
          :key="item.commentId"
        >
          <el-avatar
            class="flex-shrink-0"
            :size="40"
            :src="item.user.avatarUrl"
          />
          <div class="w-full pl-3 pt-2">
            <div class="w-full">
              <span>{{ item.user.nickname }}</span>
              <span
                class="ml-2 bg-green-700 text-xs rounded-xl"
                style="padding: 2px 10px"
                v-if="itemData.user.userId === item.user.userId"
                >楼主</span
              >
              <span
                class="ml-2 text-slate-500"
                v-if="
                  (item.beRepliedUser || item?.beReplied.length) &&
                  itemData.user.userId !== item.user.userId
                "
                ><span>回复</span
                ><span class="ml-2">{{
                  item?.beRepliedUser?.nickname ||
                  item?.beReplied[0]?.user.nickname
                }}</span></span
              >
            </div>
            <div>
              <div class="pt-2">{{ item?.content }}</div>
              <div class="mt-2 text-gray-500">
                <span>{{ item?.time?.toTodayTime() }}</span>
                <span
                  class="cursor-pointer ml-3"
                  @click="checkLike(item.liked, item.commentId, true)"
                >
                  <IconPark
                    :class="{ 'text-pink-500': item?.liked }"
                    :icon="ThumbsUp"
                  ></IconPark>
                  {{ item?.likedCount || 0 }}
                </span>
                <span
                  class="cursor-pointer ml-3"
                  @click="checkReplyFloor(item?.commentId)"
                >
                  <IconPark :icon="Comment"></IconPark>
                  <span class="ml-1 inline-block">回复</span>
                  <div class="mt-2">
                    <el-form v-if="item?.showReplyFlag"
                      ><el-form-item>
                        <el-input
                          class="inputDeep"
                          v-model="curInputFloorValue"
                          autosize
                          autofocus
                          type="textarea"
                        />
                        <div class="flex w-full justify-end pt-2">
                          <div
                            @click="sendCommentAction(item?.commentId, true)"
                            class="main-color cursor-pointer h-10 w-28 ml-2 rounded text-center flex items-center justify-center"
                          >
                            <span>发送</span>
                          </div>
                        </div></el-form-item
                      ></el-form
                    >
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <span
          class="ml-12 hover-text"
          v-if="hasMore && !replyLoading"
          @click="loadMoreReply"
        >
          查看更多回复
          <IconPark class="ml-1" :icon="Down"></IconPark>
        </span>
        <span class="ml-12 hover-text" v-if="replyLoading">加载中...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ThumbsUp, Comment, Down } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { getCommentFloor, sendComment } from '@/service/modules/comment';
import { onMounted, reactive, ref, watch } from 'vue';
import { checkLikeComment } from '@/service/modules/like';

const props = defineProps<{
  itemData: any;

  mvid?: any;
  sourceVideoId?: any;
  showCommentInput?: any;
}>();

const emit = defineEmits(['checkLike', 'checkReply']);
let floorCommentList = reactive<any[]>([]);
let replyLoading = ref(false);
let hasMore = ref(true);
let curInputValue = ref();
let curInputFloorValue = ref();

//点击加载更多回复
let loadMoreReply = async () => {
  if (hasMore.value) {
    replyLoading.value = true;
    await getFloorComment({
      parentCommentId: props.itemData.commentId,
      id: props.sourceVideoId,
      mvid: props.mvid,
      time: floorCommentList[floorCommentList.length - 1].time
    });
    replyLoading.value = false;
  } else {
    console.log('no more!!');
  }
};

let checkLike = async (
  islike: boolean,
  commentId: string,
  isReply: boolean = false
) => {
  if (isReply) {
    // 对评论回复的点赞就在这里执行
    let data = await checkLikeComment({
      id: String(props.sourceVideoId),
      t: islike ? 0 : 1,
      cid: commentId
    });
    if ((data.code = 200)) {
      //如果成功点赞就静态的把点赞按钮激活成已点赞
      let index = floorCommentList.findIndex((item) => {
        return item.commentId == commentId;
      });

      floorCommentList[index].liked = !islike;
      if (!islike) {
        floorCommentList[index].likedCount += 1;
      } else {
        floorCommentList[index].likedCount -= 1;
      }
    }
    console.log(data);
  } else {
    //对主评论进行点赞操作
    emit('checkLike', {
      t: islike,
      cid: commentId,
      isReply
    });
  }
};
watch(
  () => props.showCommentInput,
  (newVal) => {
    floorCommentList.forEach((item) => {
      item.showReplyFlag = false;
    });
    let index = floorCommentList.findIndex((item) => {
      return item.commentId == newVal.commentId;
    });
    if (index != -1) {
      floorCommentList[index].showReplyFlag = true;
    }
  }
);

// 点击回复
let checkReply = (commentId, floorReply = false) => {
  curInputValue.value = '';
  curInputFloorValue.value = '';
  emit('checkReply', {
    commentId,
    floorReply
  });
};

// 点击回复楼层评论
let checkReplyFloor = (commentId, floorReply = true) => {
  checkReply(commentId, floorReply);
};

//发送评论
let sendCommentAction = async (commentId, isFloor = false) => {
  let data = await sendComment({
    id: props.sourceVideoId,
    mvid: props.mvid,
    t: 2,
    content: isFloor ? curInputFloorValue.value : curInputValue.value,
    commentId
  });
  console.log('是否留言成功', data.comment);
  if (data.code == 200) {
    curInputValue.value = '';
    curInputFloorValue.value = '';
    if (isFloor) {
      floorCommentList.push(data.comment);
    } else {
      floorCommentList.unshift(data.comment);
    }

    console.log(floorCommentList);
  }
};

//获取本楼层的回复信息  (如果有的话)
let getFloorComment = async (obj) => {
  const { data } = await getCommentFloor(obj);
  console.log('楼层评论', data);
  if (data) {
    floorCommentList.push(...data.comments);
    if (!data.hasMore) {
      hasMore.value = false;
    }
  }
};
onMounted(() => {
  getFloorComment({
    parentCommentId: props.itemData.commentId,
    id: props.sourceVideoId,
    mvid: props.mvid
  });
});
</script>

<style scoped lang="scss">
// .inputDeep {
//   ::-webkit-scrollbar {
//     width: 8px; /*滚动条宽度*/
//     height: 8px; /*滚动条高度*/
//   }
//   .el-textarea__inner::-webkit-scrollbar-thumb {
//     background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
//   }

//   .el-textarea__inner::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
//     background-color: white; /*滚动条背景色显示的颜色*/
//   }
//   :deep(.el-textarea__inner) {
//     box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.276) inset;
//     background-color: rgba(255, 0, 0, 0);
//     resize: none;
//     padding-bottom: 20px;
//   }
//   :deep(.el-input__count) {
//     background-color: rgba(255, 255, 255, 0);
//   }
// }

.el-form-item {
  margin: 0;
}
</style>
