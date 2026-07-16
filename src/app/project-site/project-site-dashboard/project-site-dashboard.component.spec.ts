import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSiteDashboardComponent } from './project-site-dashboard.component';

describe('ProjectSiteDashboardComponent', () => {
  let component: ProjectSiteDashboardComponent;
  let fixture: ComponentFixture<ProjectSiteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSiteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSiteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
