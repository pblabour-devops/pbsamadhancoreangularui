import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEntityComponent } from './business-entity.component';

describe('BusinessEntityComponent', () => {
  let component: BusinessEntityComponent;
  let fixture: ComponentFixture<BusinessEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
