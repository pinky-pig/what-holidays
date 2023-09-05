<script setup lang="ts">

</script>

<template>
  <div class="searchBar z-9 h30 w30 bg-red-100">
    <div class="inner">
      666
    </div>
  </div>
</template>

<style scoped>
.searchBar {
  padding: 5px;
  border-radius: 35px;
}

.searchBar::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  clip-path: polygon(46% 21%, 76% 31%, 65% 59%, 32% 40%);
  background: url("http://species-in-pieces.com/img/textured-ui/green-texture.png") repeat center center/40px 40px;
}
</style>
