import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFactoryGeneralDetailComponent } from './add-update-factory-general-detail.component';

describe('AddUpdateFactoryGeneralDetailComponent', () => {
  let component: AddUpdateFactoryGeneralDetailComponent;
  let fixture: ComponentFixture<AddUpdateFactoryGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateFactoryGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFactoryGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
