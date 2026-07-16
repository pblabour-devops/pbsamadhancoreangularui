import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedFeeDetailsComponent } from './raised-fee-details.component';

describe('RaisedFeeDetailsComponent', () => {
  let component: RaisedFeeDetailsComponent;
  let fixture: ComponentFixture<RaisedFeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedFeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
