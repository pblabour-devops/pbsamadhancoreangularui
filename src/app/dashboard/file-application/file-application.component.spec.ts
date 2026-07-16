import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileApplicationComponent } from './file-application.component';

describe('FileApplicationComponent', () => {
  let component: FileApplicationComponent;
  let fixture: ComponentFixture<FileApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
