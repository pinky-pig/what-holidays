<script setup lang="ts">
import HolidaysCalendar from '~/components/layout/HolidaysCalendar.vue'

const $HolidaysCalendar = ref<typeof HolidaysCalendar | null>()

function switchHolidaysCalendar(flag: boolean) {
  $HolidaysCalendar.value?.setShow(flag)
}
</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
      <MainMap @switchHolidaysCalendar="switchHolidaysCalendar" />

      <HolidaysCalendar ref="$HolidaysCalendar" />
    </div>
  </Suspense>
</template>

<style scoped>

</style>
