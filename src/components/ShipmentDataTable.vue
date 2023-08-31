<template>
  <el-table
    class="table"
    size="small"
    :header-row-style="headerStyle"
    :header-cell-style="headerCellStyle"
    :row-class-name="tableRowClassName"
    @cell-mouse-enter="hoverRow"
    @cell-mouse-leave="leaveRow"
  >
    <el-table-column
      prop="shipmentDate"
      label="出货日期"
      width="180"
      align="center"
      sortable
    >
      <template v-slot="scope">
        <el-popover
          title="零部件号"
          placement="top-start"
          transition="transition"
          :width="200"
          :visible="scope.row.visible"
          :rowId="scope.row.rowIndex"
          :content="scope.row.partNumberList"
        >
          <template #reference>
            <div>{{ scope.row.shipmentDate }}</div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="shipmentNo"
      label="出货单号"
      align="center"
      :filters="shipNoFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="clientCode"
      label="客户编号"
      align="center"
      :filters="clientFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="po"
      label="订单号"
      align="center"
      :filters="poFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="state"
      label="状态"
      align="center"
      :filters="stateFilters"
      :filter-method="filterHandler"
    />
    <el-table-column prop="shipmentQty" label="出货数量" align="center" sortable />
    <el-table-column prop="boxQty" label="装箱数" align="center" />
    <el-table-column prop="palletQty" label="卡板数" align="center" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { TableColumnCtx } from "element-plus";

export interface Shipment {
  [key: string]: any;
  shipmentDate: string;
  shipmentNo: string;
  clientCode: string;
  po: string;
  state: string;
  shipmentQty: number;
  boxQty: number;
  palletQty: number;
  partNumberList: [];
  visible: boolean;
}

// 父组件传递数组
const props = defineProps<{
  records: Shipment[];
}>();
// 表格数据
const tableData = computed(() => props.records);

console.log("tableData:" + props.records);

const tableRowClassName = ({ row }: { row: Shipment; rowIndex: number }) => {
  if (row.state === "待拣货") {
    return "in-stock-row";
  } else if (row.state === "待装车") {
    return "send-row";
  }
  return "yellow-row";
};

const headerStyle = {
  height: "50px",
  color: "#000000",
  "font-size": "20px",
};

const headerCellStyle = {
  padding: 0,
};

// 鼠标移入行时显示 零部件号
const hoverRow = ({ row }: { row: Shipment; rowIndex: number }) => {
  console.log("66");
  console.log(row);
  row.visible = true;
};

// 鼠标移出行时弹窗消失
const leaveRow = ({ row }: { row: Shipment; rowIndex: number }) => {
  row.visible = false;
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

// 出货单号去重
const shipNoFilters = computed(() => {
  let arr: string[] = [];
  // 所有 出货单号 抽出来装入集合
  tableData.value.forEach((item) => {
    arr.push(item.shipmentNo);
  });
  // 去重
  return distinct(arr);
});

// 客户编号去重
const clientFilters = computed(() => {
  let arr: string[] = [];
  // 所有 客户编号 抽出来装入集合
  tableData.value.forEach((item) => {
    arr.push(item.clientCode);
  });
  // 去重
  return distinct(arr);
});

// 订单号去重
const poFilters = computed(() => {
  let arr: string[] = [];
  // 所有 订单号 抽出来装入集合
  tableData.value.forEach((item) => {
    arr.push(item.po);
  });
  // 去重
  return distinct(arr);
});

// 状态去重
const stateFilters = computed(() => {
  let arr: string[] = [];
  // 所有 状态 抽出来装入集合
  tableData.value.forEach((item) => {
    arr.push(item.state);
  });
  // 去重
  return distinct(arr);
});

const filterHandler = (value: any, row: Shipment, column: TableColumnCtx<Shipment>) => {
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

.el-table .yellow-row {
  --el-table-tr-bg-color: #fac858;
}

.el-table .in-stock-row {
  --el-table-tr-bg-color: #13192f;
}

.el-table .send-row {
  --el-table-tr-bg-color: #3cb371;
}

.table {
  font-size: 15px;
  color: #ffffff;
}
</style>
