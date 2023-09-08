import type mapboxgl from 'mapbox-gl'

export interface IMarker extends mapboxgl.Marker {
  attributes?: any
}

export interface IPopup extends mapboxgl.Marker {
  attributes?: any
  isShow: boolean
  show: (coordinates: [number, number]) => void
  hide: () => void
}
