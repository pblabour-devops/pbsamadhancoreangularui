import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDseWithAppComponent } from './attach-dse-with-app.component';

describe('AttachDseWithAppComponent', () => {
  let component: AttachDseWithAppComponent;
  let fixture: ComponentFixture<AttachDseWithAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachDseWithAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachDseWithAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
