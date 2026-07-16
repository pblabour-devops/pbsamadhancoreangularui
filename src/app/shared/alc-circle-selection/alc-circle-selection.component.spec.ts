import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcCircleSelectionComponent } from './alc-circle-selection.component';

describe('AlcCircleSelectionComponent', () => {
  let component: AlcCircleSelectionComponent;
  let fixture: ComponentFixture<AlcCircleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcCircleSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcCircleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
