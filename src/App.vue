<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 公用获取时间函数
import currentTime from './currentTime';
import DataTable from './components/DataTable.vue'

const dateTime = ref('')

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
  <el-container class="container">
    <el-header class="header">
      <div class="dataScreen-header">
				<div class="header-lf">
					<span class="header-screening">鸿通 MES</span>
				</div>
				<div class="header-ct">
					<div class="header-ct-title">
						<span class="title-font-size">成品入库管理看板</span>
					</div>
				</div>
				<div class="header-rg">
					<span class="header-time">当前时间：{{ dateTime }}</span>
				</div>
			</div>
    </el-header>
    <el-main class="main"><DataTable/></el-main>
    <el-footer class="footer">HonorTone Product-KanBan By IT GuoZhao Ding 2023</el-footer>
  </el-container>
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
  height: 80px;
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
  width: 30%;
  height: 100%;
  background: url("./assets/dataScreen-header-left-bg.png") no-repeat;
}

.dataScreen-header .header-lf .header-screening {
  margin: 0 auto;
  font-size: 20px;
  color: #05e8fe;
}

.dataScreen-header .header-rg {
  position: relative;
  width: 30%;
  height: 100%;
  background: url("./assets/dataScreen-header-left-bg.png") no-repeat;
}

.dataScreen-header .header-rg .header-time {
  margin: 0 auto;
  font-size: 20px;
  color: #05e8fe;
}

.dataScreen-header .header-ct {
  margin: 0 auto;
  position: relative;
  flex: 1;
  height: 100%;
}

.dataScreen-header .header-ct .header-ct-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%px;
  font-size: 32px;
  line-height: 78px;
  color: #05e8fe;
  text-align: center;
  letter-spacing: 4px;
  background: url("./assets/dataScreen-header-center-bg.png") no-repeat;
  background-size: 100% 100%;
}

.title-font-size {
  font-size: 40px;
}

.main {
  margin: 0 auto;
  width: 100%;
}

.footer {
  margin: auto;
  font-size: 20px;
  color: #FFFFFF;
}
</style>
