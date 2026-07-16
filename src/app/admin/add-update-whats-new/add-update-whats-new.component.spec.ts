import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateWhatsNewComponent } from './add-update-whats-new.component';

describe('AddUpdateWhatsNewComponent', () => {
  let component: AddUpdateWhatsNewComponent;
  let fixture: ComponentFixture<AddUpdateWhatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateWhatsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
