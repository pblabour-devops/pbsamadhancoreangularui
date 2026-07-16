import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEmpanelledPersonComponent } from './add-update-empanelled-person.component';

describe('AddUpdateEmpanelledPersonComponent', () => {
  let component: AddUpdateEmpanelledPersonComponent;
  let fixture: ComponentFixture<AddUpdateEmpanelledPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateEmpanelledPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateEmpanelledPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
