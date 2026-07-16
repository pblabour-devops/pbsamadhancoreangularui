import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReturnMainComponent } from './annual-return-main.component';

describe('AnnualReturnMainComponent', () => {
  let component: AnnualReturnMainComponent;
  let fixture: ComponentFixture<AnnualReturnMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualReturnMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReturnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
