import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReturnDashboardComponent } from './annual-return-dashboard.component';

describe('AnnualReturnDashboardComponent', () => {
  let component: AnnualReturnDashboardComponent;
  let fixture: ComponentFixture<AnnualReturnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualReturnDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReturnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
