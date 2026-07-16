import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabiltyReceiptComponent } from './stabilty-receipt.component';

describe('StabiltyReceiptComponent', () => {
  let component: StabiltyReceiptComponent;
  let fixture: ComponentFixture<StabiltyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StabiltyReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StabiltyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
