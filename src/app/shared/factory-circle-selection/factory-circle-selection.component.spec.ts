import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryCircleSelectionComponent } from './factory-circle-selection.component';

describe('FactoryCircleSelectionComponent', () => {
  let component: FactoryCircleSelectionComponent;
  let fixture: ComponentFixture<FactoryCircleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryCircleSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryCircleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
