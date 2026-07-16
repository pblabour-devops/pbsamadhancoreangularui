import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectLoginComponent } from './direct-login.component';

describe('DirectLoginComponent', () => {
  let component: DirectLoginComponent;
  let fixture: ComponentFixture<DirectLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
