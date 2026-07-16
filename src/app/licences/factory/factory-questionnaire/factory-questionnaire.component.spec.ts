import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryQuestionnaireComponent } from './factory-questionnaire.component';

describe('FactoryQuestionnaireComponent', () => {
  let component: FactoryQuestionnaireComponent;
  let fixture: ComponentFixture<FactoryQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
