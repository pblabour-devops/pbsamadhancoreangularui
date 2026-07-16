import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionConfirmationComponent } from './inspection-confirmation.component';

describe('InspectionConfirmationComponent', () => {
  let component: InspectionConfirmationComponent;
  let fixture: ComponentFixture<InspectionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
