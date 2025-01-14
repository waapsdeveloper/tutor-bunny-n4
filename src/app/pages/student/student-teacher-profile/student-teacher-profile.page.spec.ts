import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentTeacherProfilePage } from './student-teacher-profile.page';

describe('StudentTeacherProfilePage', () => {
  let component: StudentTeacherProfilePage;
  let fixture: ComponentFixture<StudentTeacherProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeacherProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
