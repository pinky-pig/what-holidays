<script setup lang="ts">
import type { AllAreaType } from '~/store/area'

const store = useAreaStore()

const value = ref('')
const isShowSelectMenu = ref(false)
const $searchBar = ref<HTMLElement | null>(null) // onClickOutside，可以不定义，传 DOM ID

const filterClosedAreas = ref<AllAreaType[]>([])
watch(value, (v) => {
  filterClosedAreas.value = filteredCountries(v, store.allAreas)
})

function filteredCountries(text: string, allAreas: AllAreaType[]) {
  // 使用 filter 方法来过滤匹配搜索关键词的对象
  return allAreas.filter(country =>
    country.name.includes(text),
  )
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center">
    <div ref="$searchBar" class="searchBar">
      <input
        v-model="value"
        placeholder="可以输入地区 CODE 检索"
        class="searchText"
        type="text"
        @focus="isShowSelectMenu = true"
      >
    </div>
    <SelectMenu
      v-model="isShowSelectMenu"
      :ignore-element="$searchBar"
      :list-data="filterClosedAreas"
    />
  </div>
</template>

<style scoped>
.searchBar {
  width: 200px;
  position: relative;
  z-index: 9999;
  padding: 3px;
  height: 40px;
  background: url("~/assets/img/popout-mid.png") repeat-x left center;
  background-size: contain;
}

.searchBar::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: -55%;
  background: url("~/assets/img/popout-left.png") no-repeat center center;
  background-size: contain;
}
.searchBar::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  right: -55%;
  background: url("~/assets/img/popout-right.png") no-repeat center center;
  background-size: contain;
}
.searchText{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  outline: 0px solid ;
  background: transparent;
}
</style>
