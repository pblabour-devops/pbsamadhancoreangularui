import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerContractorDetailsComponent } from './employer-contractor-details.component';

describe('EmployerContractorDetailsComponent', () => {
  let component: EmployerContractorDetailsComponent;
  let fixture: ComponentFixture<EmployerContractorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerContractorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerContractorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
