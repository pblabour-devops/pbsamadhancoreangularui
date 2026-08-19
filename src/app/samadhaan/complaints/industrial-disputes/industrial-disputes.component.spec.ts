import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialDisputesComponent } from './industrial-disputes.component';

describe('IndustrialDisputesComponent', () => {
  let component: IndustrialDisputesComponent;
  let fixture: ComponentFixture<IndustrialDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialDisputesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
