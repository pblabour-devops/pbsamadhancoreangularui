import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftComplaintComponent } from './draft-complaint.component';

describe('DraftComplaintComponent', () => {
  let component: DraftComplaintComponent;
  let fixture: ComponentFixture<DraftComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DraftComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
