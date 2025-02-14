import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';

describe('StudentDashboradTeachersPage', () => {
  let component: StudentDashboradTeachersPage;
  let fixture: ComponentFixture<StudentDashboradTeachersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboradTeachersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
