import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherCourseListPage } from './teacher-course-list.page';

describe('TeacherCourseListPage', () => {
  let component: TeacherCourseListPage;
  let fixture: ComponentFixture<TeacherCourseListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
