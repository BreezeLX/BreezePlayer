import LxRequest from '../index';
import { ICommentArg } from '@/models/comment';
// 获取视频评论
export async function getVideoComment<T extends ICommentArg>(obj: T) {
  const data = await LxRequest.request({
    url: '/comment/new',
    method: 'get',
    params: {
      id: obj.id,
      type: 5,
      pageNo: obj.pageNo,
      pageSize: obj.pageSize,
      sortType: obj.sortType || 2
    }
  });
  return data;
}
