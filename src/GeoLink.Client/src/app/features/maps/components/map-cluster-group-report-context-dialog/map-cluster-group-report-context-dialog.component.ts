import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { MapClusterModel } from '../../models/map-item.model';

@Component({
  selector: 'app-map-cluster-group-report-context-dialog',
  templateUrl: './map-cluster-group-report-context-dialog.component.html',
  styleUrls: ['./map-cluster-group-report-context-dialog.component.scss'],
})
export class MapClusterGroupReportContextDialogComponent implements AfterContentChecked {
  public mapItems!: MapClusterModel;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }
}
