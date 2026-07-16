import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGatewayComponent } from './service-gateway.component';

describe('ServiceGatewayComponent', () => {
  let component: ServiceGatewayComponent;
  let fixture: ComponentFixture<ServiceGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
