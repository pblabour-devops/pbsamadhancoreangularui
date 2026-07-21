import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedRepresentativeComponent } from './authorized-representative.component';

describe('AuthorizedRepresentativeComponent', () => {
  let component: AuthorizedRepresentativeComponent;
  let fixture: ComponentFixture<AuthorizedRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
