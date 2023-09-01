<script setup lang="ts">

</script>

<template>
  <div class="border">
    <div class="frames">
      <div />
      <div />
      <div />
      <div />
    </div>
    <div class="corners">
      <div />
      <div />
    </div>
  </div>
</template>

<style scoped>
.border {
  transition: all 0.25s cubic-bezier(0.62, 0.02, 0.34, 1);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}

.border > div {
  height: 100%;
  width: 100%;
  position: absolute;
}

.border .frames div {
  background: url("http://species-in-pieces.com/img/svg/border.svg") repeat-x 50% 50%;
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}

.border .frames div:nth-child(2), .border .frames div:nth-child(4) {
  width: 20px;
  height: 100%;
  background: url("http://species-in-pieces.com/img/svg/border-vert.svg") repeat-y 50% 50%;
}

.border .frames div:nth-child(3) {
  bottom: 0;
  top: auto;
}

.border .frames div:nth-child(3), .border .frames div:nth-child(4) {
  transform: rotate(179.99deg);
}

.border .frames div:nth-child(4) {
  right: 0;
  left: auto;
}

.border .corners div::before, .border .corners div::after {
  content: "";
  background: url("http://species-in-pieces.com/img/svg/corner.svg") no-repeat center center;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 11px;
}

.border .corners div:nth-child(1)::after {
  transform: rotate(90deg);
  left: auto;
  right: 10px;
  top: 11px;
}

.border .corners div:nth-child(2)::before {
  left: auto;
  right: 10px;
  top: auto;
  bottom: 11px;
  transform: rotate(180deg);
}

.border .corners div:nth-child(2)::after {
  top: auto;
  bottom: 11px;
  transform: rotate(270deg);
}
</style>
