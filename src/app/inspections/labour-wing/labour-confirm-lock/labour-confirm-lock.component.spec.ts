import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourConfirmLockComponent } from './labour-confirm-lock.component';

describe('LabourConfirmLockComponent', () => {
  let component: LabourConfirmLockComponent;
  let fixture: ComponentFixture<LabourConfirmLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourConfirmLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourConfirmLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
