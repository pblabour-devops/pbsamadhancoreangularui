import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOccupierDetailComponent } from './add-update-occupier-detail.component';

describe('AddUpdateOccupierDetailComponent', () => {
  let component: AddUpdateOccupierDetailComponent;
  let fixture: ComponentFixture<AddUpdateOccupierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOccupierDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOccupierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
