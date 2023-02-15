import LxRequest from '../index';
import {
  ICommentArg,
  ISendCommentArg,
  IFloorCommentArg
} from '@/models/comment';
// 获取视频评论
export async function getVideoComment<T extends ICommentArg>(obj: T) {
  console.log('拿到的参数', obj);
  const data = await LxRequest.request({
    url: '/comment/new',
    method: 'get',
    params: {
      id: obj.id || obj.mvid,
      type: obj.mvid ? 1 : 5,
      pageNo: obj.pageNo,
      pageSize: obj.pageSize,
      sortType: obj.sortType,
      cursor: obj.cursor
    }
  });
  return data;
}

//获取评论层
export async function getCommentFloor<T extends IFloorCommentArg>(obj: T) {
  // console.log('接收到的floor参数', obj);
  const data = await LxRequest.request({
    url: '/comment/floor',
    method: 'get',
    params: {
      parentCommentId: obj.parentCommentId,
      time: obj.time,
      limit: obj.limit || 3,
      id: obj.id || obj.mvid,
      type: obj.mvid ? 1 : 5
    }
  });

  return data;
}

// 发送视频评论
export async function sendComment<T extends ISendCommentArg>(obj: T) {
  console.log('sendComment接口接收到的参数', obj);
  const data = await LxRequest.request({
    url: '/comment',
    method: 'get',
    params: {
      t: obj.t,
      id: obj.id || obj.mvid,
      type: obj.mvid ? 1 : 5,
      content: obj.content,
      commentId: obj.commentId
    }
  });
  return data;
}
