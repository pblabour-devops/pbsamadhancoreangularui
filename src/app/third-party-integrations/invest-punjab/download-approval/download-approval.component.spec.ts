import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadApprovalComponent } from './download-approval.component';

describe('DownloadApprovalComponent', () => {
  let component: DownloadApprovalComponent;
  let fixture: ComponentFixture<DownloadApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
