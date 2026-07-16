import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiGeneralComponent } from './part-iii-general.component';

describe('PartIiiGeneralComponent', () => {
  let component: PartIiiGeneralComponent;
  let fixture: ComponentFixture<PartIiiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
