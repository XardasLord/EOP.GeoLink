import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHelperBarComponent } from './map-helper-bar.component';

describe('MapHelperBarComponent', () => {
  let component: MapHelperBarComponent;
  let fixture: ComponentFixture<MapHelperBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHelperBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapHelperBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
