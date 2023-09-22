<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230922130106.png" width="600"/>
</p>

<h6 align='center'>
  <a href="https://holiday.mmeme.me/">What holidays 在线体验</a>
</h6>

## 前言

可视化地图呈现各地区官方节假日数据（数据仅供参考）。

## Points

- 旗帜数据: https://github.com/lipis/flag-icons
- 节日数据 Holiday Data: https://github.com/commenthol/date-holidays
- 节日数据 Geo Data: https://developers.google.com/public-data/docs/canonical/countries_csv?hl=zh-cn
- 样式灵感: http://species-in-pieces.com/
- 技术:
- - 框架: [Vue3](https://cn.vuejs.org/guide/quick-start.html)
- - 地图: [Mapbox](https://www.mapbox.com/)
- - 日历: [Dayjs](https://www.npmjs.com/package/dayjs)
- - 工具函数: [VueUse](https://vueuse.org/guide/)
- - 布局: [Splitpanes](https://www.npmjs.com/package/splitpanes)
- - 动画效果: [@vueuse/motion](https://motion.vueuse.org/getting-started/introduction)
- - CSS 库: [UnoCSS](https://unocss.dev/guide/)
- - 图标库: [Iconify](https://icones.netlify.app/)
- - 全局状态: [Pinia](https://pinia.vuejs.org/introduction.html) ，持久化[pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

## 开发

1. 地图 JS 挂载自定义 DOM 如何双向绑定？首先地图自定义 DOM 有很多种，DOM 字符串，或者Web components ( 原生 | Lit |Vue ce.vue customElement)，但是如何组件挂载到地图后，仍支持双向绑定。这里直接粗暴的使用 Vue.createApp 。

2. 一个小缺陷，持久化 Pinia 的时候，使用 `pinia-plugin-persistedstate` ，如果是 setup 的写法， state 需要定义成响应式的，否则持久化不生效。
pinia 使用 setup 写法的时候，定义变量如果是响应式的，存储数据量过大，性能消耗也会更大。比如地图实例， marker 实例等。
