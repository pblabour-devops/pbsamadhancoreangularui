import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWiseActivityListViewerComponent } from './service-wise-activity-list-viewer.component';

describe('ServiceWiseActivityListViewerComponent', () => {
  let component: ServiceWiseActivityListViewerComponent;
  let fixture: ComponentFixture<ServiceWiseActivityListViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceWiseActivityListViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceWiseActivityListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
