import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesWeeklydayComponent } from './wages-weeklyday.component';

describe('WagesWeeklydayComponent', () => {
  let component: WagesWeeklydayComponent;
  let fixture: ComponentFixture<WagesWeeklydayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WagesWeeklydayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesWeeklydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
