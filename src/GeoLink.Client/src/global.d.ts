declare module 'esri-leaflet-vector' {
  type VectorBasemaps =
    // Streets and navigation
    | 'ArcGIS:DarkGray'
    | 'ArcGIS:DarkGray:Base'
    | 'ArcGIS:DarkGray:Labels'
    | 'ArcGIS:LightGray'
    | 'ArcGIS:LightGray:Base'
    | 'ArcGIS:LightGray:Labels'
    | 'ArcGIS:Navigation'
    | 'ArcGIS:NavigationNight'
    | 'ArcGIS:Streets'
    | 'ArcGIS:StreetsRelief'
    | 'ArcGIS:StreetsRelief:Base'
    | 'ArcGIS:StreetsNight'
    // Imagery and topography
    | 'ArcGIS:Imagery'
    | 'ArcGIS:Imagery:Standard'
    | 'ArcGIS:Imagery:Labels'
    | 'ArcGIS:Topographic'
    | 'ArcGIS:Topographic:Base'
    | 'ArcGIS:Terrain'
    | 'ArcGIS:Terrain:Base'
    | 'ArcGIS:Terrain:Detail'
    | 'ArcGIS:Oceans'
    | 'ArcGIS:Oceans:Base'
    | 'ArcGIS:Oceans:Labels'
    | 'ArcGIS:Hillshade:Dark'
    | 'ArcGIS:Hillshade:Light'
    // OpenStreetMap
    | 'OSM:Standard'
    | 'OSM:StandardRelief'
    | 'OSM:StandardRelief:Base'
    | 'OSM:DarkGray'
    | 'OSM:DarkGray:Base'
    | 'OSM:DarkGray:Labels'
    | 'OSM:LightGray'
    | 'OSM:LightGray:Base'
    | 'OSM:LightGray:Labels'
    | 'OSM:Streets'
    | 'OSM:StreetsRelief'
    | 'OSM:StreetsRelief:Base'
    // Creative
    | 'ArcGIS:HumanGeography'
    | 'ArcGIS:HumanGeography:Base'
    | 'ArcGIS:HumanGeography:Detail'
    | 'ArcGIS:HumanGeography:Label'
    | 'ArcGIS:HumanGeographyDark'
    | 'ArcGIS:HumanGeographyDark:Base'
    | 'ArcGIS:HumanGeographyDark:Detail'
    | 'ArcGIS:HumanGeographyDark:Label'
    | 'ArcGIS:ColoredPencil'
    | 'ArcGIS:Community'
    | 'ArcGIS:Nova'
    | 'ArcGIS:ChartedTerritory'
    | 'ArcGIS:ChartedTerritory:Base'
    | 'ArcGIS:Midcentury'
    | 'ArcGIS:Newspaper'
    | 'ArcGIS:ModernAntique'
    | 'ArcGIS:ModernAntique:Base';

  interface BasemapLayerOptions extends L.TileLayerOptions {
    apiKey?: string;
    token?: string;
  }

  // class VectorBasemapLayer extends L.TileLayer {
  //   constructor(key: VectorBasemaps, options?: BasemapLayerOptions);
  // }

  export function vectorBasemapLayer(key: VectorBasemaps, options: BasemapLayerOptions): any;

  interface VectorTileLayerOptions extends L.LayerOptions {
    apiKey?: string;
    token?: string;
    portalUrl?: string;
  }

  export function vectorTileLayer(key: string, options: VectorTileLayerOptions): any;
  // export const VectorTileLayer: any;
  export function maplibreGLJSLayer(options: any): any;
  // export const MaplibreGLJSLayer: any;
}
