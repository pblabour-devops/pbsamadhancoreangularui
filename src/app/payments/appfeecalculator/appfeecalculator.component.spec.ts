import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppfeecalculatorComponent } from './appfeecalculator.component';

describe('AppfeecalculatorComponent', () => {
  let component: AppfeecalculatorComponent;
  let fixture: ComponentFixture<AppfeecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppfeecalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppfeecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
