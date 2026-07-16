import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverOfMoneyComponent } from './recover-of-money.component';

describe('RecoverOfMoneyComponent', () => {
  let component: RecoverOfMoneyComponent;
  let fixture: ComponentFixture<RecoverOfMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoverOfMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverOfMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
