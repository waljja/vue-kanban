<template>
  <el-table
    class="table"
    size="small"
    header-row-class-name="headerStyle"
    cell-class-name="cell-class"
    @cell-mouse-enter="hoverRow"
    @cell-mouse-leave="leaveRow"
  >
    <el-table-column
      prop="shipmentDate"
      label="ngày xuất hàng"
      width="110"
      align="center"
      sortable
    />
    <el-table-column
      prop="loadingTime"
      label="Thời gian đến dự kiến của xe"
      width="180"
      align="center"
      sortable
    />
    <el-table-column
      prop="shipmentCar"
      label="kiểu xe xuất hàng"
      width="130"
      align="center"
      sortable
    />
    <el-table-column
      prop="licenseNumber"
      label="biển số xe"
      width="130"
      align="center"
      sortable
    />
    <el-table-column
      prop="shipmentNo"
      label="đơn xuất hàng"
      align="center"
      :filters="shipNoFilters"
      :filter-method="filterHandler"
    >
      <template v-slot="scope">
        <el-popover
          title="Mã Số vật liệu"
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
      label="mã khách hàng"
      width="165"
      align="center"
      :filters="clientFilters"
      :filter-method="filterHandler"
    />
    <el-table-column
      prop="shipmentQty"
      label="Số lượng lô hàng"
      width="192"
      align="center"
      sortable
    />
    <el-table-column prop="boxQty" label="số xếp thùng" width="132" align="center" />
    <el-table-column prop="palletQty" label="số palet" align="center" />
    <el-table-column prop="toNo" label="TO" align="center" sortable />
    <el-table-column
      prop="toQty"
      label="TO Số lượng"
      width="150"
      align="center"
      sortable
    />
    <el-table-column
      prop="state"
      label="trạng thái"
      width="130"
      align="center"
      :filters="stateFilters"
      :filter-method="filterHandler"
      :formatter="formatter"
    >
      <template #default="scope">
        <el-tag
          v-if="scope.row.state === '欠货'"
          :type="scope.row.state === '欠货' ? 'danger' : ''"
          effect="dark"
          :color="scope.row.state === '欠货' ? '#be2534' : '#ffffff'"
        >
          Thiếu hàng
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { TableColumnCtx } from "element-plus";

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
}>();
// 表格数据
const tableData = computed(() => props.records);
const popperStyle = {
  "font-family": "Oppo-Sans",
  "font-size": "15px",
};

console.log("tableData:" + props.records);

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

/**
 * 状态转为越南语显示
 * @param row 表格行数据
 */
const formatter = (row: Shipment) => {
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
