import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MapObjectModel } from '../../models/map-item.model';

const TELCO_SVG_ICON = `
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M28.7,122.88h11.03v-13.4H28.7V122.88L28.7,122.88z M22.67,19.51h74.76c2.56,0,4.66,2.09,4.66,4.66v75.01 c0,2.56-2.1,4.66-4.66,4.66l-74.76,0c-2.56,0-4.66-2.1-4.66-4.66V24.16C18.01,21.6,20.1,19.51,22.67,19.51L22.67,19.51L22.67,19.51 z M42.35,41.29h35.38c1.55,0,2.81,1.27,2.81,2.81v35.12c0,1.55-1.27,2.81-2.81,2.81H42.35c-1.55,0-2.81-1.27-2.81-2.81V44.1 C39.54,42.56,40.8,41.29,42.35,41.29L42.35,41.29z M122.88,65.62v9.16h-13.4v-9.16H122.88L122.88,65.62z M122.88,48.1v9.16l-13.4,0 V48.1L122.88,48.1L122.88,48.1L122.88,48.1z M122.88,83.15v11.03h-13.4V83.15H122.88L122.88,83.15z M122.88,28.7v11.03h-13.4V28.7 H122.88L122.88,28.7z M0,65.62v9.16h13.4v-9.16H0L0,65.62z M0,48.1v9.16l13.4,0V48.1L0,48.1L0,48.1z M0,83.15v11.03h13.4V83.15H0 L0,83.15z M0,28.7v11.03h13.4V28.7H0L0,28.7z M65.62,0h9.16v13.4h-9.16V0L65.62,0L65.62,0z M48.1,0h9.16v13.4H48.1V0L48.1,0L48.1,0 z M83.15,0h11.03v13.4H83.15V0L83.15,0L83.15,0z M28.7,0h11.03v13.4H28.7V0L28.7,0L28.7,0z M65.62,122.88h9.16v-13.4h-9.16V122.88 L65.62,122.88z M48.1,122.88h9.16v-13.4H48.1V122.88L48.1,122.88z M83.15,122.88h11.03v-13.4H83.15V122.88L83.15,122.88z"/></g></svg>
`;

const POMIARY_SVG_ICON = `
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.879px" height="103.461px" viewBox="0 0 122.879 103.461" enable-background="new 0 0 122.879 103.461" xml:space="preserve"><g><path d="M85.275,18.308c9.75,1.166,18.492,5.614,25.09,12.21c7.732,7.732,12.514,18.415,12.514,30.212 c0,11.799-4.781,22.482-12.514,30.215s-18.416,12.516-30.215,12.516s-22.48-4.783-30.213-12.516S37.422,72.529,37.422,60.73 c0-11.798,4.783-22.48,12.515-30.212c7.083-7.083,16.643-11.691,27.266-12.415v-7.167c0-0.109,0.006-0.216,0.014-0.323h-8.004 c-1.313,0-2.385-1.074-2.385-2.386V2.386C66.828,1.074,67.9,0,69.213,0h24.053c1.313,0,2.387,1.074,2.387,2.386v5.841 c0,1.313-1.074,2.386-2.387,2.386h-8.004c0.01,0.106,0.014,0.214,0.014,0.323V18.308L85.275,18.308z M83.582,54.348 c2.271,1.223,3.814,3.623,3.814,6.383c0,4.002-3.244,7.248-7.246,7.248s-7.246-3.246-7.246-7.248c0-2.76,1.545-5.16,3.816-6.383 V37.744c0-1.895,1.535-3.431,3.43-3.431s3.432,1.536,3.432,3.431V54.348L83.582,54.348z M10.527,84.598 c-1.895,0-3.431-1.537-3.431-3.432s1.536-3.43,3.431-3.43h19.378c1.895,0,3.43,1.535,3.43,3.43s-1.536,3.432-3.43,3.432H10.527 L10.527,84.598z M3.43,64.424c-1.895,0-3.43-1.535-3.43-3.43s1.536-3.432,3.43-3.432h22.447c1.894,0,3.43,1.537,3.43,3.432 s-1.536,3.43-3.43,3.43H3.43L3.43,64.424z M10.354,44.774c-1.895,0-3.43-1.536-3.43-3.43s1.536-3.431,3.43-3.431h19.229 c1.895,0,3.431,1.536,3.431,3.431s-1.536,3.43-3.431,3.43H10.354L10.354,44.774z M118.527,31.215 c1.658-3.958,1.461-8.104-0.912-10.882c-2.848-3.333-7.996-3.715-12.777-1.37C109.902,22.436,114.5,26.476,118.527,31.215 L118.527,31.215z M41.775,31.215c-1.659-3.958-1.462-8.104,0.911-10.882c2.848-3.333,7.996-3.715,12.777-1.37 C50.4,22.436,45.801,26.476,41.775,31.215L41.775,31.215z M105.514,35.369c-6.49-6.491-15.457-10.505-25.363-10.505 c-9.904,0-18.872,4.015-25.362,10.505c-6.491,6.49-10.505,15.458-10.505,25.362c0,9.906,4.015,18.873,10.505,25.363 S70.246,96.6,80.15,96.6c9.906,0,18.873-4.016,25.363-10.506S116.02,70.637,116.02,60.73 C116.02,50.826,112.004,41.859,105.514,35.369L105.514,35.369z"/></g></svg>
`;

@Component({
  selector: 'app-map-item-tooltip-dialog',
  templateUrl: './map-item-tooltip-dialog.component.html',
  styleUrls: ['./map-item-tooltip-dialog.component.scss'],
})
export class MapItemTooltipDialogComponent {
  public mapItem!: MapObjectModel;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('TELCO', sanitizer.bypassSecurityTrustHtml(TELCO_SVG_ICON));
    iconRegistry.addSvgIconLiteral('POMIARY', sanitizer.bypassSecurityTrustHtml(POMIARY_SVG_ICON));
  }
}
