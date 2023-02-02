import LxRequest from '../index';

//获取二维码key
export async function getQrKey() {
  const { data } = await LxRequest.request({
    url: '/login/qr/key',
    method: 'get',
    params: { timerstamp: Date.now() }
  });
  return data;
}

// 二维码生成
export async function createQrImage(key) {
  const { data } = await LxRequest.request({
    url: '/login/qr/create',
    method: 'get',
    params: { key, qrimg: 1, timerstamp: Date.now() }
  });
  return data;
}

// 检查二维码状态
export async function checkQrStatus(key) {
  const data = await LxRequest.request({
    url: '/login/qr/check',
    method: 'get',
    params: { key, timerstamp: Date.now() }
  });
  return data;
}

//获取登录后的用户信息
export async function getAccountInfo() {
  const data = await LxRequest.request({
    url: '/user/account',
    method: 'get',
    params: { cookie: localStorage.getItem('USER-COOKIE') }
  });
  return data;
}

// 获取用户详情
export async function getUserDetail(uid) {
  const data = await LxRequest.request({
    url: '/user/detail',
    method: 'get',
    params: { uid, cookie: localStorage.getItem('USER-COOKIE') }
  });
  return data;
}
