import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { MapClusterModel } from '../../models/map-item.model';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RoutePaths } from '../../../../core/modules/app-routing.module';

@Component({
  selector: 'app-map-cluster-group-report-context-dialog',
  templateUrl: './map-cluster-group-report-context-dialog.component.html',
  styleUrls: ['./map-cluster-group-report-context-dialog.component.scss'],
})
export class MapClusterGroupReportContextDialogComponent implements AfterContentChecked {
  public cluster!: MapClusterModel;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }

  openReportsForGroup() {
    this.store.dispatch(
      new Navigate([RoutePaths.Reports], {
        clusterLvl: this.cluster.level,
        idCluster: this.cluster.idClust,
      })
    );
  }

  openChartsForGroup() {
    this.store.dispatch(
      new Navigate([RoutePaths.Charts], {
        clusterLvl: this.cluster.level,
        idCluster: this.cluster.idClust,
      })
    );
  }
}
