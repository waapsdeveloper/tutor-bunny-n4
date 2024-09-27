import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherProfileCompletePage } from './teacher-profile-complete.page';

describe('TeacherProfileCompletePage', () => {
  let component: TeacherProfileCompletePage;
  let fixture: ComponentFixture<TeacherProfileCompletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
