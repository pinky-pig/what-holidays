<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230922130106.png" width="600"/>
</p>

<h6 align='center'>
  <a href="https://holiday.mmeme.me/">What Holidays Online</a>
</h6>

## Introduction

Visualizes official holiday data for various regions on a map(Data for reference only).

## Points

- Flags Data: https://github.com/lipis/flag-icons
- Holiday Data: https://github.com/commenthol/date-holidays
- Geo Data: https://developers.google.com/public-data/docs/canonical/countries_csv?hl=zh-cn
- Styling inspiration: http://species-in-pieces.com/
- Technology Stack:
- - Framework: [Vue3](https://cn.vuejs.org/guide/quick-start.html)
- - Maps: [Mapbox](https://www.mapbox.com/)
- - Date Management: [Dayjs](https://www.npmjs.com/package/dayjs)
- - Hooks: [VueUse](https://vueuse.org/guide/)
- - Layout: [Splitpanes](https://www.npmjs.com/package/splitpanes)
- - Animation Effects: [@vueuse/motion](https://motion.vueuse.org/getting-started/introduction)
- - CSS Library: [UnoCSS](https://unocss.dev/guide/)
- - Icon Library: [Iconify](https://icones.netlify.app/)
- - Global State Management: [Pinia](https://pinia.vuejs.org/introduction.html) , with persistence via    [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

## Development

1. How to bind custom DOM to a map's JavaScript while supporting two-way binding? There are many ways to create custom DOM for maps, such as using DOM strings or web components (native | Lit | Vue customElement). However, ensuring two-way binding after mounting the component to the map can be challenging. One straightforward approach is to use Vue.createApp.

2. One minor drawback when persisting Pinia state using `pinia-plugin-persistedstate` is that, when using the setup syntax, the state must be defined as reactive for persistence to work. When using the setup syntax with Pinia, defining variables as reactive can lead to increased memory consumption and performance overhead for large data sets, such as map instances and marker instances.
