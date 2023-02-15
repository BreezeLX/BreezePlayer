import LxRequest from '../index';
interface ILikeCommentArg {
  id: any;
  cid: string;
  mvid?: any;
  t: 1 | 0;
  type?: number;
  threadId?: string;
}
//给评论点赞
export async function checkLikeComment<T extends ILikeCommentArg>(obj: T) {
  console.log('给评论点赞', obj);
  const data = await LxRequest.request({
    url: '/comment/like',
    method: 'get',
    params: {
      id: obj.id || obj.mvid,
      cid: obj.cid,
      t: obj.t,
      type: obj.mvid ? 1 : 5
    }
  });
  return data;
}
