import LxRequest from '../index';
//获取排行
export async function getTopListDetail() {
  const { list } = await LxRequest.request({
    url: '/toplist/detail',
    method: 'get'
  });
  return list;
}
