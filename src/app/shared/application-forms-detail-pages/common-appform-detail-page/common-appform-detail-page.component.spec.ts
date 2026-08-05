import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAppformDetailPageComponent } from './common-appform-detail-page.component';

describe('CommonAppformDetailPageComponent', () => {
  let component: CommonAppformDetailPageComponent;
  let fixture: ComponentFixture<CommonAppformDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAppformDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAppformDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
