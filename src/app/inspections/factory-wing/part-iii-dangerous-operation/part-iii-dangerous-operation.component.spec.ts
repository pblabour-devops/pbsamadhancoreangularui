import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiDangerousOperationComponent } from './part-iii-dangerous-operation.component';

describe('PartIiiDangerousOperationComponent', () => {
  let component: PartIiiDangerousOperationComponent;
  let fixture: ComponentFixture<PartIiiDangerousOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiDangerousOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiDangerousOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
