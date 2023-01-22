import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { MapItemModel } from '../models/map-item.model';
import { MapItemContextDialogComponent } from '../components/map-item-context-dialog/map-item-context-dialog.component';
import { MapItemTooltipDialogComponent } from '../components/map-item-tooltip-dialog/map-item-tooltip-dialog.component';
import { MapClusterGroupContextDialogComponent } from '../components/map-cluster-group-context-dialog/map-cluster-group-context-dialog.component';
import { MapClusterGroupReportContextDialogComponent } from '../components/map-cluster-group-report-context-dialog/map-cluster-group-report-context-dialog.component';

@Injectable()
export class DynamicComponentCreatorHelper {
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {}

  public createMapItemPopup(item: MapItemModel) {
    // Bind custom Angular Component as a popup/tooltip - https://stackoverflow.com/questions/42340067/angular-component-into-leaflet-popup
    // Another solution - https://stackoverflow.com/a/45107300/3921353
    // Another solution - https://stackoverflow.com/a/57773246/3921353
    const componentRef = this.resolver.resolveComponentFactory(MapItemContextDialogComponent).create(this.injector);

    componentRef.instance.mapItem = item;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  public createMapItemTooltip(item: MapItemModel) {
    const componentRef = this.resolver.resolveComponentFactory(MapItemTooltipDialogComponent).create(this.injector);

    componentRef.instance.mapItem = item;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  public createClusterGroupPopup(items: MapItemModel[]) {
    const componentRef = this.resolver
      .resolveComponentFactory(MapClusterGroupContextDialogComponent)
      .create(this.injector);

    componentRef.instance.mapItems = items;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  public createClusterGroupQuickReportsPopup(items: MapItemModel[]) {
    const componentRef = this.resolver
      .resolveComponentFactory(MapClusterGroupReportContextDialogComponent)
      .create(this.injector);

    componentRef.instance.mapItems = items;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }
}
