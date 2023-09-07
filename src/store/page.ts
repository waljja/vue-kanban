import { ref } from "vue"
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const currentPage = ref(1)
  // 设置当前页码
  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }
  return { currentPage, setCurrentPage }
})