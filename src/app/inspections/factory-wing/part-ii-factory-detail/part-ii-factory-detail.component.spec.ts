import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiFactoryDetailComponent } from './part-ii-factory-detail.component';

describe('PartIiFactoryDetailComponent', () => {
  let component: PartIiFactoryDetailComponent;
  let fixture: ComponentFixture<PartIiFactoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiFactoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiFactoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
