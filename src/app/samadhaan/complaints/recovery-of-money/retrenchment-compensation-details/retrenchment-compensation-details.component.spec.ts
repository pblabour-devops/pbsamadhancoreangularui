import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrenchmentCompensationDetailsComponent } from './retrenchment-compensation-details.component';

describe('RetrenchmentCompensationDetailsComponent', () => {
  let component: RetrenchmentCompensationDetailsComponent;
  let fixture: ComponentFixture<RetrenchmentCompensationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrenchmentCompensationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrenchmentCompensationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
