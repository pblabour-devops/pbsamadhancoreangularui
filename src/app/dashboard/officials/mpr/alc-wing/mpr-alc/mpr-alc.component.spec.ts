import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MprAlcComponent } from './mpr-alc.component';

describe('MprAlcComponent', () => {
  let component: MprAlcComponent;
  let fixture: ComponentFixture<MprAlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MprAlcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MprAlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
