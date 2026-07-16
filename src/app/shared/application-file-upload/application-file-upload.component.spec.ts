import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFileUploadComponent } from './application-file-upload.component';

describe('ApplicationFileUploadComponent', () => {
  let component: ApplicationFileUploadComponent;
  let fixture: ComponentFixture<ApplicationFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
