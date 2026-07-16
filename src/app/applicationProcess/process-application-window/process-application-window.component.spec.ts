import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessApplicationWindowComponent } from './process-application-window.component';

describe('ProcessApplicationWindowComponent', () => {
  let component: ProcessApplicationWindowComponent;
  let fixture: ComponentFixture<ProcessApplicationWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessApplicationWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessApplicationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
