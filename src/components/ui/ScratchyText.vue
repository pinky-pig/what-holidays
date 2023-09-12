<script setup lang="ts">

</script>

<template>
  <h2 class="textured-type">
    What holidays
  </h2>
</template>

<style scoped>
h2 {
  font-size: 4.35em;
  line-height: 1em;
  color: #fff;
  background: url('~/assets/img/repeat-white.png') center center repeat;
  background-size: 80px 60px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: scratchy .253s linear forwards infinite;
}

@keyframes scratchy {

  0% {
    background-position: 0 0;
  }

  25% {
    background-position: 0 0;
  }

  26% {
    background-position: 20px -20px;
  }

  50% {
    background-position: 20px -20px;
  }

  51% {
    background-position: 40px -40px;
  }

  75% {
    background-position: 40px -40px;
  }

  76% {
    background-position: 60px -60px;
  }

  99% {
    background-position: 60px -60px;
  }

  100% {
    background-position: 0 0;
  }
}
</style>
