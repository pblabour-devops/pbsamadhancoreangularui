import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayOffDetailsComponent } from './lay-off-details.component';

describe('LayOffDetailsComponent', () => {
  let component: LayOffDetailsComponent;
  let fixture: ComponentFixture<LayOffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayOffDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayOffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
