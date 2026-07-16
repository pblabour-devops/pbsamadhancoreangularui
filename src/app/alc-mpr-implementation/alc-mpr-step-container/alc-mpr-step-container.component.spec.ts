import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcMprStepContainerComponent } from './alc-mpr-step-container.component';

describe('AlcMprStepContainerComponent', () => {
  let component: AlcMprStepContainerComponent;
  let fixture: ComponentFixture<AlcMprStepContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcMprStepContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcMprStepContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
