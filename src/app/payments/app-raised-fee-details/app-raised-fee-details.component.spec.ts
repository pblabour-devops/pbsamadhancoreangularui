import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRaisedFeeDetailsComponent } from './app-raised-fee-details.component';

describe('AppRaisedFeeDetailsComponent', () => {
  let component: AppRaisedFeeDetailsComponent;
  let fixture: ComponentFixture<AppRaisedFeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRaisedFeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRaisedFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
