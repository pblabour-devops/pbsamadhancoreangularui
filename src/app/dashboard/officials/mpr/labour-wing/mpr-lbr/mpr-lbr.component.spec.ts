import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MprLbrComponent } from './mpr-lbr.component';

describe('MprLbrComponent', () => {
  let component: MprLbrComponent;
  let fixture: ComponentFixture<MprLbrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MprLbrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MprLbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
