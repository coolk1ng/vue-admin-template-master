<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="queryParams.provinceCode"
          placeholder="请选择省"
          @change="getCityByProvince">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="queryParams.cityCode"
          placeholder="请选择市">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryParams.hosname" placeholder="医院名称"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getHospitalData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="hospitalList"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="60"
        align="center">
        <template slot-scope="scope">
          {{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}
      </template></el-table-column>
      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80" alt="">
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="param.hostype" label="等级" width="90"/>
      <el-table-column prop="param.fullAddress" label="详情地址"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '未上线' : '已上线' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作" width="230" align="center">
        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="scope">
            <router-link :to="'/hospSet/hospital/show/'+scope.row.id">
              <el-button type="primary" size="mini">查看</el-button>
            </router-link>
            <el-button v-if="scope.row.status == 1" type="primary" size="mini" @click="updateStatus(scope.row.id, 0)">下线</el-button>
            <el-button v-if="scope.row.status == 0" type="danger" size="mini" @click="updateStatus(scope.row.id, 1)">上线</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      :total="total"
      background
      style="float: right"
      layout="total,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import hosp from '../../api/hosp'

export default {
  name: 'List',
  data() {
    return {
      hospitalList: [],
      provinceList: [],
      districtList: [],
      cityList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        hosname: ''
      },
      hospital: {
        id: '',
        status: 0
      },
      total: 0
    }
  },
  created() {
    this.getHospitalData()
    this.getAllProvince()
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getHospitalData()
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getHospitalData()
    },
    getHospitalData() {
      hosp.getHospitalList(this.queryParams).then(res => {
        // 数据集合
        this.hospitalList = res.data.content
        // 总记录数
        this.total = res.data.totaElements
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 查询所有的省
     */
    getAllProvince() {
      hosp.getByDictCode('Province').then(res => {
        this.provinceList = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 根据省查询下面的市
     */
    getCityByProvince() {
      this.cityList = []
      this.districtList = []
      this.queryParams.cityCode = ''
      hosp.getChildrenData(this.queryParams.provinceCode).then(res => {
        this.cityList = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 修改医院状态
     */
    updateStatus(id, status) {
      this.hospital.id = id
      this.hospital.status = status
      hosp.updateHospitalStatus(this.hospital).then(res => {
        this.getHospitalData()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
