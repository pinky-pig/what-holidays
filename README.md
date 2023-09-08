<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230905160648.png" width="600"/>
</p>


<h6 align='center'>
  <a href="">在线体验</a>
</h6>

## 挂载自定义组件 DOM 到 Popup

为满足组件式开发，并且支持双向绑定。

- [] Lit
- [] Vue ce.vue customElement
- [] createApp


## Points

- Flag : https://github.com/lipis/flag-icons
- Holiday Data : https://github.com/commenthol/date-holidays
- Geo Data : https://developers.google.com/public-data/docs/canonical/countries_csv?hl=zh-cn

<!-- ![20230901161725](https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230901161725.png) -->


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
