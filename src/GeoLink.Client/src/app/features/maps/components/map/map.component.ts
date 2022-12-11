import { Component } from '@angular/core';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import {
  circle,
  latLng,
  Layer,
  MapOptions,
  marker,
  polygon,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  // https://leafletjs.com/examples/wms/wms.html
  options: MapOptions = {
    layers: [
      tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS',
        opacity: 0.7,
        minZoom: 3,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 7,
    center: latLng(52.22779941887071, 19.764404296875),
  };

  layersControl: LeafletControlLayersConfig = {
    baseLayers: {
      Topography: tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS',
        maxZoom: 18,
        attribution: '...',
      }),
      Places: tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS',
        maxZoom: 18,
        attribution: '...',
      }),
      'Topography, then places': tileLayer.wms(
        'http://ows.mundialis.de/services/service?',
        {
          layers: 'TOPO-WMS,OSM-Overlay-WMS',
          maxZoom: 18,
          attribution: '...',
        }
      ),
      'Places, then topography': tileLayer.wms(
        'http://ows.mundialis.de/services/service?',
        {
          layers: 'OSM-Overlay-WMS,TOPO-WMS',
          maxZoom: 18,
          attribution: '...',
        }
      ),
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };

  layers: Layer[] = [
    circle([46.95, -122], { radius: 5000 }),
    polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8],
    ]),
    marker([52.22779941887071, 19.764404296875]),
  ];

  mapClicked(event: any) {
    console.log(event);
  }
}
