import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsliderComponent } from './loginslider.component';

describe('LoginsliderComponent', () => {
  let component: LoginsliderComponent;
  let fixture: ComponentFixture<LoginsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginsliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
