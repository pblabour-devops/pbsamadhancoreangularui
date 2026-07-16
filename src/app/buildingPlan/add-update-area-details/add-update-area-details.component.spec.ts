import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAreaDetailsComponent } from './add-update-area-details.component';

describe('AddUpdateAreaDetailsComponent', () => {
  let component: AddUpdateAreaDetailsComponent;
  let fixture: ComponentFixture<AddUpdateAreaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateAreaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
