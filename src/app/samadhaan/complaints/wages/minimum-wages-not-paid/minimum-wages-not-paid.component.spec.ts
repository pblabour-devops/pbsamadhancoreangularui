import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumWagesNotPaidComponent } from './minimum-wages-not-paid.component';

describe('MinimumWagesNotPaidComponent', () => {
  let component: MinimumWagesNotPaidComponent;
  let fixture: ComponentFixture<MinimumWagesNotPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinimumWagesNotPaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimumWagesNotPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
