import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlanHUD_MakeRaisedFeeComponent } from './buildingPlanHUD-make-raised-fees.component';

describe('AppfeecalculatorComponent', () => {
  let component: BuildingPlanHUD_MakeRaisedFeeComponent;
  let fixture: ComponentFixture<BuildingPlanHUD_MakeRaisedFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPlanHUD_MakeRaisedFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlanHUD_MakeRaisedFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
