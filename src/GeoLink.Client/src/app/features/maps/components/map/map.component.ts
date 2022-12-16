import { Component, OnInit } from '@angular/core';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { circle, latLng, Layer, MapOptions, marker, polygon, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  // https://leafletjs.com/examples/wms/wms.html
  options: MapOptions = {
    layers: [
      tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS',
        opacity: 0.7,
        minZoom: 3,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
      'Topography, then places': tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS',
        maxZoom: 18,
        attribution: '...',
      }),
      'Places, then topography': tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS,TOPO-WMS',
        maxZoom: 18,
        attribution: '...',
      }),
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
    marker([52.22779941887071, 19.764404296875], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/marker-icon.png',
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
      }),
    }),
  ];

  mapClicked(event: any) {
    console.log(event);
  }

  // Marker cluster configuration
  markerClusterGroup!: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions!: L.MarkerClusterGroupOptions;

  // Generators for lat/lon values
  generateLat() {
    return Math.random() * 360 - 180;
  }
  generateLon() {
    return Math.random() * 180 - 90;
  }

  ngOnInit() {
    this.refreshData();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  refreshData(): void {
    this.markerClusterData = this.generateData(10000);
  }

  generateData(count: number): L.Marker[] {
    const data: L.Marker[] = [];

    for (let i = 0; i < count; i++) {
      const icon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/marker-icon.png',
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
      });

      data.push(L.marker([this.generateLat(), this.generateLon()], { icon }));
    }

    return data;
  }
}
