import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiContractLabourActComponent } from './labour-part-iii-contract-labour-act.component';

describe('LabourPartIiiContractLabourActComponent', () => {
  let component: LabourPartIiiContractLabourActComponent;
  let fixture: ComponentFixture<LabourPartIiiContractLabourActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiContractLabourActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiContractLabourActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
