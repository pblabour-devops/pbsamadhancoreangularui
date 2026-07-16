import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSiteFormComponent } from './project-site-form.component';

describe('ProjectSiteFormComponent', () => {
  let component: ProjectSiteFormComponent;
  let fixture: ComponentFixture<ProjectSiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSiteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
