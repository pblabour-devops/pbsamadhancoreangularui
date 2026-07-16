import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRaiseFeeComponent } from './app-raise-fee.component';

describe('AppRaiseFeeComponent', () => {
  let component: AppRaiseFeeComponent;
  let fixture: ComponentFixture<AppRaiseFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRaiseFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRaiseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
