<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230905160648.png" width="600"/>
</p>


<h6 align='center'>
  <a href="https://holiday.mmeme.me/">在线体验</a>
</h6>

2023/09/22

- 适配移动端（search、area.vue）
- search icon
- 移动端弹窗样式



## Points

- Flag : https://github.com/lipis/flag-icons
- Holiday Data : https://github.com/commenthol/date-holidays
- Geo Data : https://developers.google.com/public-data/docs/canonical/countries_csv?hl=zh-cn

<!-- ![20230901161725](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230901161725.png) -->



- 挂载自定义组件 DOM 到 Popup

为满足组件式开发，并且支持双向绑定。

- [] Lit
- [] Vue ce.vue customElement
- [] createApp

- pinia-plugin-persistedstate

在使用 pinia 过程中，如果是 setup 的写法， state 需要定义成响应式的，否则持久化不生效

```ts
// Vue3 弹窗双向绑定
const el = document.createElement('div')
el.innerHTML = `
        <div id="customMapboxPopup"></div>
      `
new mapboxgl.Marker(el)
  .setLngLat([-96, 37.8] as LngLatLike)
  .addTo(mapInstance!) as IMarker

nextTick(() => {
  const popup = createApp(CustomMapboxPopup)
  popup.mount('#customMapboxPopup')
})
```

- pinia

pinia 使用 setup 写法的时候，定义变量如果是响应式的，存储数据量过大，性能消耗也会更大。比如地图实例， marker 实例等。
