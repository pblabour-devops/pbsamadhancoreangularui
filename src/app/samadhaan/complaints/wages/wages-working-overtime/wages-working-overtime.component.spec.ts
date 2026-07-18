import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesWorkingOvertimeComponent } from './wages-working-overtime.component';

describe('WagesWorkingOvertimeComponent', () => {
  let component: WagesWorkingOvertimeComponent;
  let fixture: ComponentFixture<WagesWorkingOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagesWorkingOvertimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesWorkingOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
