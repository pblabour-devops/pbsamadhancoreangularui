import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeVerificationManagerComponent } from './fee-verification-manager.component';

describe('FeeVerificationManagerComponent', () => {
  let component: FeeVerificationManagerComponent;
  let fixture: ComponentFixture<FeeVerificationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeVerificationManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeVerificationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
