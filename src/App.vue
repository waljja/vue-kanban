<script setup lang="ts">
  import DataTable from './components/DataTable.vue'
</script>

<template>
  <el-container class="container">
    <el-header class="header"><span class="title-font-size">成品入库管理看板</span></el-header>
    <el-main class="main"><DataTable></DataTable></el-main>
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
  text-align: center;
  color: #FFFFFF;
}

.title-font-size {
  font-size: 35px;
}

.main{
  margin: 0 auto;
  width: 100%;
}
</style>
