<script setup lang="ts">
defineProps<{ title?: string; noOverflow?: boolean; noRounding?: boolean }>()
</script>

<template>
  <div
    h="full"
    grid="~"
    border="1 light-900 "
    shadow="lg"
    :style="{ gridTemplateRows: title ? 'min-content auto' : 'auto' }"
    :class="noRounding ? 'border-t-0' : 'rounded-md'"
  >
    <div
      v-if="title"
      flex="~ row"
      text="xs"
      items="center"
      bg="light-500 "
      border="b-1 light-900"
      p="l-2"
      h="8"
      :class="noRounding ? '' : 'rounded-t-md'"
    >
      <div flex="1">
        {{ title }}
      </div>
      <div flex="~ row" items="center">
        <slot name="controls" />
      </div>
    </div>
    <div
      bg=" light-300"
      position="relative"
      border="rounded-b-md"
      w="full"
      :class="noOverflow ? 'overflow-hidden' : 'overflow-auto'"
    >
      <slot />
    </div>
  </div>
</template>
