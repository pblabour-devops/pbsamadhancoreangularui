import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesNotPaidAtAllComponent } from './wages-not-paid-at-all.component';

describe('WagesNotPaidAtAllComponent', () => {
  let component: WagesNotPaidAtAllComponent;
  let fixture: ComponentFixture<WagesNotPaidAtAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagesNotPaidAtAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesNotPaidAtAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
