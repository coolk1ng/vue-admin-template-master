<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="姓名/手机"/>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="searchObj.createTimeBegin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      至
      <el-form-item>
        <el-date-picker
          v-model="searchObj.createTimeEnd"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (searchObj.pageSize - 1) * searchObj.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column label="状态" prop="param.statusString"/>
      <el-table-column label="认证状态" prop="param.authStatusString"/>
      <el-table-column prop="createTime" label="创建时间"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/userInfo/show/'+scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>
          <el-button v-if="scope.row.status === 1" type="primary" size="mini" @click="lock(scope.row.id, 0)">锁定</el-button>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="lock(scope.row.id, 1)">取消锁定</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="searchObj.pageNum"
      :page-size="searchObj.pageSize"
      :total="total"
      background
      style="float: right"
      layout="total,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>
import userInfoApi from '@/api/userInfo'
export default {
  // 定义数据
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      searchObj: {
        pageNum: 1,
        pageSize: 10,
        createTimeBegin: '',
        createTimeEnd: '',
        keyword: ''
      },
      userInfo: {
        userId: '',
        status: ''
      }
    }
  },
  // 当页面加载时获取数据
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.searchObj.pageSize = val
      this.fetchData()
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.searchObj.pageNum = val
      this.fetchData()
    },
    // 调用api层获取数据库中的数据
    fetchData() {
      userInfoApi.getUserList(this.searchObj).then(
        response => {
          this.list = response.data.records
          this.total = response.data.total
        }
      ).catch(error => {
        console.log(error)
      })
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },
    lock(id, status) {
      this.userInfo.userId = id
      this.userInfo.status = status
      userInfoApi.lockAndUnLock(this.userInfo).then(res => {
        this.fetchData()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
