<template>
  <el-table class="table" :data="tableData" :row-class-name="tableRowClassName" :header-row-style="headerStyle">
    <el-table-column prop="item" label="Item" width="180" align="center"/>
    <el-table-column prop="partnumber" label="PartNumber" width="180" align="center"/>
    <el-table-column prop="batchId" label="批次号" align="center"/>
    <el-table-column prop="uid" label="uid" align="center"/>
    <el-table-column prop="receivingnumber" label="数量" align="center"/>
    <el-table-column prop="receivingTime" label="收货时间" align="center"/>
    <el-table-column prop="state" label="状态" align="center"/>
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  item: string
  partnumber: string
  batchId: string
  uid: string
  receivingnumber: number
  receivingTime: string
  state: string
}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  }
  return 'success-row'
}

const headerStyle : Array

const tableData: User[] = [
  {
    item: '1',
    partnumber: 'Tom',
    batchId: 'No. 189, Grove St, Los Angeles',
    uid: '000001596045',
    receivingnumber: 100,
    receivingTime: '2016-05-03',
    state: '1'
  },
  {
    item: '2',
    partnumber: 'Tom',
    batchId: 'No. 189, Grove St, Los Angeles',
    uid: '000001611303',
    receivingnumber: 200,
    receivingTime: '2016-05-02',
    state: '3'
  },
  {
    item: '3',
    partnumber: 'Tom',
    batchId: 'No. 189, Grove St, Los Angeles',
    uid: '000001605630',
    receivingnumber: 300,
    receivingTime: '2016-05-04',
    state: '2'
  },
  {
    item: '4',
    partnumber: 'Tom',
    batchId: 'No. 189, Grove St, Los Angeles',
    uid: '000001605630',
    receivingnumber: 400,
    receivingTime: '2016-05-01',
    state: '0'
  },
]
</script>

<style>

.el-table .warning-row {
  --el-table-tr-bg-color: #DC143C;
}

.el-table .success-row {
  --el-table-tr-bg-color: #13192f;
}

.table {
  font-size: 15px;
  color: #FFFFFF;
}
</style>
