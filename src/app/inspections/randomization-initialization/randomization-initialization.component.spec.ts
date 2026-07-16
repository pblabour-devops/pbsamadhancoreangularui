import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizationInitializationComponent } from './randomization-initialization.component';

describe('RandomizationInitializationComponent', () => {
  let component: RandomizationInitializationComponent;
  let fixture: ComponentFixture<RandomizationInitializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomizationInitializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizationInitializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
