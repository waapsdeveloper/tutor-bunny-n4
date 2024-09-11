import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCourseDetailPage } from './student-course-detail.page';

describe('StudentCourseDetailPage', () => {
  let component: StudentCourseDetailPage;
  let fixture: ComponentFixture<StudentCourseDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
