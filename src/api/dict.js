import request from '@/utils/request'

export default {
  getDictList(id) {
    return request({
      url: `/admin/cmn/dict/getChildrenData/${id}`,
      method: 'get'
    })
  }
}
