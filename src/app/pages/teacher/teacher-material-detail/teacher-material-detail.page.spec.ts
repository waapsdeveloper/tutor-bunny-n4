import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherMaterialDetailPage } from './teacher-material-detail.page';

describe('TeacherMaterialDetailPage', () => {
  let component: TeacherMaterialDetailPage;
  let fixture: ComponentFixture<TeacherMaterialDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMaterialDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
