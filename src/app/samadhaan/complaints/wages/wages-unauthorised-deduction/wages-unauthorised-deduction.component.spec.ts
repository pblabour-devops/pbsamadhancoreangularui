import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesUnauthorisedDeductionComponent } from './wages-unauthorised-deduction.component';

describe('WagesUnauthorisedDeductionComponent', () => {
  let component: WagesUnauthorisedDeductionComponent;
  let fixture: ComponentFixture<WagesUnauthorisedDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagesUnauthorisedDeductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesUnauthorisedDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
