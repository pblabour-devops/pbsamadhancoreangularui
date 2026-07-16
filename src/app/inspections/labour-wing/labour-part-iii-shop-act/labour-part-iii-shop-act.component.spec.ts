import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiShopActComponent } from './labour-part-iii-shop-act.component';

describe('LabourPartIiiShopActComponent', () => {
  let component: LabourPartIiiShopActComponent;
  let fixture: ComponentFixture<LabourPartIiiShopActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiShopActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiShopActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
