import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiMajorAccidentComponent } from './part-iii-major-accident.component';

describe('PartIiiMajorAccidentComponent', () => {
  let component: PartIiiMajorAccidentComponent;
  let fixture: ComponentFixture<PartIiiMajorAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiMajorAccidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiMajorAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
