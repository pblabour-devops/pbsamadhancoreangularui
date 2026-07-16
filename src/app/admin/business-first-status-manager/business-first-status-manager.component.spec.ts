import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFirstStatusManagerComponent } from './business-first-status-manager.component';

describe('BusinessFirstStatusManagerComponent', () => {
  let component: BusinessFirstStatusManagerComponent;
  let fixture: ComponentFixture<BusinessFirstStatusManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessFirstStatusManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFirstStatusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
