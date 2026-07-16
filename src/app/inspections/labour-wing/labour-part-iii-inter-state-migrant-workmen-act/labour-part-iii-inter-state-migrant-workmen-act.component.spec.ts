import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiInterStateMigrantWorkmenActComponent } from './labour-part-iii-inter-state-migrant-workmen-act.component';

describe('LabourPartIiiInterStateMigrantWorkmenActComponent', () => {
  let component: LabourPartIiiInterStateMigrantWorkmenActComponent;
  let fixture: ComponentFixture<LabourPartIiiInterStateMigrantWorkmenActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiInterStateMigrantWorkmenActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiInterStateMigrantWorkmenActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
