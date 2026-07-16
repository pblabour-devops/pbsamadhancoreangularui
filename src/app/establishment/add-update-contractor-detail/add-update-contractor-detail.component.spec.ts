import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContractorDetailComponent } from './add-update-contractor-detail.component';

describe('AddUpdateContractorDetailComponent', () => {
  let component: AddUpdateContractorDetailComponent;
  let fixture: ComponentFixture<AddUpdateContractorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateContractorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateContractorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
