import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryOfMoneyGeneralDetailsComponent } from './recovery-of-money-general-details.component';

describe('RecoveryOfMoneyGeneralDetailsComponent', () => {
  let component: RecoveryOfMoneyGeneralDetailsComponent;
  let fixture: ComponentFixture<RecoveryOfMoneyGeneralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryOfMoneyGeneralDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryOfMoneyGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
