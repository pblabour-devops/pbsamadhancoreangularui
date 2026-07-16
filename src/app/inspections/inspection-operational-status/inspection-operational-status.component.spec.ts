import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionOperationalStatusComponent } from './inspection-operational-status.component';

describe('InspectionOperationalStatusComponent', () => {
  let component: InspectionOperationalStatusComponent;
  let fixture: ComponentFixture<InspectionOperationalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionOperationalStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionOperationalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
