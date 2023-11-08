import { APP_VERSION } from '../app/version';

export const environment = {
  version: `${APP_VERSION}-dev`,
  // apiEndpoint: 'http://localhost:3201/api', // Using the PUTTY tunelling to access ACC server
  apiEndpoint: 'http://10.0.2.71:8200/api',
  refreshMapObjectsIntervalInMilliseconds: 60 * 15 * 1000,
  arcGisMapBackground: '',
  arcGisMapLayer0: '',
  arcGisMapLayer1: '',
  arcGisMapLayer2: '',
  arcGisMapLayer3: '',
  arcGisMapLayer4: '',
  wmsMapBackground: 'http://10.0.2.71:8381/wms?',
  wmsBaseLayerName: 'WMS- geoportal',
  markerTooltipEnabled: false,
};
