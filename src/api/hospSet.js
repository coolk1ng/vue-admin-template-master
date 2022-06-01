import request from '@/utils/request'

export default {
  /**
   * 查询列表
   * @param queryParams
   * @returns {*}
   */
  getHospitalSetList(queryParams) {
    return request({
      url: '/admin/hosp/hospitalSet/getHospitalSetList',
      method: 'post',
      data: queryParams
    })
  },
  /**
   * 根据id删除
   * @param id
   * @returns {*}
   */
  removeHospSetById(id) {
    return request({
      url: '/admin/hosp/hospitalSet/deleteHospitalSetById',
      method: 'post',
      data: id
    })
  },
  /**
   * 批量删除
   * @param idList
   * @returns {*}
   */
  batchRemoveHospSetByIdList(idList) {
    return request({
      url: '/admin/hosp/hospitalSet/batchRemoveHospitalSet',
      method: 'post',
      data: idList
    })
  },
  /**
   * 锁定,解锁
   * @param queryParams
   * @returns {*}
   */
  lockAndUnLockHosSetStatus(queryParams) {
    return request({
      url: '/admin/hosp/hospitalSet/lockAndUnLockHospitalSet',
      method: 'post',
      data: queryParams
    })
  },
  /**
   * 添加
   * @param hospitalSet
   * @returns {*}
   */
  saveHosSet(hospitalSet) {
    return request({
      url: '/admin/hosp/hospitalSet/saveHospitalSet',
      method: 'post',
      data: hospitalSet
    })
  },
  getHospSetById(id) {
    return request({
      url: `/admin/hosp/hospitalSet/getHospitalSetById/${id}`,
      method: 'get'
    })
  },
  updateHosSet(hospitalSet) {
    return request({
      url: '/admin/hosp/hospitalSet/updateHospitalSet',
      method: 'post',
      data: hospitalSet
    })
  }
}
