import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMakeRaisedFeesComponent } from './app-make-raised-fees.component';

describe('AppMakeRaisedFeesComponent', () => {
  let component: AppMakeRaisedFeesComponent;
  let fixture: ComponentFixture<AppMakeRaisedFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMakeRaisedFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMakeRaisedFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
