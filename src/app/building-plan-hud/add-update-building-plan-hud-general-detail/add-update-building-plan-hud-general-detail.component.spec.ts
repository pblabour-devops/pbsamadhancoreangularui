import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBuildingPlanHudGeneralDetailComponent } from './add-update-building-plan-hud-general-detail.component';

describe('AddUpdateBuildingPlanHudGeneralDetailComponent', () => {
  let component: AddUpdateBuildingPlanHudGeneralDetailComponent;
  let fixture: ComponentFixture<AddUpdateBuildingPlanHudGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBuildingPlanHudGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBuildingPlanHudGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
