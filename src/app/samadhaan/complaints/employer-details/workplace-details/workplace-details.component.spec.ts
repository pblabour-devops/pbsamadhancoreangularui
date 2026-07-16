import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceDetailsComponent } from './workplace-details.component';

describe('WorkplaceDetailsComponent', () => {
  let component: WorkplaceDetailsComponent;
  let fixture: ComponentFixture<WorkplaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkplaceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkplaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
