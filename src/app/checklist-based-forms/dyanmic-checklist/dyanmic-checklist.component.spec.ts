import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyanmicChecklistComponent } from './dyanmic-checklist.component';

describe('DyanmicChecklistComponent', () => {
  let component: DyanmicChecklistComponent;
  let fixture: ComponentFixture<DyanmicChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyanmicChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyanmicChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
