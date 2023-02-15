import LxRequest from '../index';

// 获取音乐详情
export async function getSongDetail(ids: string) {
  const data = await LxRequest.request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  });
  return data;
}
