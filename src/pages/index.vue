<script setup lang="ts">
import HolidaysCalendar from '~/components/layout/HolidaysCalendar.vue'

const $HolidaysCalendar = ref<typeof HolidaysCalendar | null>()

let open = false
function openHolidaysCalendar() {
  open = !open
  $HolidaysCalendar.value?.setShow(open)
}
</script>

<template>
  <Background />
  <Suspense>
    <div class="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto">
      <button class="absolute left-0 top-0 z-10 btn" @click="openHolidaysCalendar">
        open HolidaysCalendar
      </button>
      <MainMap />

      <HolidaysCalendar ref="$HolidaysCalendar" />
    </div>
  </Suspense>
</template>

<style scoped>

</style>
