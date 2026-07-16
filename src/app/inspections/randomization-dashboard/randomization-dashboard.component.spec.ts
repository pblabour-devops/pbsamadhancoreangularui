import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizationDashboardComponent } from './randomization-dashboard.component';

describe('RandomizationDashboardComponent', () => {
  let component: RandomizationDashboardComponent;
  let fixture: ComponentFixture<RandomizationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomizationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
