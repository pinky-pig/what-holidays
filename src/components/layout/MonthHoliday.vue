<script setup lang="ts">
function show() {

}

function hide() {

}
defineExpose({
  show,
  hide,
})
</script>

<template>
  <ScratchyBorder class="max-w-400px!">
    <div class="monthHoliday">
      <Calendar />
    </div>
  </ScratchyBorder>
</template>

<style scoped>
.monthHoliday{
  width: 300px;
  height: 320px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
