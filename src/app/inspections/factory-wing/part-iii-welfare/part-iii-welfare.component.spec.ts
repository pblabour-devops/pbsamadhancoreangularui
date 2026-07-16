import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiWelfareComponent } from './part-iii-welfare.component';

describe('PartIiiWelfareComponent', () => {
  let component: PartIiiWelfareComponent;
  let fixture: ComponentFixture<PartIiiWelfareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiWelfareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiWelfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
