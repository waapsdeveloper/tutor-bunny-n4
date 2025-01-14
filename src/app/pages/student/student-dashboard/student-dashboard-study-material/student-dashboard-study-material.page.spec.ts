import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';

describe('StudentDashboardStudyMaterialPage', () => {
  let component: StudentDashboardStudyMaterialPage;
  let fixture: ComponentFixture<StudentDashboardStudyMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardStudyMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
