import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentEpfoComponent } from './establishment-epfo.component';

describe('EstablishmentEpfoComponent', () => {
  let component: EstablishmentEpfoComponent;
  let fixture: ComponentFixture<EstablishmentEpfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentEpfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentEpfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
