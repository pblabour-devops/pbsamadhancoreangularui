import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIGeneralDetailComponent } from './part-i-general-detail.component';

describe('PartIGeneralDetailComponent', () => {
  let component: PartIGeneralDetailComponent;
  let fixture: ComponentFixture<PartIGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
