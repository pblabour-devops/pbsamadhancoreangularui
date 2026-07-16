import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeFactoryLicencesComponent } from './merge-factory-licences.component';

describe('MergeFactoryLicencesComponent', () => {
  let component: MergeFactoryLicencesComponent;
  let fixture: ComponentFixture<MergeFactoryLicencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeFactoryLicencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeFactoryLicencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
