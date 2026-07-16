import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanflowComponent } from './scanflow.component';

describe('ScanflowComponent', () => {
  let component: ScanflowComponent;
  let fixture: ComponentFixture<ScanflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
