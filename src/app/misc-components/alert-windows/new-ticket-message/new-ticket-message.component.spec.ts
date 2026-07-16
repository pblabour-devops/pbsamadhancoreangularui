import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketMessageComponent } from './new-ticket-message.component';

describe('NewTicketMessageComponent', () => {
  let component: NewTicketMessageComponent;
  let fixture: ComponentFixture<NewTicketMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTicketMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicketMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
