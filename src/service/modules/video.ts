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
    params: { id }
  });
  return data;
}

//获取视频播放地址
export async function getVideoUrl(id) {
  const data = await LxRequest.request({
    url: '/video/url',
    method: 'get',
    params: { id }
  });
  return data;
}

// 获取视频详情
export async function getVideoDetail(id) {
  const data = await LxRequest.request({
    url: '/video/detail',
    method: 'get',
    params: { id }
  });
  return data;
}

// 获取相关视频推荐
export async function getRelatedVideo(id) {
  const data = await LxRequest.request({
    url: '/related/allvideo',
    method: 'get',
    params: { id }
  });
  return data;
}

// 获取mv播放地址
export async function getMvUrl(id) {
  const data = await LxRequest.request({
    url: '/mv/url',
    method: 'get',
    params: { id }
  });
  return data;
}

// 获取mv数据
export async function getMvDetail(id) {
  const data = await LxRequest.request({
    url: '/mv/detail',
    method: 'get',
    params: { mvid: id }
  });
  return data;
}

// 获取 mv 点赞转发评论数数据
export async function getMvDetailInfo(id) {
  const data = await LxRequest.request({
    url: '/mv/detail/info',
    method: 'get',
    params: { mvid: id }
  });
  return data;
}
