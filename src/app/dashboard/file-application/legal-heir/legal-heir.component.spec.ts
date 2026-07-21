import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalHeirComponent } from './legal-heir.component';

describe('LegalHeirComponent', () => {
  let component: LegalHeirComponent;
  let fixture: ComponentFixture<LegalHeirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalHeirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalHeirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
