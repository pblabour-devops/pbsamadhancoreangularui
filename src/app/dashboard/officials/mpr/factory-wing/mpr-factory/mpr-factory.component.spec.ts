import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MprFactoryComponent } from './mpr-factory.component';

describe('MprFactoryComponent', () => {
  let component: MprFactoryComponent;
  let fixture: ComponentFixture<MprFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MprFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MprFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
