import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMigrantWorkerDetailComponent } from './add-update-migrant-worker-detail.component';

describe('AddUpdateMigrantWorkerDetailComponent', () => {
  let component: AddUpdateMigrantWorkerDetailComponent;
  let fixture: ComponentFixture<AddUpdateMigrantWorkerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateMigrantWorkerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateMigrantWorkerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
