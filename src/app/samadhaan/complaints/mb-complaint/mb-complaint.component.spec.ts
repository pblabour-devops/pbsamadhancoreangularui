import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbComplaintComponent } from './mb-complaint.component';

describe('MbComplaintComponent', () => {
  let component: MbComplaintComponent;
  let fixture: ComponentFixture<MbComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MbComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
