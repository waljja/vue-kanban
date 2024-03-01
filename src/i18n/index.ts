import { createI18n } from "vue-i18n";

const messages = {
  zh: {
    msg: {
      kanbanProductStockPending: "成品入库看板",
      kanbanProductStockPendingManagement: "成品入库管理看板",
      storageLocation: "仓位",
      recTime: "收货时间",
      ht: "鸿通",
      now: "当前时间",
      kanbanProductShipment: "成品出货计划看板",
      shipmentDate: "出货日期",
      shipmentCar: "出货车型",
      shipmentNumber: "出货单号",
      po: "客户编号",
      plateNumber: "车牌号",
      materialNumber: "物料号",
      filter: "筛选",
      startDate: "开始日期",
      endDate: "结束日期",
      cartonQty: "装箱数",	
      export: "导出",	
      shipmentQty: "出货数量",
      palletQty: "卡板数",
      state: "状态",
    },
  },
  vi: {
    msg: {
      kanbanProductStockPending: "bảng hiển thị nhập kho thành phẩm",
      kanbanProductStockPendingManagement: "bảng hiển thị quản lý nhập kho thành phẩm",
      storageLocation: "vị trí kho",
      recTime: "thời gian nhận hàng",
      ht: "Hongtong",
      now: "thời gian hiện tại",
      kanbanProductShipment: "bảng hiển thị kế hoạch xuất hàng",
      shipmentDate: "ngày xuất hàng",
      shipmentCar: "kiểu xe xuất hàng",
      shipmentNumber: "đơn xuất hàng",
      po: "mã khách hàng",
      plateNumber: "biển số xe",
      materialNumber: "Mã Số vật liệu",
      filter: "lọc",
      startDate: "ngày bắt đầu",
      endDate: "ngày kết thúc",
      cartonQty: "số xếp thùng",
      export: "xuất ra",
      shipmentQty: "Số lượng lô hàng",	
      palletQty: "số palet",
      state: "trạng thái",
    },
  },
};

const i18n = createI18n({
  // 使用组合式API，需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: "vi",
  messages,
});

export default i18n;
