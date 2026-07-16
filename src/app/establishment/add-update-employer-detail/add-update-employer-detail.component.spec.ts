import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEmployerDetailComponent } from './add-update-employer-detail.component';

describe('AddUpdateEmployerDetailComponent', () => {
  let component: AddUpdateEmployerDetailComponent;
  let fixture: ComponentFixture<AddUpdateEmployerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateEmployerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateEmployerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
