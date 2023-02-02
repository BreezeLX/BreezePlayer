import LxRequest from '../index';

//获取banners
export function getBanner() {
  return LxRequest.request({
    url: '/banner',
    method: 'get'
  });
}

// 获取推荐歌单
export function getPersonalized() {
  return LxRequest.request({
    url: '/personalized',
    method: 'get'
  });
}

// 获取新歌推荐
export function getPersonalizedNewsong() {
  return LxRequest.request({
    url: '/personalized/newsong',
    method: 'get'
  });
}

//获取MV推荐

export function getPersonalizedMV() {
  return LxRequest.request({
    url: 'personalized/mv',
    method: 'get'
  });
}
