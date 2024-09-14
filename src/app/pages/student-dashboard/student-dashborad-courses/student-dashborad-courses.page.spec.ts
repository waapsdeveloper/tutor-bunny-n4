import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';

describe('StudentDashboradCoursesPage', () => {
  let component: StudentDashboradCoursesPage;
  let fixture: ComponentFixture<StudentDashboradCoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboradCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
