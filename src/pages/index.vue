<script setup lang="ts">
import HolidaysCalendar from '~/components/layout/HolidaysCalendar.vue'

const $HolidaysCalendar = ref<typeof HolidaysCalendar | null>()

function switchHolidaysCalendar() {
  $HolidaysCalendar.value?.setShow(!$HolidaysCalendar.value.isShow)
}
</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
      <button class="absolute left-0 top-0 z-10 btn" @click="switchHolidaysCalendar">
        open HolidaysCalendar
      </button>
      <MainMap />

      <HolidaysCalendar ref="$HolidaysCalendar" />
    </div>
  </Suspense>
</template>

<style scoped>

</style>
