import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeemedApplicationsComponent } from './deemed-applications.component';

describe('DeemedApplicationsComponent', () => {
  let component: DeemedApplicationsComponent;
  let fixture: ComponentFixture<DeemedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeemedApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeemedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
