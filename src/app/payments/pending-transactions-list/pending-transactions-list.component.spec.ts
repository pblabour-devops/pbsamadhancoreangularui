import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTransactionsListComponent } from './pending-transactions-list.component';

describe('PendingTransactionsListComponent', () => {
  let component: PendingTransactionsListComponent;
  let fixture: ComponentFixture<PendingTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
