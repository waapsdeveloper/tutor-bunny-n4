import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherProfileEditPage } from './teacher-profile-edit.page';

describe('TeacherProfileEditPage', () => {
  let component: TeacherProfileEditPage;
  let fixture: ComponentFixture<TeacherProfileEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
