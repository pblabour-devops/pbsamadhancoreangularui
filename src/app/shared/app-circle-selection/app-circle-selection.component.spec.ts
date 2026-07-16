import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCircleSelectionComponent } from './app-circle-selection.component';

describe('AppCircleSelectionComponent', () => {
  let component: AppCircleSelectionComponent;
  let fixture: ComponentFixture<AppCircleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCircleSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCircleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
