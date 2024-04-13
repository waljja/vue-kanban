<template>
  <el-config-provider :locale="zhCn">
    <el-container class="container">
      <el-header class="header">
        <div class="dataScreen-header">
          <div class="header-lf">
            <el-avatar class="logo" :size="43" :src="circleUrl" />
            <div class="header-logo">
              <span class="header-screening">鸿通</span>
            </div>
            <div class="date-pick">
              <el-switch size="large" v-model="mode" @change="changeMode">
                <template #active-action>
                  <span
                    class="custom-inactive-action icon iconfont icon-yejianmoshi bg-color-icon-dark"
                  />
                </template>
                <template #inactive-action>
                  <span
                    class="custom-inactive-action icon iconfont icon-baitianmoshimingliangmoshi bg-color-icon-light"
                  />
                </template>
              </el-switch>
              <el-dropdown class="el-dropdown-link" @command="handleCommand">
                <span>
                  <i class="icon iconfont icon-yuyan2 font-icon-dark" />
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="zh">
                      <span class="font-dropdown-menu">中文</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="vi">
                      <span class="font-dropdown-menu">Tiếng Việt</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="header-ct">
            <div class="header-ct-title">
              <span class="title-font-size">成品入库管理看板</span>
            </div>
          </div>
          <div class="header-right">
            <div class="header-rg">
              <div class="header-rg-f">
                <span class="right-font">MES</span>
              </div>
              <span class="header-time">当前时间: {{ dateTime }}</span>
            </div>
            <div class="date-pick">
              <el-date-picker
                class="date-picker"
                v-model="dateArr"
                value-format="YYYY-MM-DD"
                type="daterange"
                unlink-panels
                range-separator="--->"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="default"
                :shortcuts="shortcuts"
              />
              <el-button class="filter" type="success" @click="filter">筛选</el-button>
              <el-button class="export" type="primary" @click="exportExcel"
                >导出</el-button
              >
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <StockDataTable
          :data="records"
          :records="records"
          :allData="allData"
          @findByParam="findByParam"
        />
        <el-pagination
          v-model:current-page="currentPage"
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          :pager-count="21"
          @current-change="handlePageChange()"
        />
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// element-plus 国际化
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 公用获取时间函数
import currentTime from "../../commons/ts/currentTime";
import axios from "../../axios/axios";
import router from "@/router";
// 表格
import StockDataTable from "../../components/StockDataTableCN.vue";
// 鸿通 logo
import circleUrl from "../../assets/鸿通logo.png";

