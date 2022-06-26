<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;font-size: 10px;">选择：{{ baseMap.hosname }} / {{ depname }} / {{ workDate }}</div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"/>
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%">
          <el-tag
            v-for="(item,index) in scheduleRuleList"
            :key="item.id"
            :type="index === activeIndex ? '' : 'info'"
            style="height: 60px;margin-right: 5px;margin-right:15px;cursor:pointer;"
            @click="selectDate(item.workDate, index)">
            {{ item.workDate }} {{ item.dayOfWeek }}<br>
            {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>

          <el-pagination
            :current-page="schedule.pageNum"
            :page-size="schedule.pageSize"
            :total="total"
            background
            style="float: right"
            layout="total,prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table
            :data="scheduleList"
            border
            fit
            highlight-current-row>
            <el-table-column
              label="序号"
              width="60"
              align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="职称" width="150">
              <template slot-scope="scope">
                {{ scope.row.title }} | {{ scope.row.docname }}
              </template>
            </el-table-column>
            <el-table-column label="号源时间" width="80">
              <template slot-scope="scope">
                {{ scope.row.workTime === 0 ? "上午" : "下午" }}
              </template>
            </el-table-column>
            <el-table-column prop="reservedNumber" label="可预约数" width="80"/>
            <el-table-column prop="availableNumber" label="剩余预约数" width="100"/>
            <el-table-column prop="amount" label="挂号费(元)" width="90"/>
            <el-table-column prop="skill" label="擅长技能"/>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import hosp from '../../api/hosp'

export default {
  name: 'Schedule',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'depname'
      },
      schedule: {
        pageNum: 1,
        pageSize: 7,
        hoscode: '',
        depcode: '',
        workDate: ''
      },
      depname: '',
      total: 0,
      workDate: '',
      activeIndex: '',
      scheduleRuleList: [],
      scheduleList: [],
      baseMap: {},
      hoscode: ''
    }
  },
  created() {
    this.hoscode = this.$route.params.hoscode
    this.workDate = this.getCurDate()
    this.getList(this.hoscode)
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.schedule.pageSize = val
      this.getRules()
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.schedule.pageNum = val
      this.getRules()
    },
    getList() {
      hosp.getDepartmentList(this.hoscode).then(res => {
        this.data = res.data
      })
    },
    getRules() {
      this.schedule.hoscode = this.hoscode
      hosp.getScheduleRule(this.schedule).then(res => {
        this.scheduleRuleList = res.data.results
        this.total = res.data.total
        this.baseMap = res.data.baseMap
      }).catch(error => {
        console.log(error)
      })
    },
    handleNodeClick(data) {
      if (data.children != null) return
      this.schedule.depcode = data.depcode
      this.depname = data.depname
      this.getRules()
    },
    selectDate(wordDate, index) {
      this.workDate = wordDate
      this.index = index
      this.getSchedule()
    },
    getCurDate() {
      var datetime = new Date()
      var year = datetime.getFullYear()
      var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      return year + '-' + month + '-' + date
    },
    getSchedule() {
      this.schedule.workDate = this.workDate
      hosp.getScheduleDetail(this.schedule).then(res => {
        this.scheduleList = res.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #409EFF !important;
  color: white;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}
</style>
