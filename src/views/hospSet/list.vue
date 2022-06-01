<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryParams.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="batchRemoveByIdList()">批量删除</el-button>
    </el-form>
    <!-- banner列表 -->
    <el-table
      :data="hospitalSetList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column type="index" width="50"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.id)"/>
          <el-button v-if="scope.row.status===1" type="primary" size="mini" icon="el-icon-close" @click="lockAndUnLock(scope.row)"/>
          <el-button v-if="scope.row.status===0" type="primary" size="mini" icon="el-icon-check" @click="lockAndUnLock(scope.row)"/>
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
          </router-link>
        </template>
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
import hospSet from '../../api/hospSet'

export default {
  name: 'List',
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hosname: '',
        hoscode: '',
        id: 0,
        status: 0
      },
      hospitalSetList: [],
      total: 0,
      idList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    handleSelectionChange(val) {
      val.forEach(item => {
        this.idList.push(item.id)
      })
    },
    getList() {
      hospSet.getHospitalSetList(this.queryParams)
        .then(response => {
          this.hospitalSetList = response.data.list
          this.total = response.data.total
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeById(id) {
      this.queryParams.id = id
      hospSet.removeHospSetById(this.queryParams)
        .then(response => {
          if (response) {
            console.log('删除医院设置成功')
            this.getList()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    batchRemoveByIdList() {
      hospSet.batchRemoveHospSetByIdList(this.idList)
        .then(response => {
          if (response) {
            console.log('批量删除成功')
            this.getList()
          }
        })
    },
    lockAndUnLock(param) {
      this.queryParams.id = param.id
      this.queryParams.status = param.status === 1 ? 0 : 1
      hospSet.lockAndUnLockHosSetStatus(this.queryParams)
        .then(response => {
          if (response) {
            this.getList()
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