// 白天/夜间模式
const mode = ref(false);
// 日期选择器 开始、结束 日期
const dateArr = ref("");
// 实时获取时间
const dateTime = ref("");
// 当前页码
const currentPage = ref();
// 表格分页数据
var records = ref([]);
// 返回总记录数
var total = ref(20);
// 全部数据（成品待入库）
var allData = ref([]);
const shortcuts = [
  {
    text: "上周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "过去一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "过去三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

/**
 * 切换语言
 * @param command 语言
 */
const handleCommand = (command: string | object) => {
  if (command == "vi") {
    router.push("/stock-kanban-vn");
  } else {
    router.push("/stock-kanban-cn");
  }
};

// 获取当前时间
const getCurrentTime = () => {
  dateTime.value = currentTime(new Date());
};

/**
 * 切换白天/夜间模式
 */
const changeMode = () => {
  if (mode.value === true) {
    document.body.setAttribute("theme", "dark");
  } else {
    document.body.setAttribute("theme", "light");
  }
};

// 初始化表格数据
const initTable = () => {
  axios
    .get("/kanban/product-storage/get-data", {
      params: {
        current: 1,
      },
    })
    .then((res) => {
      records.value = res.data.data.records;
      total.value = res.data.data.total;
      console.log(records.value);
    })
    .catch((error) => {
      console.log("初始化（Stock）" + error);
    });
};
initTable();

/**
 * 获取所有成品待入库数据
 */
const getAllData = () => {
  axios
    .get("/kanban/product-storage/get-all")
    .then((res) => {
      allData.value = res.data.data;
    })
    .catch((error) => {
      console.log("获取数据接口错误 - getAllData(): " + error);
    });
};
getAllData();

/**
 * 根据条件获取成品库存数据
 * @param page 页码
 * @param pns 物料号
 * @param states 状态
 * @param wos 工单
 */
const getTableDataByParams = (page: number, pns: string, states: string, wos: string) => {
  axios
    .get("/kanban/product-storage/get-data", {
      params: {
        current: page,
        startDate: dateArr.value[0],
        endDate: dateArr.value[1],
        pns: pns === "" || pns == null ? "" : pns.slice(0, -1),
        states: states === "" || states == null ? "" : states.slice(0, -1),
        wos: wos === "" || wos == null ? "" : wos.slice(0, -1),
      },
    })
    .then((res) => {
      console.log(res.data.data.records);
      records.value = res.data.data.records;
      total.value = res.data.data.total;
    })
    .catch((error) => {
      console.log(
        "获取数据接口错误 - getTableDataByParams(" +
          page +
          ", " +
          pns +
          ", " +
          states +
          ", " +
          wos +
          "): " +
          error
      );
    });
};

// 根据日期筛选工单信息
const filter = () => {
  getTableDataByParams(1, "", "", "");
};

// 导出 Excel 报表
const exportExcel = async () => {
  return axios
    .get("/kanban/stock-report/download", {
      params: {
        current: 1,
        startDate: dateArr.value[0],
        endDate: dateArr.value[1],
      },
      responseType: "blob",
    })
    .then((res) => {
      let blob = new Blob([res.data], {
        // 接收数据类型
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      // 触发下载链接
      let link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "成品入库报表.xlsx";
      link.click();
      // 移除元素
      document.body.removeChild(link);
      // 释放 URL 对象
      window.URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.log("axios errors: " + error);
    });
};

/**
 * 根据条件筛选数据
 * @param pnArr 物料号
 * @param stateArr 状态
 * @param woArr 工单
 */
const findByParam = (pnArr: [], stateArr: [], woArr: []) => {
  let pns = "";
  if (pnArr != null && pnArr != undefined && pnArr.length != 0) {
    pnArr.forEach((element) => {
      pns += element + ",";
    });
  }
  let states = "";
  if (stateArr != null && stateArr != undefined && stateArr.length != 0) {
    stateArr.forEach((element) => {
      states += element + ",";
    });
  }
  let wos = "";
  if (woArr != null && woArr != undefined && woArr.length != 0) {
    woArr.forEach((element) => {
      wos += element + ",";
    });
  }
  var page;
  if (currentPage.value !== undefined) {
    page = currentPage.value;
  } else {
    page = "1";
  }
  getTableDataByParams(page, pns, states, wos);
};

/**
 * 切换页面
 */
const handlePageChange = () => {
  console.log("切换");
  var page;
  if (currentPage.value !== undefined) {
    page = currentPage.value;
  } else {
    page = "1";
  }
  getTableDataByParams(page, "", "", "");
};

// 实时获取
onMounted(() => {
  setInterval(() => {
    getCurrentTime();
  }, 1000);
  // 1分钟刷新一次看板数据
  setInterval(async () => {
    console.log("refresh data: " + new Date().toLocaleTimeString());
    handlePageChange();
    getAllData();
  }, 60000);
});
</script>

<style scoped>
@import "../../assets/iconfont/iconfont.css";
@font-face {
  font-family: YouSheBiaoTiHei2;
  src: url("../../commons/fonts/YouSheBiaoTiHei-2.ttf");
}
@font-face {
  font-family: Oppo-Sans;
  src: url("../../commons/fonts/OPlusSans3-Regular.ttf");
}

.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: var(--bg-color-container);
  background-image: var(--bg-img-container);
  text-align: center;
}

.header {
  margin-top: 20px;
  height: 15%;
  text-align: center;
  color: var(--color-header);
}

.dataScreen-header {
  display: flex;
  width: 100%;
  height: 100%;
  font-family: YouSheBiaoTiHei2;
}

.dataScreen-header .header-lf {
  width: 32.5%;
  height: 40%;
  background: url("../../assets/dataScreen-header-left-bg.png") no-repeat;
  background-size: 100% 100%;
}

.dataScreen-header .header-lf .header-screening {
  top: 15%;
  margin: 0 auto;
  font-size: 1.5rem;
  color: var(--color-header);
}

.el-switch {
  --el-switch-on-color: #141414;
}

.bg-color-icon-dark {
  font-size: 20px;
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

.bg-color-icon-light {
  color: #606266;
}

.el-dropdown {
  --el-dropdown-menuItem-hover-color: #cfd3dc;
}

.el-dropdown-link {
  left: 20%;
  top: 7px;
}

.font-icon-dark {
  font-size: 1.5rem;
  border: #cfd3dc;
}

.font-dropdown-menu {
  font-size: 1.2rem;
  font-family: Oppo-Sans;
}

.dataScreen-header .header-right {
  position: relative;
  width: 32.5%;
  height: 80%;
}

.dataScreen-header .header-right .header-rg {
  height: 50%;
  background: url("../../assets/dataScreen-header-left-bg.png") no-repeat;
  background-size: 100% 100%;
}

.header-rg-f {
  float: left;
  width: 25%;
  height: 100%;
  background: url("../../assets/dataScreen-header-btn-bg-r.png");
  background-size: 100% 100%;
}

.right-font {
  top: 15%;
  font-size: 1.5rem;
  color: var(--color-header);
}

.dataScreen-header .header-rg .header-time {
  top: 15%;
  margin: 0 auto;
  font-size: 1.5rem;
  color: var(--color-header);
}

.date-pick {
  margin-top: 30px;
}

.filter {
  float: right;
  margin: 0 auto;
  justify-content: center;
}

.export {
  float: left;
  right: 0;
  margin: 0 auto;
}

.dataScreen-header .header-dp {
  margin-top: 50px;
}

.dataScreen-header .header-ct {
  margin: 0 auto;
  position: relative;
  flex: 1;
  width: 35%;
  height: 80%;
}

.dataScreen-header .header-ct .header-ct-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 32px;
  line-height: 78px;
  color: var(--color-header);
  text-align: center;
  letter-spacing: 4px;
  background: url("../../assets/dataScreen-header-center-bg.png") no-repeat;
  background-size: 100% 100%;
}

.header-logo {
  float: right;
  width: 25%;
  height: 100%;
  background: url("../../assets/dataScreen-header-btn-bg-l.png");
  background-size: 100% 100%;
}

.logo {
  top: 8px;
  margin: 0 auto;
}

.title-font-size {
  font-size: 3.8rem;
  top: 15px;
}

.main {
  top: 0;
  margin: 0 auto;
  padding-top: 0;
  width: 100%;
}

.el-pagination {
  top: 5%;
  justify-content: center;
}

:deep(.el-pagination .el-pager li:not(.disabled)) {
  background-color: var(--bg-color-pager-li-not-disabled);
}

:deep(.el-pager li) {
  color: var(--color-pager-li);
}

:deep(.el-pager li.is-active) {
  color: var(--color-pager-li-is-active);
}

:deep(.el-pagination button) {
  background-color: var(--bg-color-pagination-button);
  color: var(--color-pagination-button);
}
</style>
