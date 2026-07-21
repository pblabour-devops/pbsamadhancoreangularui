import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfWorkersComponent } from './group-of-workers.component';

describe('GroupOfWorkersComponent', () => {
  let component: GroupOfWorkersComponent;
  let fixture: ComponentFixture<GroupOfWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupOfWorkersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupOfWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
