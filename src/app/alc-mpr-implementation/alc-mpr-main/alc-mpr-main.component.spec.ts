import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcMprMainComponent } from './alc-mpr-main.component';

describe('AlcMprMainComponent', () => {
  let component: AlcMprMainComponent;
  let fixture: ComponentFixture<AlcMprMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcMprMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcMprMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
