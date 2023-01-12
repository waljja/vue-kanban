<template>
  <el-table class="table" 
    size="small"
    :data="data.tableData" 
    :header-row-style="headerStyle"
    :header-cell-style="headerCellStyle"
    :row-class-name="tableRowClassName">
    <el-table-column prop="item" label="Item" width="180" align="center" sortable/>
    <el-table-column 
      prop="partnumber" 
      label="PartNumber" 
      width="180" 
      align="center" 
      :filters="pnFilters"
      :filter-method="filterPn"/>
    <el-table-column prop="batchId" label="批次号" align="center"/>
    <el-table-column prop="uid" label="UID" align="center"/>
    <el-table-column prop="receivingnumber" label="数量" align="center"/>
    <el-table-column prop="receivingTime" label="收货时间" align="center" sortable/>
    <el-table-column prop="state" label="状态" align="center"/>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import type { TableColumnCtx } from "element-plus";

interface User {
  [key: string]: any
  item: number
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

const headerStyle = ({
  height: '50px',
  color: '#000000',
  'font-size': '20px'
})

const headerCellStyle = ({
  padding: 0
})

const data = reactive({
  tableData: [
    {
      item: 1,
      partnumber: '620-PURP004-00R1',
      batchId: '000001',
      uid: '000001596045',
      receivingnumber: 100,
      receivingTime: '2016-05-03',
      state: '1'
    },
    {
      item: 2,
      partnumber: '620-PURP004-00R1',
      batchId: '000002',
      uid: '000001611303',
      receivingnumber: 200,
      receivingTime: '2016-05-02',
      state: '3'
    },
    {
      item: 3,
      partnumber: '620-PURP004-00R1',
      batchId: '000003',
      uid: '000001605630',
      receivingnumber: 300,
      receivingTime: '2016-05-04',
      state: '2'
    },
    {
      item: 4,
      partnumber: '610-LT10002-00R1',
      batchId: '000004',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 5,
      partnumber: '610-LT10002-00R1',
      batchId: '000005',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 6,
      partnumber: '610-LT10002-00R1',
      batchId: '000394',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 7,
      partnumber: '610-TAGA001-00R1',
      batchId: '00009',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 8,
      partnumber: '620-PURP004-00R1',
      batchId: '000393',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 9,
      partnumber: '620-PURP004-00R1',
      batchId: '000028',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 10,
      partnumber: '610-TAGA001-00R1',
      batchId: '000175',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 11,
      partnumber: '620-PURP004-00R1',
      batchId: '000174',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 12,
      partnumber: '620-LUHE001-00R3',
      batchId: '15',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 13,
      partnumber: '620-LUHE001-00R3',
      batchId: '00001',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 14,
      partnumber: '620-PURP004-00R1',
      batchId: '00007',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 15,
      partnumber: '620-PURP004-00R1',
      batchId: '000030',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 16,
      partnumber: '620-PURP004-00R1',
      batchId: '000031',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
    {
      item: 17,
      partnumber: '620-PURP004-00R1',
      batchId: '000169',
      uid: '000001605630',
      receivingnumber: 400,
      receivingTime: '2016-05-01',
      state: '0'
    },
  ]
})

// partNumber 去重
const pnFilters = computed(() => {
  let pnArr: string[] = []
  let pnDistinctArr: string[] = []
  let pnNewArr: object[] = []
  // 所有 partNumber 抽出来装入集合
  data.tableData.forEach(item => {
    pnArr.push(item.partnumber)
  })
  // 去重
  pnDistinctArr = Array.from(new Set(pnArr))
  // 装入 filters 数组
  pnDistinctArr.forEach(item => {
    pnNewArr.push({
      text: item,
      value: item
    })
  })
  return pnNewArr
})

const filterPn = (
  value: any,
  row: User,
  column: TableColumnCtx<User>
) => {
  const property = column['property']
  return row[property] === value
}
</script>

<style>
.el-table {
  --el-table-row-hover-bg-color: #3CB371;
}

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
