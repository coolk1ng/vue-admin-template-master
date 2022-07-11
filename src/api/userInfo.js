import request from '@/utils/request'

export default {
  getUserList(userInfo) {
    return request({
      url: '/admin/user/getUserList',
      method: 'post',
      data: userInfo
    })
  },
  lockAndUnLock(userInfo) {
    return request({
      url: '/admin/user/lockAndUnLock',
      method: 'post',
      data: userInfo
    })
  },
  show(id) {
    return request({
      url: `/admin/user/getUserDetail/${id}`,
      method: 'get'
    })
  },
  approval(userInfo) {
    return request({
      url: '/admin/user/approval',
      method: 'post',
      data: userInfo
    })
  }
}
