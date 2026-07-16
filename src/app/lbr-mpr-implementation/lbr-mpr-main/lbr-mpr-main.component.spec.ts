import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbrMprMainComponent } from './lbr-mpr-main.component';

describe('LbrMprMainComponent', () => {
  let component: LbrMprMainComponent;
  let fixture: ComponentFixture<LbrMprMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbrMprMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LbrMprMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
