import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMaterialDetailPage } from './student-material-detail.page';

describe('StudentMaterialDetailPage', () => {
  let component: StudentMaterialDetailPage;
  let fixture: ComponentFixture<StudentMaterialDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMaterialDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
