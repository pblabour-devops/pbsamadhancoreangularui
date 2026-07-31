import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryOfMoneyComponent } from './recovery-of-money.component';

describe('RecoveryOfMoneyComponent', () => {
  let component: RecoveryOfMoneyComponent;
  let fixture: ComponentFixture<RecoveryOfMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryOfMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryOfMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
