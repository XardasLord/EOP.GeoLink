import { APP_VERSION } from '../app/version';

export const environment = {
  version: `${APP_VERSION}-acc`,
  apiEndpoint: '/api',
  refreshMapObjectsIntervalInMilliseconds: 60 * 15 * 1000,
  arcGisMapBackground: 'https://csm-test.energa.loc/server/rest/services/Hosted/osm_2021/VectorTileServer',
  arcGisMapLayer0: 'https://csm-test.energa.loc/server/rest/services/siec/MapServer/0',
  arcGisMapLayer1: 'https://csm-test.energa.loc/server/rest/services/siec/MapServer/1',
  arcGisMapLayer2: 'https://csm-test.energa.loc/server/rest/services/siec/MapServer/2',
  arcGisMapLayer3: 'https://csm-test.energa.loc/server/rest/services/siec/MapServer/3',
  arcGisMapLayer4: 'https://csm-test.energa.loc/server/rest/services/siec/MapServer/4',
  wmsMapBackground: '',
  wmsBaseLayerName: '',
  markerTooltipEnabled: false,
};
