import LxRequest from '../index';

//获取视频标签列表
export async function getGroupList() {
  const { data } = await LxRequest.request({
    url: '/video/group/list',
    method: 'get'
  });
  return data;
}

// 获取视频标签/分类下的视频
export async function getVideoList(id?: number, offset?: number) {
  const data = await LxRequest.request({
    url: id ? '/video/group' : '/video/timeline/recommend',
    method: 'get',
    params: { id, cookie: localStorage.getItem('USER-COOKIE'), offset }
  });
  return data;
}

//获取视频播放地址
export async function getVideoUrl(id) {
  const data = await LxRequest.request({
    url: '/video/url',
    method: 'get',
    params: { id, cookie: localStorage.getItem('USER-COOKIE') }
  });
  return data;
}

// 获取视频详情
export async function getVideoDetail(id) {
  const data = await LxRequest.request({
    url: '/video/detail',
    method: 'get',
    params: { id, cookie: localStorage.getItem('USER-COOKIE') }
  });
  return data;
}

// 获取相关视频推荐
export async function getRelatedVideo(id) {
  const data = await LxRequest.request({
    url: '/related/allvideo',
    method: 'get',
    params: { id, cookie: localStorage.getItem('USER-COOKIE') }
  });
  return data;
}
