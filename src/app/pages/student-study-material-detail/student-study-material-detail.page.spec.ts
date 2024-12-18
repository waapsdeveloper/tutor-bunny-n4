import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentStudyMaterialDetailPage } from './student-study-material-detail.page';

describe('StudentStudyMaterialDetailPage', () => {
  let component: StudentStudyMaterialDetailPage;
  let fixture: ComponentFixture<StudentStudyMaterialDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStudyMaterialDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
