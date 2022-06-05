<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 导出</el-button>
        <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
      </div>
    </div>
    <el-table
      :data="dictList"
      :load="getChildrenList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
      row-key="id"
      border
      lazy>
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码" width="220">
        <template slot-scope="scope">
          {{ scope.row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--导入弹框-->
    <el-dialog :visible.sync="dialogImportVisible" title="导入" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8082/admin/cmn/dict/importDictData'"
            class="upload-demo">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dict from '../../api/dict'

export default {
  name: 'List',
  data() {
    return {
      id: '',
      dictList: [],
      dialogImportVisible: false
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    getList(id) {
      dict.getDictList(id)
        .then(response => {
          // console.log(response)
          this.dictList = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChildrenList(tree, treeNode, resolve) {
      dict.getDictList(tree.id).then(response => {
        resolve(response.data)
      })
    },
    exportData() {
      window.location.href = 'http://localhost:8082/admin/cmn/dict/exportDictData'
    },
    importData() {
      this.dialogImportVisible = true
    },
    // 上传成功后调用
    onUploadSuccess() {
      // 关闭弹框
      this.dialogImportVisible = false
      // 刷新页面
      this.getList(1)
    }
  }
}
</script>

<style scoped>

</style>
