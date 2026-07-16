import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiChildAdolescentLabourActComponent } from './labour-part-iii-child-adolescent-labour-act.component';

describe('LabourPartIiiChildAdolescentLabourActComponent', () => {
  let component: LabourPartIiiChildAdolescentLabourActComponent;
  let fixture: ComponentFixture<LabourPartIiiChildAdolescentLabourActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiChildAdolescentLabourActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiChildAdolescentLabourActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
