import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIIFactoryDetailComponent } from './labour-part-ii-factory-detail.component';

describe('LabourPartIIFactoryDetailComponent', () => {
  let component: LabourPartIIFactoryDetailComponent;
  let fixture: ComponentFixture<LabourPartIIFactoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIIFactoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIIFactoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
