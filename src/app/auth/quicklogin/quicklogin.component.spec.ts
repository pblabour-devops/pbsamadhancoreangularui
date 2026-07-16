import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickloginComponent } from './quicklogin.component';

describe('QuickloginComponent', () => {
  let component: QuickloginComponent;
  let fixture: ComponentFixture<QuickloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
