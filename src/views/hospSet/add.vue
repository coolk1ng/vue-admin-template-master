<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospSet from '../../api/hospSet'

export default {
  name: 'Add',
  data() {
    return {
      hospitalSet: {
        hosname: '',
        hoscode: '',
        apiUrl: '',
        contactsName: '',
        contactsPhone: '',
        saveOrUpdate: ''
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospSet(id)
    } else {
      this.hospitalSet = {}
    }
  },
  methods: {
    saveHospSet() {
      hospSet.saveHosSet(this.hospitalSet)
        .then(response => {
          if (response) {
            console.log('添加成功')
            this.$router.push({ path: '/hospSet/list' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    update() {
      hospSet.updateHosSet(this.hospitalSet)
        .then(response => {
          if (response) {
            console.log('添加成功')
            this.$router.push({ path: '/hospSet/list' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHospSet(id) {
      hospSet.getHospSetById(id)
        .then(response => {
          this.hospitalSet = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveOrUpdate() {
      if (this.hospitalSet.id) {
        this.update()
      } else {
        this.saveHospSet()
      }
    }
  }
}
</script>

<style scoped>

</style>
