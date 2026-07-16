import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsComplianceManagerComponent } from './inspections-compliance-manager.component';

describe('InspectionsComplianceManagerComponent', () => {
  let component: InspectionsComplianceManagerComponent;
  let fixture: ComponentFixture<InspectionsComplianceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionsComplianceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsComplianceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
