import request from '@/utils/request'

export default {
  getHospitalList(queryParams) {
    return request({
      url: '/admin/hosp/hospital/getHospitalList',
      method: 'post',
      data: queryParams
    })
  },
  getByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/getByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  getChildrenData(id) {
    return request({
      url: `/admin/cmn/dict/getChildrenData/${id}`,
      method: 'get'
    })
  },
  updateHospitalStatus(hospital) {
    return request({
      url: '/admin/hosp/hospital/updateHospitalStatus',
      method: 'post',
      data: hospital
    })
  },
  getDetail(id) {
    return request({
      url: `/admin/hosp/hospital/getHospitalDetail/${id}`,
      method: 'get'
    })
  },
  getDepartmentList(hoscode) {
    return request({
      url: `/admin/hosp/department/getDepartmentList/${hoscode}`,
      method: 'get'
    })
  },
  getScheduleRule(schedule) {
    return request({
      url: '/admin/hosp/schedule/getScheduleRule',
      method: 'post',
      data: schedule
    })
  },
  getScheduleDetail(schedule) {
    return request({
      url: '/admin/hosp/schedule/getScheduleDetail',
      method: 'post',
      data: schedule
    })
  }
}
