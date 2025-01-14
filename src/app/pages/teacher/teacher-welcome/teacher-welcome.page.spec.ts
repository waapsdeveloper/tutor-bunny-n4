import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherWelcomePage } from './teacher-welcome.page';

describe('TeacherWelcomePage', () => {
  let component: TeacherWelcomePage;
  let fixture: ComponentFixture<TeacherWelcomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
