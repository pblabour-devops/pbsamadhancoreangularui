import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiHealthComponent } from './part-iii-health.component';

describe('PartIiiHealthComponent', () => {
  let component: PartIiiHealthComponent;
  let fixture: ComponentFixture<PartIiiHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
