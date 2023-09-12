<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div class="searchBar">
    <input v-model="value" placeholder="可以输入地区 CODE 检索" class="searchText" type="text">
  </div>
</template>

<style scoped>
.searchBar {
  width: 300px;
  position: relative;
  z-index: 999;
  padding: 3px;
  height: 40px;
  background: url("http://species-in-pieces.com/img/textured-ui/popout-mid.png") repeat-x left center;
  background-size: contain;
}

.searchBar::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: -53%;
  background: url("http://species-in-pieces.com/img/textured-ui/popout-left.png") no-repeat center center;
  background-size: contain;
}
.searchBar::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  right: -53%;
  background: url("http://species-in-pieces.com/img/textured-ui/popout-right.png") no-repeat center center;
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
