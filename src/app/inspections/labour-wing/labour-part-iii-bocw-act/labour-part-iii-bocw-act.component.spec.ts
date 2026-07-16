import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiBocwActComponent } from './labour-part-iii-bocw-act.component';

describe('LabourPartIiiBocwActComponent', () => {
  let component: LabourPartIiiBocwActComponent;
  let fixture: ComponentFixture<LabourPartIiiBocwActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiBocwActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiBocwActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
