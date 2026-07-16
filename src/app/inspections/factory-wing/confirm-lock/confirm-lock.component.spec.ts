import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLockComponent } from './confirm-lock.component';

describe('ConfirmLockComponent', () => {
  let component: ConfirmLockComponent;
  let fixture: ComponentFixture<ConfirmLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
