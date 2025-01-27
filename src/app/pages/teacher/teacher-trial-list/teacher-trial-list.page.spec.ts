import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherTrialListPage } from './teacher-trial-list.page';

describe('TeacherTrialListPage', () => {
  let component: TeacherTrialListPage;
  let fixture: ComponentFixture<TeacherTrialListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTrialListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
