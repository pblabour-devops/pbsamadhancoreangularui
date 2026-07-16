import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawApplicationComponent } from './withdraw-application.component';

describe('WithdrawApplicationComponent', () => {
  let component: WithdrawApplicationComponent;
  let fixture: ComponentFixture<WithdrawApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
