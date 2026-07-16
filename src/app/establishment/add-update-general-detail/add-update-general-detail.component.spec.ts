import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateGeneralDetailComponent } from './add-update-general-detail.component';

describe('AddUpdateGeneralDetailComponent', () => {
  let component: AddUpdateGeneralDetailComponent;
  let fixture: ComponentFixture<AddUpdateGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
