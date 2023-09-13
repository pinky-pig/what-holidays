<template>
  <div class="scratchyBorder">
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
.scratchyBorder {
  position: relative;
  max-width: 300px;
  /* height: 300px; */
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  z-index: 99;
  /* background: url('http://species-in-pieces.com/img/textured-ui/repeat-white.png') center center repeat;
  background-size: 80px 60px; */
}

.scratchyBorder .frames div {
  background: url("~/assets/svg/speciesBorder.svg") repeat-x 50% 50%;
  width: 180%;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}

.scratchyBorder .frames div:nth-child(2),
.scratchyBorder .frames div:nth-child(4) {
  width: 20px;
  height: 180%;
  background: url("~/assets/svg/speciesBorderVert.svg") repeat-y 50% 50%;
}

.scratchyBorder .frames div:nth-child(3) {
  bottom: 0;
  top: auto;
}

.scratchyBorder .frames div:nth-child(3),
.scratchyBorder .frames div:nth-child(4) {
  transform: rotate(179.99deg);
}

.scratchyBorder .frames div:nth-child(4) {
  right: 0;
  left: auto;
}

.scratchyBorder .corners div::before,
.scratchyBorder .corners div::after {
  content: "";
  background: url("~/assets/svg/speciesCorner.svg") no-repeat center center;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 11px;
  z-index: 99;
  pointer-events: none;
}

.scratchyBorder .corners div:nth-child(1)::after {
  transform: rotate(90deg);
  left: auto;
  right: 10px;
  top: 11px;
}

.scratchyBorder .corners div:nth-child(2)::before {
  left: auto;
  right: 10px;
  top: auto;
  bottom: 11px;
  transform: rotate(180deg);
}

.scratchyBorder .corners div:nth-child(2)::after {
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
