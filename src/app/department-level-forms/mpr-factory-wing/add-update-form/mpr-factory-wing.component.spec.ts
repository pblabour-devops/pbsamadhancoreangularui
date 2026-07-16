import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MprFactoryWingComponent } from './mpr-factory-wing.component';

describe('MprFactoryWingComponent', () => {
  let component: MprFactoryWingComponent;
  let fixture: ComponentFixture<MprFactoryWingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MprFactoryWingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MprFactoryWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
