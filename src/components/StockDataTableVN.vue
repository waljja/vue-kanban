<template>
  <el-table
    class="table"
    size="small"
    header-row-class-name="headerStyle"
    row-class-name="row-class"
    cell-class-name="cell-class"
    @filter-change="filterChange"
  >
    <el-table-column
      prop="partNumber"
      label="PartNumber"
      align="center"
      column-key="pn"
      :filters="pnFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="wo"
      label="công đơn"
      align="center"
      column-key="wo"
      :filters="woFilters"
      :filter-method="filterHandler"
    />
    <el-table-column prop="uid" label="UID" align="center" />
    <el-table-column prop="batch" label="số lô" align="center" />
    <el-table-column prop="quantity" label="số lượng" align="center" />
    <el-table-column prop="plant" label="xưởng" width="80" align="center" />
    <el-table-column
      prop="state"
      label="trạng thái"
      align="center"
      column-key="state"
      :filters="stateFilters"
      :filter-method="filterHandler"
      :formatter="formatter"
    />
    <el-table-column
      prop="storageLoc"
      label="vị trí kho"
      align="center"
      :filter-method="filterHandler"
    />
    <el-table-column prop="recTime" label="thời gian nhận hàng" align="center" sortable />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { TableColumnCtx } from "element-plus";

export interface Product {
  [key: string]: any;
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
  allData: Product[];
}>();

const emits = defineEmits<{
  (e: 'findByParam', pnArr: [], stateArr: [], woArr: []): void
}>();

const allData = computed(() => props.allData);

console.log("records: " + props.records);

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

// 物料号筛选
const pnFilters = computed(() => {
  let pnArr: string[] = [];
  // 所有 partNumber 抽出来装入集合
  allData.value.forEach((item) => {
    pnArr.push(item.partNumber);
  });
  // 去重
  return distinct(pnArr);
});

// 工单筛选
const woFilters = computed(() => {
  let woArr: string[] = [];
  // 所有工单抽出来装入集合
  allData.value.forEach((item) => {
    woArr.push(item.wo);
  });
  // 去重
  return distinct(woArr);
});

// 状态筛选
const stateFilters = computed(() => {
  let stateArr: string[] = [];
  // 所有状态抽出来装入集合
  allData.value.forEach((item) => {
    stateArr.push(item.state.toString());
  });
  // 去重
  return distinct(stateArr);
});

const filterHandler = (value: any, row: Product, column: TableColumnCtx<Product>) => {
  // emits('findByParam', value);
};

const filterChange = (filters: any) => {
  emits('findByParam', filters.pn, filters.state, filters.wo);
};

/**
 * 状态转为越南语显示
 * @param row 表格行数据
 */
 const formatter = (row: Product) => {
  if (row.state == "待上架") {
    return "Chờ lên giá";
  } else if (row.state === "转运中（未收货）") {
    return "Đang di chuyển ( chưa nhập kho)";
  } else if (row.state === "转运中（已上架）") {
    return "Đang di chuyển ( đã lên giá )";
  } else if (row.state === "待装车") {
    return "Chờ xếp xe";
  } else if (row.state === "待拣货") {
    return "Chờ nhặt hàng";
  } else if (row.state === "欠货") {
    return "Thiếu hàng";
  } else if (row.state === "待绑定出货区") {
    return "Chờ Ràng buộc khu vực xuất hàng";
  } else if (row.state === "备货中") {
    return "Chuẩn bị";
  }
};
</script>

<style>
.el-table {
  --el-table-row-hover-bg-color: #3cb371;
}

.headerStyle {
  color: var(--color-table-header);
}

.header-class {
  line-height: 50px;
}

.row-class {
  line-height: 10px;
}

.cell-class {
  background-color: var(--bg-color-cell);
}

.el-table th.el-table__cell {
  background-color: var(--bg-color-table-header);
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
  color: #000000;
}
</style>
