import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoActivityViewerComponent } from './to-do-activity-viewer.component';

describe('ToDoActivityViewerComponent', () => {
  let component: ToDoActivityViewerComponent;
  let fixture: ComponentFixture<ToDoActivityViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoActivityViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoActivityViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
