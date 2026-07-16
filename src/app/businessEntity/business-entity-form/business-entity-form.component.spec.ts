import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEntityFormComponent } from './business-entity-form.component';

describe('BusinessEntityFormComponent', () => {
  let component: BusinessEntityFormComponent;
  let fixture: ComponentFixture<BusinessEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessEntityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
