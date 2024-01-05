<template>
  <el-table
    class="table"
    size="small"
    :header-row-style="headerStyle"
    :header-cell-style="headerCellStyle"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="item" label="序号" width="180" align="center" sortable />
    <el-table-column
      prop="partNumber"
      label="PartNumber"
      width="180"
      align="center"
      :filters="pnFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="wo"
      label="工单"
      align="center"
      :filters="woFilters"
      :filter-method="filterHandler"
    />
    <el-table-column prop="uid" label="UID" align="center" />
    <el-table-column prop="batch" label="批次号" align="center" />
    <el-table-column prop="quantity" label="数量" align="center" />
    <el-table-column prop="plant" label="工厂" align="center" />
    <el-table-column
      prop="state"
      label="状态"
      align="center"
      :filters="stateFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="storageLoc"
      label="仓位"
      align="center"
      :filter-method="filterHandler"
    />
    <el-table-column prop="recTime" label="收货时间" align="center" sortable />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { TableColumnCtx } from "element-plus";

export interface Product {
  [key: string]: any;
  item: number;
  partNumber: string;
  wo: string;
  uid: string;
  batch: string;
  quantity: number;
  plant: string;
  state: string;
  storageLoc: string;
  recTime: string;
}

// 父组件传递数组
const props = defineProps<{
  records: Product[];
}>();

const tableData = computed(() => props.records);

console.log("tableData:" + props.records);

const tableRowClassName = ({ row }: { row: Product; rowIndex: number }) => {
  if (row.state === "预留") {
    return "send-row";
  } else if (row.state === "在库") {
    return "in-stock-row";
  }
  return "in-stock-row";
};

const headerStyle = {
  height: "50px",
  color: "#ffffff",
  "font-size": "20px",
};

const headerCellStyle = {
  "background-color": "#13192f",
  padding: 0,
};

// filters 去重
const distinct = (array: string[]) => {
  let distinctArr: string[] = [];
  let newArr: object[] = [];
  // 去重
  distinctArr = Array.from(new Set(array));
  // 装入 filters 数组
  distinctArr.forEach((item) => {
    newArr.push({
      text: item,
      value: item,
    });
  });
  return newArr;
};

// partNumber 去重
const pnFilters = computed(() => {
  let pnArr: string[] = [];
  // 所有 partNumber 抽出来装入集合
  tableData.value.forEach((item) => {
    pnArr.push(item.partNumber);
  });
  // 去重
  return distinct(pnArr);
});

// 工单去重
const woFilters = computed(() => {
  let woArr: string[] = [];
  // 所有工单抽出来装入集合
  tableData.value.forEach((item) => {
    woArr.push(item.wo);
  });
  // 去重
  return distinct(woArr);
});

// 状态去重
const stateFilters = computed(() => {
  let stateArr: string[] = [];
  // 所有工单抽出来装入集合
  tableData.value.forEach((item) => {
    stateArr.push(item.state.toString());
  });
  // 去重
  return distinct(stateArr);
});

const filterHandler = (value: any, row: Product, column: TableColumnCtx<Product>) => {
  const property = column["property"];
  return row[property] === value;
};
</script>

<style>
.el-table {
  --el-table-row-hover-bg-color: #3cb371;
}

.el-table .warning-row {
  --el-table-tr-bg-color: #dc143c;
}

.el-table .in-stock-row {
  --el-table-tr-bg-color: #ffffff;
  /* #13192f */
}

.el-table .send-row {
  --el-table-tr-bg-color: #3cb371;
}

.table {
  font-size: 15px;
  color: #000000;
}
</style>
