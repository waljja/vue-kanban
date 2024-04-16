<template>
  <el-table
    class="table"
    size="small"
    header-row-class-name="headerStyle"
    cell-class-name="cell-class"
    @cell-mouse-enter="hoverRow"
    @cell-mouse-leave="leaveRow"
    @filter-change="filterChange"
  >
    <el-table-column
      prop="shipmentDate"
      label="出货日期"
      width="120"
      align="center"
      sortable
    />
    <el-table-column
      prop="loadingTime"
      label="装车时间"
      width="180"
      align="center"
      sortable
    />
    <el-table-column
      prop="shipmentCar"
      label="出货车型"
      width="130"
      align="center"
      sortable
    />
    <el-table-column
      prop="licenseNumber"
      label="车牌号"
      width="130"
      align="center"
      sortable
    />
    <el-table-column
      prop="shipmentNo"
      label="出货单号"
      align="center"
      column-key="shipmentNumber"
      :filters="shipNoFilters"
    >
      <template v-slot="scope">
        <el-popover
          title="物料号"
          placement="top-start"
          transition="el-fade-in-linear"
          :popper-style="popperStyle"
          :width="180"
          :visible="scope.row.visible"
        >
          <template #reference>
            <div>{{ scope.row.shipmentNo }}</div>
          </template>
          <template #default>
            <div v-for="item in scope.row.partNumberList" :key="item">{{ item }}</div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="clientCode"
      label="客户编号"
      width="165"
      align="center"
      column-key="clientCode"
      :filters="clientFilters"
    />
    <el-table-column
      prop="shipmentQty"
      label="出货数量"
      width="192"
      align="center"
      sortable
    />
    <el-table-column prop="boxQty" label="装箱数" width="132" align="center" />
    <el-table-column prop="palletQty" label="卡板数" align="center" />
    <el-table-column prop="toNo" label="TO" align="center" sortable />
    <el-table-column prop="toQty" label="TO数量" width="150" align="center" sortable />
    <el-table-column
      prop="state"
      label="状态"
      width="130"
      align="center"
      column-key="state"
      :filters="stateFilters"
    >
      <template #default="scope">
        <el-tag
          v-if="scope.row.state === '欠货'"
          :type="scope.row.state === '欠货' ? 'danger' : ''"
          effect="dark"
          :color="scope.row.state === '欠货' ? '#be2534' : '#ffffff'"
        >
          {{ scope.row.state }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export interface Shipment {
  [key: string]: any;
  shipmentDate: string;
  loadingTime: string;
  shipmentCar: string;
  licenseNumber: string;
  shipmentNo: string;
  clientCode: string;
  state: string;
  shipmentQty: number;
  boxQty: number;
  palletQty: number;
  partNumberList: [];
  toNo: string;
  toQty: number;
  visible: boolean;
}

// 父组件传递数组
const props = defineProps<{
  records: Shipment[];
  allData: Shipment[];
}>();

const emits = defineEmits<{
  (e: "findByParam", shipNumberArr: [], stateArr: [], clientCodeArr: []): void;
}>();

// 所有成品出货数据
const allData = computed(() => props.allData);

const popperStyle = {
  "font-family": "Oppo-Sans",
  "font-size": "15px",
};

// 鼠标移入行时显示 零部件号
const hoverRow = ({ row }: { row: Shipment; rowIndex: number }) => {
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
  // 所有出货单号抽出来装入集合
  allData.value.forEach((item) => {
    arr.push(item.shipmentNo);
  });
  // 去重
  return distinct(arr);
});

// 客户编号去重
const clientFilters = computed(() => {
  let arr: string[] = [];
  // 所有客户编号抽出来装入集合
  allData.value.forEach((item) => {
    arr.push(item.clientCode);
  });
  // 去重
  return distinct(arr);
});

// 状态去重
const stateFilters = computed(() => {
  let arr: string[] = [];
  // 所有状态抽出来装入集合
  allData.value.forEach((item) => {
    arr.push(item.state.toString());
  });
  // 去重
  return distinct(arr);
});

const filterChange = (filters: any) => {
  emits("findByParam", filters.shipmentNumber, filters.state, filters.clientCode);
};
</script>

<style>
@font-face {
  font-family: Oppo-Sans;
  src: url(../commons/fonts/OPlusSans3-Regular.ttf);
}

.el-table {
  --el-table-row-hover-bg-color: #3cb371;
}

.headerStyle {
  height: 50px;
  color: var(--color-table-header);
  font-size: 20px;
}

.el-table .cell {
  line-height: 30px;
}

.cell-class {
  background-color: var(--bg-color-cell);
}

.el-table th.el-table__cell {
  background-color: var(--bg-color-table-header);
}

.el-table .in-preparation-row {
  --el-table-tr-bg-color: #392e4a;
}

.el-table .in-stock-row {
  --el-table-tr-bg-color: var(--bg-color-in-stock-row);
}

.el-table .send-row {
  --el-table-tr-bg-color: #be2534;
}

.table {
  font-size: 15px;
  color: var(--color-table);
}

.el-popover__title {
  font-family: Oppo-Sans;
  font-size: 20px;
}
</style>
