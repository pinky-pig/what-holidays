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

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.border {
  position: relative;
  max-width: 300px;
  /* height: 300px; */
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  /* background: url('http://species-in-pieces.com/img/textured-ui/repeat-white.png') center center repeat;
  background-size: 80px 60px; */
}

.border .frames div {
  background: url("~/assets/svg/speciesBorder.svg") repeat-x 50% 50%;
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}

.border .frames div:nth-child(2),
.border .frames div:nth-child(4) {
  width: 20px;
  height: 180%;
  background: url("~/assets/svg/speciesBorderVert.svg") repeat-y 50% 50%;
}

.border .frames div:nth-child(3) {
  bottom: 0;
  top: auto;
}

.border .frames div:nth-child(3),
.border .frames div:nth-child(4) {
  transform: rotate(179.99deg);
}

.border .frames div:nth-child(4) {
  right: 0;
  left: auto;
}

.border .corners div::before,
.border .corners div::after {
  content: "";
  background: url("~/assets/svg/speciesCorner.svg") no-repeat center center;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 11px;
  z-index: 99;
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

.content {
  width: 100%;
  height: 100%;
  z-index: 98;
}
</style>
