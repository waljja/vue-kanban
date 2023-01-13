<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 表格
import DataTable from './components/DataTable.vue'

// 鸿通 logo
import circleUrl from "./assets/鸿通logo.png";

// element-plus 国际化配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 公用获取时间函数
import currentTime from './currentTime';

const value1 = ref('')
const dateTime = ref('')

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '过去一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '过去三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 获取当前时间
const getCurrentTime = function () {
  dateTime.value = currentTime(new Date())
}

// 实时获取
onMounted(() => {
  setInterval(() => {
    getCurrentTime()
  }, 1000)
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-container class="container">
      <el-header class="header">
        <div class="dataScreen-header">
          <div class="header-lf">
            <el-avatar class="logo" :size="40" :src="circleUrl" />
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
                <span class="header-time">当前时间：{{ dateTime }}</span>
              </div>
              <div class="date-pick">
                <el-date-picker
                  class="date-picker"
                  v-model="value1"
                  type="daterange"
                  unlink-panels
                  range-separator="--->"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="default"
                  :shortcuts="shortcuts"
                />
                <el-button class="export" type="primary">导出</el-button>
              </div>
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <DataTable />
        <el-pagination class="page" layout="prev, pager, next" :total="1000" :pager-count="15"/>
      </el-main>
      <el-footer class="footer">HonorTone Product-KanBan By IT GuoZhao Ding 2023</el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url("./assets/background.png");
}

.header {
  margin-top: 20px;
  height: 120px;
  text-align: center;
  color: #FFFFFF;
}

.dataScreen-header {
  display: flex;
  width: 100%;
  height: 100%;
	font-family: YouSheBiaoTiHei;
}

.dataScreen-header .header-lf {
  width: 32.5%;
  height: 60px;
  background: url("./assets/dataScreen-header-left-bg.png") no-repeat;
  background-size: 100% 100%;
}

.dataScreen-header .header-lf .header-screening {
  top: 13px;
  margin: 0 auto;
  font-size: 20px;
  color: #05e8fe;
}

.dataScreen-header .header-right {
  position: relative;
  width: 32.5%;
  height: 120px;
}

.dataScreen-header .header-right .header-rg {
  height: 60px;
  background: url("./assets/dataScreen-header-left-bg.png") no-repeat;
  background-size: 100% 100%;
}

.header-rg-f {
  float: left;
  width: 25%;
  height: 100%;
  background: url("./assets/dataScreen-header-btn-bg-r.png");
  background-size: 100% 100%;
}

.right-font {
  top: 10px;
  font-size: 20px;
  color: #05e8fe;
}

.dataScreen-header .header-rg .header-time {
  top: 13px;
  margin: 0 auto;
  font-size: 20px;
  color: #05e8fe;
}

.date-pick {
  margin-top: 30px;
}

.export {
  float: right;
  right: 50px;
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
  height: 100%;
}

.dataScreen-header .header-ct .header-ct-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  font-size: 32px;
  line-height: 78px;
  color: #05e8fe;
  text-align: center;
  letter-spacing: 4px;
  background: url("./assets/dataScreen-header-center-bg.png") no-repeat;
  background-size: 100% 100%;
}

.header-logo {
  float: right;
  width: 25%;
  height: 100%;
  background: url("./assets/dataScreen-header-btn-bg-l.png");
  background-size: 100% 100%;
}

.logo {
  top: 8px;
  margin: 0 auto;
}

.title-font-size {
  font-size: 50px;
  top: 20px;
}

.main {
  margin: 0 auto;
  width: 100%;
}

.page {
  float: left;
  top: 20px;
  margin-left: 34.5%;
}

::v-deep .el-pagination .el-pager li:not(.disabled) {
  background-color: #FFFFFF;
}

.footer {
  margin: auto;
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
}
</style>
