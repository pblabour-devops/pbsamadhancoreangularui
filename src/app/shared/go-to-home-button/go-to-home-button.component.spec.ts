import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToHomeButtonComponent } from './go-to-home-button.component';

describe('GoToHomeButtonComponent', () => {
  let component: GoToHomeButtonComponent;
  let fixture: ComponentFixture<GoToHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToHomeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
