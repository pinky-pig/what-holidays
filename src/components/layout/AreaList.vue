<script setup lang="ts">
const store = useAreaStore()

const areas = computed(() => store.allAreas || [])
const value = ref('')
// 打开动画是先扩展，然后 blur 显示
// 关闭动画是先 blur 隐藏，然后收缩
const isExpand = ref(false)
</script>

<template>
  <div
    class="area-list-container relative max-h-0 flex flex-col gap-4 p-4 transition-all duration-800"
  >
    <!-- 最小化 -->
    <div
      class="circle absolute z-99 h-50px w-50px flex flex-row cursor-pointer items-center justify-center rounded-full"
      @click="isExpand = !isExpand"
    >
      <div class="h-38px w-38px flex flex-row items-center justify-center rounded-full bg-[#944DFEc0]">
        <div i-fluent-emoji:magnifying-glass-tilted-right />
      </div>
      <div class="circle-line" />
    </div>

    <div class="expand-panel h-full w-full">
      <div class="ml-50px flex flex-row items-center">
        <!-- 检索 input 及 Code 跳转链接按钮 -->
        <div class="relative h-50px flex flex-1 flex-row items-center">
          <div class="searchBar relative z-98">
            <input
              v-model="value"
              placeholder="可以输入地区 CODE 检索"
              class="searchText placeholder-select-none"
              type="text"
            >
          </div>

          <!-- 打开 code 的外链 href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" -->
          <a
            class="code-tag absolute left-210px top-20px z-99 h-30px w-64px flex select-none items-center justify-center rounded-8px bg-[#fed11b] -ml-15px -rotate-10"
            href="https://baike.baidu.com/item/ISO%20639-1/8292914?fr=ge_ala"
            target="_blank"
          >
            <span class="text-14px font-bold underline underline-black underline-offset-4">
              code
            </span>
          </a>
        </div>
      </div>
      <!-- 面板 -->
      <ScratchyBorder class="mt-25px max-w-unset!">
        <div class="h-420px w-478px flex flex-row flex-wrap select-none gap-4 overflow-auto rounded-md bg-[#944dfe] p-4">
          <div
            v-for="item in areas"
            :key="item.name"
            class="h-30px w-60px flex flex-row items-center justify-center border-2 border-[#944DFE] rounded-md bg-[#fff]"
          >
            <div class="w-fit flex cursor-pointer items-center overflow-hidden border-2 border-white rounded border-solid bg-[rgba(152,208,255,0.5)] px-1.5 py-[0.1875rem] shadow-[rgba(170,166,170,0.40)] shadow-md hover:animate-[shake_1.5s_ease-in-out_infinite] space-x-0.5">
              <img
                :src="item.flag"
                class="block h-2 w-2"
              >
            </div>

            <div>
              {{ item.code }}
            </div>
          </div>
        </div>
      </ScratchyBorder>
    </div>
  </div>
</template>

<style scoped>
.circle {
  background: transparent url("~/assets/img/threat.png") center center no-repeat;
  background-size: cover;
}
.circle-line {
  position: absolute;
  left: 50%;
  bottom: -50%;
  width: 2px;
  height: 50%;
  background: white;
  transform: translate(-50%, 0%);
}

.searchBar {
  width: 200px;
  position: relative;
  padding: 3px;
  height: 40px;
  background: url("~/assets/img/popout-mid.png") repeat-x left center;
  background-size: contain;
}

.searchBar::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: -55%;
  background: url("~/assets/img/popout-left.png") no-repeat center center;
  background-size: contain;
}
.searchBar::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  right: -55%;
  background: url("~/assets/img/popout-right.png") no-repeat center center;
  background-size: contain;
}
.searchText{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  outline: 0px solid ;
  background: transparent;
}

/* tag code hover 样式 */
.code-tag{
  box-shadow: #fed11b 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.code-tag:hover{
  cursor: pointer;
  box-shadow: #fed11bb0 0px 0px 0px 5px;
}
.code-tag:hover span{
  color: #944dfe;
  text-decoration-color: #944dfe;
}
</style>
