import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamadhaanComplaintsDetailsComponent } from './samadhaan-complaints-details.component';

describe('SamadhaanComplaintsDetailsComponent', () => {
  let component: SamadhaanComplaintsDetailsComponent;
  let fixture: ComponentFixture<SamadhaanComplaintsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamadhaanComplaintsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamadhaanComplaintsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
