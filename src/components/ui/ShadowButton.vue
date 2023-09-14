<script setup lang="ts">

</script>

<template>
  <div class="small-button">
    <slot />
  </div>
</template>

<style scoped>
.small-button {
  min-width: 30px;
  min-height: 30px;
  color: #000000;
  background-color: #ffffff;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0.5em 1em;
  font-size: 1em;
  text-decoration: none;
  transition: all .3s;
  border: 1px #0000000a;
  box-shadow: inset 0 -3px 4px -1px rgba(0, 0, 0, .04),
              0 2px 5px rgba(221, 150, 150, .04),
              0 4px 4px rgba(0, 0, 0, .02),
              0 0 0 1px rgba(0, 0, 0, .09);;
}

.small-button:hover {
  box-shadow: inset 0 -3px 4px -1px rgba(0, 0, 0, .09),
              0 2px 5px rgba(0, 0, 0, .13),
              0 4px 4px rgba(0, 0, 0, .02),
              0 0 0 1px rgba(0, 0, 0, .09);
}
</style>
