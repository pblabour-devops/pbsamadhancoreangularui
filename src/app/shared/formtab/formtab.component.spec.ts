import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtabComponent } from './formtab.component';

describe('FormtabComponent', () => {
  let component: FormtabComponent;
  let fixture: ComponentFixture<FormtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormtabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
