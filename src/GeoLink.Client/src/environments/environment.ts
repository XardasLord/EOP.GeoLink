export const environment = {
  apiEndpoint: 'http://10.0.2.71:8200/api',
  environmentName: 'dev',
  refreshMapObjectsIntervalInMilliseconds: 60 * 15 * 1000,
  arcGisMapBackground: 'http://localhost:3002/server/rest/services/Hosted/osm_2021/VectorTileServer',
  arcGisMapLayer0: 'http://localhost:3002/server/rest/services/siec/MapServer/0',
  arcGisMapLayer1: 'http://localhost:3002/server/rest/services/siec/MapServer/1',
  arcGisMapLayer2: 'http://localhost:3002/server/rest/services/siec/MapServer/2',
  arcGisMapLayer3: 'http://localhost:3002/server/rest/services/siec/MapServer/3',
  arcGisMapLayer4: 'http://localhost:3002/server/rest/services/siec/MapServer/4',
  wmsMapBackground: 'http://10.0.2.71:8381/wms?',
  wmsBaseLayerName: 'WMS- geoportal',
};
