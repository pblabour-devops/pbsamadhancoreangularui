import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiSaftyComponent } from './part-iii-safty.component';

describe('PartIiiSaftyComponent', () => {
  let component: PartIiiSaftyComponent;
  let fixture: ComponentFixture<PartIiiSaftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiSaftyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiSaftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
