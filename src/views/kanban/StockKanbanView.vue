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
        <StockDataTable :data="records" :records="records" />
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
// 表格
import StockDataTable from "../../components/StockDataTable.vue";
// 鸿通 logo
import circleUrl from "../../assets/鸿通logo.png";

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

// 获取当前时间
const getCurrentTime = () => {
  dateTime.value = currentTime(new Date());
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
      console.log(error);
    });
};
initTable();

// 根据日期筛选工单信息
const filter = () => {
  axios
    .get("/kanban/product-storage/get-data", {
      params: {
        current: 1,
        startDate: dateArr.value[0],
        endDate: dateArr.value[1],
      },
    })
    .then((res) => {
      console.log(res.data.data.records);
      records.value = res.data.data.records;
      total.value = res.data.data.total;
    })
    .catch((error) => {
      console.log("获取数据接口错误：" + error);
    });
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

// 切换页面
const handlePageChange = () => {
  axios
    .get("/kanban/product-storage/get-data", {
      params: {
        current: currentPage.value,
        startDate: dateArr.value[0],
        endDate: dateArr.value[1],
      },
    })
    .then((res) => {
      console.log(res.data.data.records);
      records.value = res.data.data.records;
    })
    .catch((error) => {
      console.log("获取数据接口错误：" + error);
    });
};

// 实时获取
onMounted(() => {
  setInterval(() => {
    getCurrentTime();
  }, 1000);
  // 1分钟刷新一次看板数据
  setInterval(async () => {
    console.log("refresh data: " + new Date().toLocaleTimeString());
    // 保留当前页码
    handlePageChange();
  }, 60000);
});
</script>

<style scoped>
@font-face {
  font-family: YouSheBiaoTiHei2;
  src: url("../../commons/fonts/YouSheBiaoTiHei-2.ttf");
}

.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url("../../assets/background.png");
  text-align: center;
}

.header {
  margin-top: 20px;
  height: 15%;
  text-align: center;
  color: #ffffff;
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
  color: #05e8fe;
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
  color: #05e8fe;
}

.dataScreen-header .header-rg .header-time {
  top: 15%;
  margin: 0 auto;
  font-size: 1.5rem;
  color: #05e8fe;
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
  color: #05e8fe;
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
  background-color: #13192f;
}

:deep(.el-pager li) {
  color: #ffffff;
}

:deep(.el-pager li.is-active) {
  color: #05e8fe;
}

:deep(.el-pagination button) {
  background-color: #13192f;
  color: #ffffff;
}
</style>