import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiObservationsComponent } from './labour-part-iii-observations.component';

describe('LabourPartIiiObservationsComponent', () => {
  let component: LabourPartIiiObservationsComponent;
  let fixture: ComponentFixture<LabourPartIiiObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiObservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
