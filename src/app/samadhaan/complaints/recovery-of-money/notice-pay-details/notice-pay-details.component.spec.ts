import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePayDetailsComponent } from './notice-pay-details.component';

describe('NoticePayDetailsComponent', () => {
  let component: NoticePayDetailsComponent;
  let fixture: ComponentFixture<NoticePayDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoticePayDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticePayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
